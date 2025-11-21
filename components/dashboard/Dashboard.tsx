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

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar Navigation (Fixed Left) */}
      <Sidebar 
        onLogout={onLogout} 
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header {...getHeaderProps()} />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 relative scroll-smooth">
          {currentView === 'dashboard' && <ReferenceValidator />}
          {currentView === 'history' && <History />}
          {currentView === 'settings' && <Settings />}
          {currentView === 'api-keys' && <ApiKeys />}
          {currentView === 'help-support' && <HelpSupport />}
          
          {/* Dashboard Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Scholarly Publishing Tech. System Status: <span className="text-green-500 font-medium">Operational</span>
          </div>
        </main>
      </div>
    </div>
  );
};