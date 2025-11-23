import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, User, CreditCard, LogOut, Menu } from 'lucide-react';

type DashboardView = 'dashboard' | 'history' | 'settings' | 'api-keys' | 'help-support';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onLogout?: () => void;
  onNavigate?: (view: DashboardView) => void;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "Reference Validation", 
  subtitle = "New Job",
  onLogout,
  onNavigate,
  onMenuClick
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 md:px-6 flex items-center justify-between shadow-sm z-20 sticky top-0">
      {/* Left Side: Menu Toggle & Title */}
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-brand-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center overflow-hidden whitespace-nowrap">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">{title}</h1>
          <span className="mx-2 md:mx-3 text-gray-300 hidden sm:inline">/</span>
          <span className="text-sm text-gray-500 hidden sm:inline truncate">{subtitle}</span>
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200 mx-1 md:mx-2"></div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 md:space-x-3 pl-1 md:pl-2 py-1 pr-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-brand-700 p-0.5">
              <img 
                  src="https://picsum.photos/seed/user123/200/200" 
                  alt="User" 
                  className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="hidden md:block text-left mr-1">
               <p className="text-sm font-semibold text-gray-700 leading-none">Jane Doe</p>
               <p className="text-xs text-gray-400 mt-0.5">Editorial Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 animate-fade-in z-50 origin-top-right">
              <div className="px-4 py-3 border-b border-gray-100 md:hidden bg-gray-50/50">
                <p className="text-sm font-semibold text-gray-900">Jane Doe</p>
                <p className="text-xs text-gray-500 truncate">jane.doe@example.com</p>
              </div>
              
              <button 
                onClick={() => {
                  if (onNavigate) onNavigate('settings');
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 flex items-center transition-colors"
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </button>
              
              <button 
                onClick={() => {
                  if (onNavigate) onNavigate('settings');
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 flex items-center transition-colors"
              >
                <CreditCard className="w-4 h-4 mr-3" />
                Billing
              </button>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button 
                onClick={() => {
                  if (onLogout) onLogout();
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};