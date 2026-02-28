import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navLinks = [
    { name: 'হোম', path: '/', eng: 'Home' },
    { name: 'রক্তদাতা খুঁজুন', path: '/donors', eng: 'Search' },
    { name: 'জরুরী', path: '/emergency', eng: 'Emergency', highlight: true },
    { name: 'আর্কাইভ', path: '/archives', eng: 'Archives' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-brand p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                <Droplet className="h-6 w-6 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white leading-none">Rokto Seba</span>
                <span className="text-[10px] font-medium text-brand uppercase tracking-widest mt-1">Softquark Tech</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-brand-light dark:bg-brand/10 text-brand'
                    : link.highlight 
                      ? 'text-brand hover:bg-brand-light dark:hover:bg-brand/10'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors mr-2"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link to="/register" className="btn-primary py-2 px-5 text-sm">
              রক্তদাতা হন
            </Link>
          </div>

          <div className="flex items-center md:hidden gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive(link.path)
                      ? 'bg-brand-light dark:bg-brand/10 text-brand'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name} <span className="text-xs font-normal text-gray-400 ml-1">({link.eng})</span>
                </Link>
              ))}
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-primary mt-4"
              >
                রক্তদাতা হন (Join)
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
