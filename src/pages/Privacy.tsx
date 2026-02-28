import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-blue-50 dark:bg-blue-900/10 rounded-3xl mb-6">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">গোপনীয়তা নীতি (Privacy Policy)</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">আপনার তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">তথ্য সংগ্রহ (Information Collection)</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              আমরা যখন আপনি আমাদের প্ল্যাটফর্মে নিবন্ধন করেন, তখন আপনার নাম, ফোন নম্বর, রক্তের গ্রুপ এবং অবস্থান সংগ্রহ করি। এই তথ্যগুলো শুধুমাত্র রক্তদাতা এবং রক্তগ্রহীতাদের মধ্যে যোগাযোগ স্থাপনের জন্য ব্যবহৃত হয়।
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">তথ্যের ব্যবহার (Use of Information)</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              আপনার ফোন নম্বর এবং রক্তের গ্রুপ আমাদের পাবলিক ডাটাবেসে প্রদর্শিত হতে পারে যাতে জরুরি প্রয়োজনে কেউ আপনার সাথে যোগাযোগ করতে পারে। তবে আমরা আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করি না।
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">নিরাপত্তা (Security)</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              আমরা আপনার তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করার চেষ্টা করি। তবে ইন্টারনেটের মাধ্যমে তথ্য আদান-প্রদান ১০০% নিরাপদ নয়, তাই আমরা সম্পূর্ণ নিরাপত্তার গ্যারান্টি দিতে পারি না।
            </p>
          </section>

          <div className="pt-10 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-500 italic">
              সর্বশেষ আপডেট: ২৮ ফেব্রুয়ারি, ২০২৬। আমরা যেকোনো সময় এই নীতি পরিবর্তন করার অধিকার রাখি।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
