import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, Phone, MapPin, Hospital, AlertCircle, Send, User, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

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
      const isConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (isConfigured) {
        const { error } = await supabase
          .from('request_comments')
          .insert([{
            request_id: request.id,
            comment_text: newComment,
            author_name: authorName.trim() || 'Anonymous'
          }]);

        if (error) throw error;
      } else {
        // Demo fallback
        const demoComments = JSON.parse(localStorage.getItem(`demo_comments_${request.id}`) || '[]');
        const newC = {
          id: Date.now(),
          comment_text: newComment,
          author_name: authorName.trim() || 'Anonymous',
          created_at: new Date().toISOString()
        };
        localStorage.setItem(`demo_comments_${request.id}`, JSON.stringify([...demoComments, newC]));
      }
      
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
    <div className={`rounded-3xl overflow-hidden border transition-all duration-300 ${
      request.is_critical 
        ? 'bg-white dark:bg-slate-800 border-brand/20 shadow-xl shadow-brand/5 ring-1 ring-brand/10' 
        : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-gray-700 card-shadow'
    }`}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex items-center gap-5">
            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner ${
              request.is_critical ? 'bg-brand text-white' : 'bg-brand-light dark:bg-brand/10 text-brand'
            }`}>
              {request.blood_group}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{request.patient_name}</h3>
                {request.is_critical && (
                  <span className="bg-brand text-white text-[10px] uppercase px-2.5 py-1 rounded-lg font-black tracking-wider flex items-center gap-1.5 shadow-lg shadow-brand/20">
                    <AlertCircle className="h-3 w-3" /> Emergency
                  </span>
                )}
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Posted {formatDistanceToNow(new Date(request.created_at))} ago
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">প্রয়োজন</span>
            <span className="text-lg font-black text-gray-900 dark:text-white">{request.units_required} <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ব্যাগ</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50/50 dark:bg-slate-900/50 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 mb-8">
          <div className="flex items-start gap-3">
            <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
              <Hospital className="h-4 w-4 text-brand" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">হাসপাতাল ও ঠিকানা</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-relaxed">{request.hospital_details}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
              <MapPin className="h-4 w-4 text-brand" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">জেলা</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{request.district}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <a 
            href={`tel:${request.contact_number}`}
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-3 px-8"
          >
            <Phone className="h-5 w-5" />
            {request.contact_number}
          </a>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
          >
            <MessageSquare className="h-5 w-5" />
            {request.comments?.length || 0} Replies
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-50/80 dark:bg-slate-900/80 border-t border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="space-y-4 mb-8">
                {request.comments && request.comments.length > 0 ? (
                  request.comments.map((comment, idx) => (
                    <motion.div 
                      key={comment.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-brand-light dark:bg-brand/10 flex items-center justify-center">
                            <User className="h-3 w-3 text-brand" />
                          </div>
                          {comment.author_name}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
                          {formatDistanceToNow(new Date(comment.created_at))} ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{comment.comment_text}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <MessageSquare className="h-8 w-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No replies yet. Be the first to help!</p>
                  </div>
                )}
              </div>

              <form onSubmit={handlePostComment} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="আপনার নাম (ঐচ্ছিক)"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all text-gray-900 dark:text-white"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <textarea 
                    placeholder="সাহায্য করতে চান? এখানে লিখুন..."
                    className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all resize-none text-gray-900 dark:text-white"
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand text-white p-4 rounded-xl self-end hover:bg-brand-dark transition-all disabled:opacity-50 shadow-lg shadow-brand/20 active:scale-95"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
