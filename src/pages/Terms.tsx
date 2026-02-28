import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-orange-50 dark:bg-orange-900/10 rounded-3xl mb-6">
            <Scale className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">ব্যবহারের শর্তাবলী (Terms of Service)</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">আমাদের প্ল্যাটফর্ম ব্যবহারের আগে নিচের শর্তগুলো মনোযোগ দিয়ে পড়ুন।</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-2xl">
                <CheckCircle2 className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">সাধারণ নিয়মাবলী (General Rules)</h2>
            </div>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
              <li>রক্তদান সম্পূর্ণ একটি স্বেচ্ছাসেবী কাজ। এর জন্য কোনো আর্থিক লেনদেন করা যাবে না।</li>
              <li>নিবন্ধনের সময় অবশ্যই সঠিক তথ্য প্রদান করতে হবে।</li>
              <li>ভুল বা বিভ্রান্তিকর তথ্য প্রদান করলে আপনার অ্যাকাউন্ট বাতিল করা হতে পারে।</li>
              <li>জরুরি মুহূর্তে যোগাযোগের জন্য আপনার ফোন নম্বর সচল রাখতে হবে।</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-2xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">দায়বদ্ধতা (Disclaimer)</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              রক্তসেবা প্ল্যাটফর্মটি শুধুমাত্র রক্তদাতা এবং গ্রহীতাদের মধ্যে যোগাযোগ করিয়ে দেয়। রক্তদানের আগে দাতার শারীরিক অবস্থা এবং রক্তের বিশুদ্ধতা যাচাই করার দায়িত্ব গ্রহীতার। কোনো অনাকাঙ্ক্ষিত ঘটনার জন্য কর্তৃপক্ষ দায়ী থাকবে না।
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">যোগাযোগ (Contact)</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              শর্তাবলী নিয়ে কোনো প্রশ্ন থাকলে আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন।
            </p>
          </section>

          <div className="pt-10 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-500 italic">
              সর্বশেষ আপডেট: ২৮ ফেব্রুয়ারি, ২০২৬।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
