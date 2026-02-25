import { Link } from 'react-router-dom';
import { Heart, Users, Search, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-24">
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
              <Link to="/donors" className="bg-white text-red-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                রক্তদাতা খুঁজুন
              </Link>
              <Link to="/register" className="bg-red-900 bg-opacity-40 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-700 transition-all flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                রক্তদাতা হন
              </Link>
            </div>
          </div>
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
