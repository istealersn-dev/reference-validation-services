import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ReferenceValidator } from './ReferenceValidator';
import { History } from './History';
import { Settings } from './Settings';
import { ApiKeys } from './ApiKeys';
import { HelpSupport } from './HelpSupport';

interface DashboardProps {
  onLogout: () => void;
}

type DashboardView = 'dashboard' | 'history' | 'settings' | 'api-keys' | 'help-support';

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        onLogout={onLogout} 
        currentView={currentView}
        onNavigate={handleNavigate}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full">
        <Header 
          {...getHeaderProps()} 
          onLogout={onLogout}
          onNavigate={handleNavigate}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative scroll-smooth">
          <div className="mx-auto max-w-7xl">
            {currentView === 'dashboard' && <ReferenceValidator />}
            {currentView === 'history' && <History />}
            {currentView === 'settings' && <Settings />}
            {currentView === 'api-keys' && <ApiKeys />}
            {currentView === 'help-support' && <HelpSupport />}
          </div>
          
          {/* Dashboard Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400 pb-4">
            &copy; {new Date().getFullYear()} Scholarly Publishing Tech. System Status: <span className="text-green-500 font-medium">Operational</span>
          </footer>
        </main>
      </div>
    </div>
  );
};