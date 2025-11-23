import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, User, CreditCard, LogOut, Menu, FileText, Key, Settings, Download, Shield } from 'lucide-react';

type DashboardView = 'dashboard' | 'history' | 'settings' | 'api-keys' | 'help-support';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onLogout?: () => void;
  onNavigate?: (view: DashboardView) => void;
  onMenuClick?: () => void;
  userAvatar?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "Reference Validation", 
  subtitle = "New Job",
  onLogout,
  onNavigate,
  onMenuClick,
  userAvatar = "https://picsum.photos/seed/user123/200/200"
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Mock Notifications representing last 5 user actions
  const notifications = [
    { 
      id: 1, 
      title: 'Validated manuscript_v2.docx', 
      time: '2 mins ago', 
      icon: FileText, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      id: 2, 
      title: "Created API Key 'Production'", 
      time: '1 hour ago', 
      icon: Key, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50' 
    },
    { 
      id: 3, 
      title: 'Updated profile avatar', 
      time: '3 hours ago', 
      icon: User, 
      color: 'text-green-600', 
      bg: 'bg-green-50' 
    },
    { 
      id: 4, 
      title: 'Exported validation report', 
      time: 'Yesterday', 
      icon: Download, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50' 
    },
    { 
      id: 5, 
      title: 'Changed account password', 
      time: '2 days ago', 
      icon: Shield, 
      color: 'text-red-600', 
      bg: 'bg-red-50' 
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle Profile Dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      // Handle Notification Dropdown
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isDropdownOpen || isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isNotificationOpen]);

  const handleNotificationClick = () => {
      setIsNotificationOpen(!isNotificationOpen);
      if (!isNotificationOpen) {
          setHasUnread(false);
          // Close profile dropdown if open
          setIsDropdownOpen(false);
      }
  };

  const handleProfileClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
      if (!isDropdownOpen) {
          // Close notification dropdown if open
          setIsNotificationOpen(false);
      }
  };

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
        
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
            <button 
                onClick={handleNotificationClick}
                className={`p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative ${isNotificationOpen ? 'bg-gray-100 text-brand-600' : ''}`}
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
                {hasUnread && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in z-50 origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-semibold text-gray-900 text-sm">Recent Activity</h3>
                        <button className="text-xs text-brand-600 hover:text-brand-700 font-medium">Mark all as read</button>
                    </div>
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                        {notifications.map((item) => (
                            <button 
                                key={item.id} 
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-0 group"
                            >
                                <div className={`p-2 rounded-full flex-shrink-0 ${item.bg} ${item.color}`}>
                                    <item.icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-800 font-medium leading-snug truncate group-hover:text-brand-700 transition-colors">{item.title}</p>
                                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                                </div>
                                {item.id <= 2 && hasUnread && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0"></div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-xl text-center">
                        <button 
                            onClick={() => {
                                if (onNavigate) onNavigate('history');
                                setIsNotificationOpen(false);
                            }}
                            className="text-xs text-gray-500 hover:text-brand-600 font-medium transition-colors"
                        >
                            View full history
                        </button>
                    </div>
                </div>
            )}
        </div>

        <div className="h-6 w-px bg-gray-200 mx-1 md:mx-2"></div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={handleProfileClick}
            className={`flex items-center space-x-2 md:space-x-3 pl-1 md:pl-2 py-1 pr-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent ${isDropdownOpen ? 'bg-gray-50 border-gray-200' : 'hover:border-gray-200'}`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-brand-700 p-0.5">
              <img 
                  src={userAvatar} 
                  alt="User" 
                  className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="hidden md:block text-left mr-1">
               <p className="text-sm font-semibold text-gray-700 leading-none">Jane Doe</p>
               <p className="text-xs text-gray-400 mt-0.5">Editorial Manager</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 hidden md:block transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 animate-fade-in z-50 origin-top-right">
              {/* Mobile User Info */}
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
                  if (onNavigate) onNavigate('settings'); // Billing is in settings tabs
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