import React from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';

export default function Support() {
  const faqs = [
    { q: "কিভাবে রক্তদাতা হিসেবে নিবন্ধন করবো?", a: "আমাদের ওয়েবসাইটের 'নিবন্ধন' (Register) পেজে গিয়ে আপনার প্রয়োজনীয় তথ্য দিয়ে নিবন্ধন করতে পারেন।" },
    { q: "রক্তের জন্য কিভাবে আবেদন করবো?", a: "জরুরি রক্তের প্রয়োজনে 'Emergency Request' পেজে গিয়ে একটি পোস্ট করতে পারেন।" },
    { q: "রক্তদানের আগে কি কি সতর্কতা অবলম্বন করতে হবে?", a: "রক্তদানের আগে পর্যাপ্ত পানি পান করুন, ভালো করে বিশ্রাম নিন এবং কোনো অসুস্থতা থাকলে দয়া করে রক্তদান করবেন না।" },
    { q: "আমার তথ্য কি নিরাপদ?", a: "হ্যাঁ, আমরা আপনার তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করার চেষ্টা করি। বিস্তারিত জানতে আমাদের গোপনীয়তা নীতি পড়ুন।" }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl mb-6">
            <HelpCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">সাপোর্ট সেন্টার (Support Center)</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">আমরা আপনাকে সাহায্য করতে সবসময় প্রস্তুত।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 text-center group hover:border-brand transition-all">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">কল করুন</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">+৮৮০ ১৭০০-০০০০০০</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 text-center group hover:border-brand transition-all">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ইমেইল করুন</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">support@roktoseba.com</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 text-center group hover:border-brand transition-all">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">লাইভ চ্যাট</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">ফেসবুক মেসেঞ্জার</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10">সাধারণ জিজ্ঞাসা (FAQ)</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 group hover:border-brand transition-all">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <ChevronRight className="h-5 w-5 text-brand opacity-0 group-hover:opacity-100 transition-all" />
                  {faq.q}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
