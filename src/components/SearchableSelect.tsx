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
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full bg-white border rounded-lg p-2.5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-500 ${
          disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-900'
        }`}
      >
        <span className={!value ? "text-gray-500" : ""}>
          {value || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-red-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">No results found</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center justify-between ${
                    value === option ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-700'
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
