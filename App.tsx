import React, { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { RegistrationForm } from '@/components/RegistrationForm';
import { PasswordResetForm } from '@/components/PasswordResetForm';
import { BrandSidebar } from '@/components/BrandSidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ContactForm } from '@/components/ContactForm';
import { Modal } from '@/components/ui/Modal';
import { CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>('login');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-white selection:bg-brand-100 selection:text-brand-900">
      {/* Left Side - Brand & Visuals (Hidden on mobile, visible on large screens) */}
      <aside className="hidden lg:flex lg:w-1/2 xl:w-5/12 relative overflow-hidden bg-brand-900 text-white">
        <BrandSidebar />
      </aside>

      {/* Right Side - Form Container */}
      <main className="w-full lg:w-1/2 xl:w-7/12 flex flex-col items-center p-6 sm:p-12 lg:p-24 relative z-10 min-h-screen">
        
        {/* Centered Content */}
        <div className="w-full max-w-md animate-fade-in-up my-auto" key={currentView}>
          {/* Mobile Logo / Brand Header */}
          <header className="lg:hidden mb-10 text-center">
            <div className="h-12 w-12 bg-brand-600 rounded-xl mx-auto mb-4 shadow-lg shadow-brand-600/30 flex items-center justify-center text-white">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans">Kriyadocs RVS</h1>
          </header>
          
          {currentView === 'login' ? (
            <LoginForm 
              onRegisterClick={() => setCurrentView('register')} 
              onForgotPasswordClick={() => setCurrentView('forgot-password')}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : currentView === 'register' ? (
            <RegistrationForm onLoginClick={() => setCurrentView('login')} />
          ) : (
            <PasswordResetForm onBackToLogin={() => setCurrentView('login')} />
          )}
          
          <div className="mt-12 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-400">
              Need help? <a href="#" onClick={(e) => { e.preventDefault(); setIsSupportModalOpen(true); }} className="font-medium text-brand-600 hover:text-brand-500 transition-colors">Contact Support</a>
            </p>
          </div>
        </div>

        {/* Footer decoration - Pushed to bottom via flex */}
        <footer className="mt-auto pt-6 text-center w-full text-xs text-gray-300 lg:text-gray-400">
          &copy; {new Date().getFullYear()} Kriyadocs RVS. All rights reserved.
        </footer>
      </main>

      {/* Support Modal */}
      <Modal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        title="Contact Support"
        className="max-w-lg"
      >
        <div className="mb-6">
           <p className="text-sm text-gray-500">Can't find what you need? Send us a message.</p>
        </div>
        <ContactForm />
      </Modal>
    </div>
  );
};

export default App;