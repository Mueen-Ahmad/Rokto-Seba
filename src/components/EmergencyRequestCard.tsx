import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, Phone, MapPin, Hospital, AlertCircle, Send, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface Comment {
  id: number;
  comment_text: string;
  author_name: string;
  created_at: string;
}

export interface BloodRequest {
  id: number;
  patient_name: string;
  blood_group: string;
  units_required: number;
  hospital_details: string;
  district: string;
  contact_number: string;
  is_critical: boolean;
  created_at: string;
  comments?: Comment[];
}

export default function EmergencyRequestCard({ request, onCommentAdded }: { request: BloodRequest, onCommentAdded: () => void | Promise<void>, key?: any }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('request_comments')
        .insert([{
          request_id: request.id,
          comment_text: newComment,
          author_name: authorName.trim() || 'Anonymous'
        }]);

      if (error) throw error;
      setNewComment('');
      setAuthorName('');
      onCommentAdded();
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${request.is_critical ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-100'} overflow-hidden mb-6`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${request.is_critical ? 'bg-red-600 text-white animate-pulse' : 'bg-red-100 text-red-700'}`}>
              {request.blood_group}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                {request.patient_name}
                {request.is_critical && (
                  <span className="bg-red-100 text-red-600 text-[10px] uppercase px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Emergency
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500">
                Posted {formatDistanceToNow(new Date(request.created_at))} ago
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-700">{request.units_required} Unit(s)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Hospital className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <span>{request.hospital_details}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
            <span>{request.district}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <a 
            href={`tel:${request.contact_number}`}
            className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {request.contact_number}
          </a>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            <MessageSquare className="h-4 w-4" />
            {request.comments?.length || 0} Comments
          </button>
        </div>
      </div>

      {showComments && (
        <div className="bg-gray-50 border-t border-gray-100 p-5">
          <div className="space-y-4 mb-6">
            {request.comments && request.comments.length > 0 ? (
              request.comments.map((comment) => (
                <div key={comment.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                      <User className="h-3 w-3" /> {comment.author_name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {formatDistanceToNow(new Date(comment.created_at))} ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.comment_text}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-sm py-2">No comments yet. Be the first to reply!</p>
            )}
          </div>

          <form onSubmit={handlePostComment} className="space-y-3">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Your Name (Optional)"
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <textarea 
                placeholder="Write a reply..."
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none resize-none"
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 text-white p-2 rounded-lg self-end hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
