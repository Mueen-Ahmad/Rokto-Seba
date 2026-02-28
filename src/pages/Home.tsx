import { Link } from 'react-router-dom';
import { Heart, Users, Search, ArrowRight, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import EmergencyRequestCard, { BloodRequest } from '../components/EmergencyRequestCard';

export default function Home() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .select(`
          *,
          comments:request_comments(*)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              আপনার রক্তে বাঁচতে পারে <br/> একটি মূল্যবান প্রাণ
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-10">
              "রক্ত দিন, জীবন বাঁচান" - আজই আমাদের সাথে যুক্ত হোন এবং মানবতার সেবায় এগিয়ে আসুন।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/emergency" className="bg-white text-red-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg">
                <AlertCircle className="h-5 w-5" />
                জরুরী রক্ত প্রয়োজন
              </Link>
              <Link to="/register" className="bg-red-900 bg-opacity-40 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-700 transition-all flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                রক্তদাতা হন
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Requests Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              সাম্প্রতিক জরুরী অনুরোধ (Recent Emergency Requests)
            </h2>
            <Link to="/emergency" className="text-red-600 font-medium hover:underline flex items-center gap-1 text-sm">
              অনুরোধ করুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map(request => (
                <EmergencyRequestCard 
                  key={request.id} 
                  request={request} 
                  onCommentAdded={fetchRequests} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500">বর্তমানে কোনো জরুরী অনুরোধ নেই।</p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">সহজ অনুসন্ধান</h3>
              <p className="text-gray-600">
                আপনার এলাকার রক্তদাতাদের খুব সহজেই খুঁজে বের করুন এবং সরাসরি যোগাযোগ করুন।
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">বিশাল কমিউনিটি</h3>
              <p className="text-gray-600">
                হাজার হাজার স্বেচ্ছাসেবী রক্তদাতা আমাদের সাথে যুক্ত আছেন মানবতার সেবায়।
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">জীবন বাঁচান</h3>
              <p className="text-gray-600">
                আপনার এক ব্যাগ রক্ত মুমূর্ষু রোগীর জীবন বাঁচাতে পারে। আজই নিবন্ধন করুন।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">জরুরী রক্তের প্রয়োজন?</h2>
            <p className="text-gray-400">আমাদের ডাটাবেসে খুঁজুন অথবা সরাসরি যোগাযোগ করুন।</p>
          </div>
          <Link to="/donors" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            রক্তদাতা খুঁজুন <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
