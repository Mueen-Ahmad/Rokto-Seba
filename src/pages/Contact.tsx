import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">যোগাযোগ করুন (Contact Us)</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">আপনার যেকোনো প্রশ্ন বা পরামর্শ আমাদের জানান।</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-2xl">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">ফোন</h4>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">+৮৮০ ১৭০০-০০০০০০</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">ইমেইল</h4>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">contact@roktoseba.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">ঠিকানা</h4>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <h4 className="text-xl font-bold mb-4">জরুরি প্রয়োজনে</h4>
              <p className="text-red-100 mb-6">আমাদের হটলাইন ২৪/৭ খোলা থাকে। যেকোনো জরুরি মুহূর্তে কল করুন।</p>
              <a href="tel:+8801700000000" className="block text-center bg-white text-brand py-3 rounded-xl font-bold hover:bg-red-50 transition-all">
                কল করুন এখন
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                    <Send className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">বার্তা পাঠানো হয়েছে!</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    আরেকটি বার্তা পাঠান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">আপনার নাম</label>
                      <input 
                        required
                        type="text" 
                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                        placeholder="উদা: রহিম উদ্দিন"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">ইমেইল ঠিকানা</label>
                      <input 
                        required
                        type="email" 
                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">বিষয়</label>
                    <input 
                      required
                      type="text" 
                      className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                      placeholder="বার্তাটির বিষয়"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">আপনার বার্তা</label>
                    <textarea 
                      required
                      rows={6}
                      className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all resize-none"
                      placeholder="এখানে আপনার বার্তা লিখুন..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <>
                        বার্তা পাঠান <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
