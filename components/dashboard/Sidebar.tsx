import React, { useState } from 'react';
import { Home, History, Key, LogOut, Settings, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  currentView?: 'dashboard' | 'history' | 'settings' | 'api-keys' | 'help-support';
  onNavigate?: (view: 'dashboard' | 'history' | 'settings' | 'api-keys' | 'help-support') => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onLogout, 
  currentView = 'dashboard',
  onNavigate = (_view) => {},
  isOpen = false,
  onClose = () => {}
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const linkBaseClass = "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left";
  const activeClass = "bg-brand-800 text-white shadow-sm";
  const inactiveClass = "text-brand-100 hover:bg-brand-800/50 hover:text-white";

  return (
    <>
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-brand-900 text-white flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {/* Logo Area */}
        <header className="p-6 flex items-center justify-between border-b border-brand-800">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-brand-600 rounded-lg shadow-lg shadow-brand-600/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-wide font-sans truncate">Publisher Portal</span>
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1 text-brand-200 hover:text-white rounded-md hover:bg-brand-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Main Navigation">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`${linkBaseClass} ${currentView === 'dashboard' ? activeClass : inactiveClass}`}
            aria-current={currentView === 'dashboard' ? 'page' : undefined}
          >
            <Home className={`w-5 h-5 mr-3 ${currentView === 'dashboard' ? 'text-brand-300' : 'text-brand-400'}`} />
            Dashboard
          </button>
          
          <button 
            onClick={() => onNavigate('history')}
            className={`${linkBaseClass} ${currentView === 'history' ? activeClass : inactiveClass}`}
            aria-current={currentView === 'history' ? 'page' : undefined}
          >
            <History className={`w-5 h-5 mr-3 ${currentView === 'history' ? 'text-brand-300' : 'text-brand-400'}`} />
            History
          </button>
          
          <button 
            onClick={() => onNavigate('api-keys')}
            className={`${linkBaseClass} ${currentView === 'api-keys' ? activeClass : inactiveClass}`}
            aria-current={currentView === 'api-keys' ? 'page' : undefined}
          >
            <Key className={`w-5 h-5 mr-3 ${currentView === 'api-keys' ? 'text-brand-300' : 'text-brand-400'}`} />
            API Keys
          </button>

          <button 
            onClick={() => onNavigate('settings')}
            className={`${linkBaseClass} ${currentView === 'settings' ? activeClass : inactiveClass}`}
            aria-current={currentView === 'settings' ? 'page' : undefined}
          >
            <Settings className={`w-5 h-5 mr-3 ${currentView === 'settings' ? 'text-brand-300' : 'text-brand-400'}`} />
            Settings
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-brand-800 space-y-2">
          <button 
            onClick={() => onNavigate('help-support')}
            className={`${linkBaseClass} ${currentView === 'help-support' ? activeClass : inactiveClass}`}
            aria-current={currentView === 'help-support' ? 'page' : undefined}
          >
            <HelpCircle className={`w-4 h-4 mr-3 ${currentView === 'help-support' ? 'text-brand-300' : 'text-brand-400'}`} />
            Help & Support
          </button>
          
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-200 hover:bg-red-900/20 hover:text-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="logout-title">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-up border border-gray-100">
                <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                         <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center ring-4 ring-red-50">
                            <LogOut className="w-6 h-6 text-red-600 ml-0.5" />
                         </div>
                         <div className="flex-1">
                             <h3 id="logout-title" className="text-xl font-bold text-gray-900">Sign out?</h3>
                             <p className="text-gray-500 mt-2 leading-relaxed">
                                 Are you sure you want to sign out of your account? You will need to sign in again to access your dashboard.
                             </p>
                         </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            onClick={() => setShowLogoutConfirm(false)}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setShowLogoutConfirm(false);
                                onLogout();
                            }}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};