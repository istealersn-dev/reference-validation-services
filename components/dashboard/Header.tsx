import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "Reference Validation", 
  subtitle = "New Job" 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between shadow-sm z-20">
      {/* Left Side: Breadcrumb / Title */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <span className="mx-3 text-gray-300">/</span>
        <span className="text-sm text-gray-500">{subtitle}</span>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200 mx-2"></div>

        <button className="flex items-center space-x-3 pl-2 py-1 pr-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
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
      </div>
    </header>
  );
};