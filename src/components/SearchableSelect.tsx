import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  disabled = false
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{label}</label>}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full bg-white dark:bg-slate-900 border rounded-xl p-3 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all ${
          disabled 
            ? 'bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-100 dark:border-gray-800' 
            : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <span className={!value ? "text-gray-400 dark:text-gray-500 font-medium" : "font-semibold"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl max-h-72 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-gray-50 dark:border-gray-700 sticky top-0 bg-white dark:bg-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-gray-900 dark:text-white"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 py-1 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="p-6 text-sm text-gray-400 dark:text-gray-500 text-center font-medium">No results found</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-brand-light dark:hover:bg-brand/10 flex items-center justify-between transition-colors ${
                    value === option 
                      ? 'bg-brand-light dark:bg-brand/10 text-brand font-bold' 
                      : 'text-gray-700 dark:text-gray-300 font-medium'
                  }`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {option}
                  {value === option && <Check className="h-4 w-4" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
