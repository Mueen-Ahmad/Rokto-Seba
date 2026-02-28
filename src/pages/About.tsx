import React from 'react';
import { Heart, Target, Users, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">আমাদের সম্পর্কে (About Us)</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">রক্তদান একটি মহৎ কাজ, আপনার রক্তে বাঁচতে পারে একটি প্রাণ।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">আমাদের লক্ষ্য (Our Mission)</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              আমাদের মূল লক্ষ্য হলো রক্তদাতা এবং রক্তগ্রহীতাদের মধ্যে একটি নিরাপদ ও দ্রুত সেতুবন্ধন তৈরি করা। আমরা বিশ্বাস করি প্রযুক্তির সঠিক ব্যবহারের মাধ্যমে জরুরি মুহূর্তে রক্তের অভাব দূর করা সম্ভব।
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">আমাদের কার্যক্রম (Our Activities)</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              আমরা একটি অলাভজনক প্রতিষ্ঠান হিসেবে কাজ করি। আমাদের প্ল্যাটফর্মে যে কেউ রক্তদাতা হিসেবে নিবন্ধন করতে পারেন এবং জরুরি প্রয়োজনে রক্তের জন্য আবেদন করতে পারেন।
            </p>
          </div>
        </div>

        <div className="bg-brand text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6">সফটকোয়ার্ক (Softquark)</h2>
            <p className="text-red-100 text-lg mb-8 leading-relaxed">
              রক্তসেবা প্ল্যাটফর্মটি সফটকোয়ার্কের একটি উদ্যোগ। আমরা প্রযুক্তির মাধ্যমে সামাজিক সমস্যা সমাধানের চেষ্টা করি। আমাদের অন্যান্য প্রজেক্ট সম্পর্কে জানতে নিচের লিঙ্কে ভিজিট করুন।
            </p>
            <a 
              href="https://mueen-ahmad.github.io/softquark/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand px-8 py-4 rounded-2xl font-bold hover:bg-red-50 transition-all shadow-lg"
            >
              Visit Softquark <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block p-4 bg-red-50 dark:bg-red-900/10 rounded-full mb-6">
            <Heart className="h-10 w-10 text-brand fill-brand animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">একসাথে বাঁচাই প্রাণ</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            আপনার একটি ছোট পদক্ষেপ কারো জীবনে বড় পরিবর্তন আনতে পারে। আজই আমাদের সাথে যুক্ত হোন।
          </p>
        </div>
      </div>
    </div>
  );
}
