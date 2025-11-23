import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { ReferenceValidator } from '@/components/dashboard/ReferenceValidator';
import { History } from '@/components/dashboard/History';
import { Settings } from '@/components/dashboard/Settings';
import { ApiKeys } from '@/components/dashboard/ApiKeys';
import { HelpSupport } from '@/components/dashboard/HelpSupport';
import { LogOut } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface DashboardProps {
  onLogout: () => void;
}

type DashboardView = 'dashboard' | 'history' | 'settings' | 'api-keys' | 'help-support';

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State lifted from Settings and Sidebar
  const [userAvatar, setUserAvatar] = useState('https://picsum.photos/seed/user123/200/200');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const getHeaderProps = () => {
    switch (currentView) {
      case 'history':
        return { title: 'Reference Validation', subtitle: 'History Log' };
      case 'settings':
        return { title: 'Account', subtitle: 'Settings' };
      case 'api-keys':
        return { title: 'Developer', subtitle: 'API Keys' };
      case 'help-support':
        return { title: 'Support', subtitle: 'Help Center' };
      case 'dashboard':
      default:
        return { title: 'Reference Validation', subtitle: 'New Job' };
    }
  };

  const handleNavigate = (view: DashboardView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close sidebar on mobile when navigating
  };

  const handleLogoutRequest = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        onLogout={handleLogoutRequest} 
        currentView={currentView}
        onNavigate={handleNavigate}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full">
        <Header 
          {...getHeaderProps()} 
          onLogout={handleLogoutRequest}
          onNavigate={handleNavigate}
          onMenuClick={() => setIsMobileMenuOpen(true)}
          userAvatar={userAvatar}
        />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative scroll-smooth">
          <div className="mx-auto max-w-7xl">
            {currentView === 'dashboard' && <ReferenceValidator />}
            {currentView === 'history' && <History />}
            {currentView === 'settings' && (
              <Settings 
                currentAvatar={userAvatar} 
                onAvatarUpdate={setUserAvatar} 
              />
            )}
            {currentView === 'api-keys' && <ApiKeys />}
            {currentView === 'help-support' && <HelpSupport />}
          </div>
          
          {/* Dashboard Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400 pb-4">
            &copy; {new Date().getFullYear()} Scholarly Publishing Tech. System Status: <span className="text-green-500 font-medium">Operational</span>
          </footer>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
         isOpen={showLogoutConfirm}
         onClose={() => setShowLogoutConfirm(false)}
         showCloseButton={false}
         className="max-w-md"
      >
        <div className="text-center md:text-left">
             <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0 ring-4 ring-red-50">
                 <LogOut className="w-6 h-6 text-red-600 ml-0.5" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Sign out?</h3>
             <p className="text-gray-500 leading-relaxed mb-8">
                 Are you sure you want to sign out of your account? You will need to sign in again to access your dashboard.
             </p>

             <div className="flex justify-end gap-3">
                <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                    Cancel
                </button>
                <button
                    onClick={handleConfirmLogout}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                    Sign Out
                </button>
            </div>
        </div>
      </Modal>
    </div>
  );
};