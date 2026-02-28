import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ChevronRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 relative overflow-hidden">
      {/* Colorful Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] translate-y-1/2"></div>

      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-blue-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand & Newsletter */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-white p-3 rounded-2xl shadow-2xl">
                  <Heart className="h-8 w-8 text-red-600 fill-red-600" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none">ROKTO SEBA</span>
                <span className="text-[10px] font-bold text-blue-400 tracking-[0.3em] mt-1 uppercase">Softquark Tech</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-400 font-medium leading-relaxed">
                রক্তদান একটি মহৎ কাজ। আমাদের প্ল্যাটফর্মের মাধ্যমে আপনি খুব সহজেই রক্তদাতা খুঁজে পেতে পারেন।
              </p>
            </div>

            <div className="relative group max-w-xs">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex bg-slate-900 rounded-2xl overflow-hidden border border-white/5">
                <input 
                  type="email" 
                  placeholder="আপনার ইমেইল"
                  className="w-full bg-transparent px-5 py-4 text-sm focus:outline-none placeholder:text-slate-600 transition-all"
                />
                <button className="bg-gradient-to-r from-red-600 to-orange-500 px-5 flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Short Links */}
          <div>
            <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-red-600 rounded-full"></span>
              Short Links
            </h3>
            <ul className="space-y-5">
              {[
                { name: 'About Us', path: '/about', color: 'hover:text-red-500' },
                { name: 'Donor List', path: '/donors', color: 'hover:text-blue-500' },
                { name: 'Contact Us', path: '/contact', color: 'hover:text-orange-500' },
                { name: 'Softquark', path: 'https://mueen-ahmad.github.io/softquark/', external: true, color: 'hover:text-emerald-500' }
              ].map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a 
                      href={item.path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`flex items-center gap-3 text-slate-400 transition-all group ${item.color}`}
                    >
                      <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="font-bold">{item.name}</span>
                    </a>
                  ) : (
                    <Link to={item.path} className={`flex items-center gap-3 text-slate-400 transition-all group ${item.color}`}>
                      <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="font-bold">{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-5">
              {[
                { name: 'Support Center', path: '/support', color: 'hover:text-blue-500' },
                { name: 'Apply as a Donor', path: '/register', color: 'hover:text-red-500' },
                { name: 'Terms of Service', path: '/terms', color: 'hover:text-orange-500' },
                { name: 'Privacy Policy', path: '/privacy', color: 'hover:text-slate-200' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={`flex items-center gap-3 text-slate-400 transition-all group ${item.color}`}>
                    <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="font-bold">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl group hover:border-red-600/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              <span className="block text-4xl font-black text-red-600 mb-1">১০০+</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">নিবন্ধিত দাতা</span>
            </div>
            <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl group hover:border-blue-600/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              <span className="block text-4xl font-black text-blue-600 mb-1">২০০+</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">স্বেচ্ছাসেবক</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/40 py-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-bold text-slate-500 tracking-wide">
            Copyright © 2026 <span className="text-white">Roktoseba</span> All Right Reserved
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live System</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Data</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
