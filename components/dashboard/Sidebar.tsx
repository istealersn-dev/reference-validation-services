import React from 'react';
import { Home, History, Key, LogOut, Settings, HelpCircle, X, CheckCircle2 } from 'lucide-react';

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
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-wide font-sans truncate">Kriyadocs RVS</span>
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
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-200 hover:bg-red-900/20 hover:text-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};