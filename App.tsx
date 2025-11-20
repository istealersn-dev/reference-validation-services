import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';
import { PasswordResetForm } from './components/PasswordResetForm';
import { BrandSidebar } from './components/BrandSidebar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>('login');

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-white selection:bg-brand-100 selection:text-brand-900">
      {/* Left Side - Brand & Visuals (Hidden on mobile, visible on large screens) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 relative overflow-hidden bg-brand-900 text-white">
        <BrandSidebar />
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative z-10">
        <div className="w-full max-w-md animate-fade-in-up" key={currentView}>
          {/* Mobile Logo / Brand Header */}
          <div className="lg:hidden mb-10 text-center">
            <div className="h-12 w-12 bg-brand-600 rounded-xl mx-auto mb-4 shadow-lg shadow-brand-600/30 flex items-center justify-center text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans">Publisher Portal</h1>
          </div>
          
          {currentView === 'login' ? (
            <LoginForm 
              onRegisterClick={() => setCurrentView('register')} 
              onForgotPasswordClick={() => setCurrentView('forgot-password')}
            />
          ) : currentView === 'register' ? (
            <RegistrationForm onLoginClick={() => setCurrentView('login')} />
          ) : (
            <PasswordResetForm onBackToLogin={() => setCurrentView('login')} />
          )}
          
          <div className="mt-12 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-400">
              Need help? <a href="#" className="font-medium text-brand-600 hover:text-brand-500 transition-colors">Contact Support</a>
            </p>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="absolute bottom-6 text-center w-full text-xs text-gray-300 lg:text-gray-400">
          &copy; {new Date().getFullYear()} Scholarly Publishing Tech. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default App;