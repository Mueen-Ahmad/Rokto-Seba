import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ChevronRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-brand-dark to-brand text-white pt-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Newsletter */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-2xl shadow-xl">
                <Heart className="h-7 w-7 text-brand fill-brand" />
              </div>
              <span className="text-2xl font-black tracking-tighter">ROKTO SEBA</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Roktoseba</h4>
              <p className="text-red-100/80 font-medium leading-relaxed">
                Roktoseba is a non-profit organization dedicated to connecting blood donors with those in need.
              </p>
            </div>
            <div className="relative group max-w-xs">
              <input 
                type="email" 
                placeholder="Enter email address"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-red-100/50 transition-all backdrop-blur-sm"
              />
              <button className="absolute right-2 top-2 bg-brand-dark hover:bg-brand p-2.5 rounded-xl transition-all shadow-lg active:scale-95">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Short Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 relative inline-block">
              Short Links
              <span className="absolute -bottom-3 left-0 w-12 h-1.5 bg-white rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Donor', path: '/donors' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Softquark', path: 'https://mueen-ahmad.github.io/softquark/', external: true }
              ].map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a 
                      href={item.path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 text-red-100/80 hover:text-white transition-all group"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                        <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </a>
                  ) : (
                    <Link to={item.path} className="flex items-center gap-3 text-red-100/80 hover:text-white transition-all group">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                        <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-8 relative inline-block">
              Support
              <span className="absolute -bottom-3 left-0 w-12 h-1.5 bg-white rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Support Center', path: '/support' },
                { name: 'Apply as a Donor', path: '/register' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="flex items-center gap-3 text-red-100/80 hover:text-white transition-all group">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="flex flex-col justify-center gap-10">
            <div className="relative pl-8 group">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/20 rounded-full group-hover:bg-white/40 transition-all"></div>
              <span className="block text-5xl font-black mb-2 tracking-tighter">100+</span>
              <span className="text-red-100 font-black uppercase tracking-[0.2em] text-[10px] opacity-60">Donors</span>
            </div>
            <div className="relative pl-8 group">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/20 rounded-full group-hover:bg-white/40 transition-all"></div>
              <span className="block text-5xl font-black mb-2 tracking-tighter">200+</span>
              <span className="text-red-100 font-black uppercase tracking-[0.2em] text-[10px] opacity-60">Volunteers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/20 py-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm font-bold text-red-100/50 tracking-wide">
          Copyright © 2026 <span className="text-white">Roktoseba</span> All Right Reserved
        </div>
      </div>
    </footer>
  );
}
