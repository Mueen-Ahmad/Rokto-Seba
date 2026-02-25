import { Link } from 'react-router-dom';
import { Droplet, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Droplet className="h-8 w-8 text-red-600 fill-red-600" />
              <span className="font-bold text-xl text-gray-900">Rokto Seba</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-red-600 font-medium">হোম (Home)</Link>
            <Link to="/donors" className="text-gray-700 hover:text-red-600 font-medium">রক্তদাতা খুঁজুন (Search)</Link>
            <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium transition-colors">
              রক্তদাতা হন (Join)
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium">
              হোম (Home)
            </Link>
            <Link to="/donors" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium">
              রক্তদাতা খুঁজুন (Search)
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-red-600 font-medium">
              রক্তদাতা হন (Join)
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
