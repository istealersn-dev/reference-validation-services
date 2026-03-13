import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

interface NotFoundProps {
  onGoHome: () => void;
  onContactSupport?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome, onContactSupport }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 relative overflow-hidden font-sans text-slate-800">
      
      {/* Background Pattern - Subtle Dot Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(#5f259f 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      {/* Background Blobs (Decoration) */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

      {/* Content Container */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center w-full max-w-lg px-6 py-12 mx-auto text-center">
        
        {/* Brand Logo (Small & Centered) */}
        <div className="flex justify-center mb-8">
            <div className="h-12 w-12 bg-white rounded-xl shadow-lg shadow-brand-600/10 flex items-center justify-center border border-gray-100">
              <CheckCircle2 className="w-7 h-7 text-brand-600" />
            </div>
        </div>

        {/* 404 Typography */}
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-600 to-brand-800 tracking-tight leading-none mb-2 select-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page not found
        </h2>

        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed text-wrap-pretty">
          Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={onGoHome} 
            className="w-full sm:w-auto min-w-[160px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onContactSupport} 
            className="w-full sm:w-auto min-w-[160px] bg-white hover:bg-gray-50"
          >
            Contact Support
          </Button>
        </div>

        {/* Search Suggestion (Optional Polish) */}
        <div className="mt-12 pt-8 border-t border-gray-200/60">
            <p className="text-sm text-gray-400 flex items-center justify-center">
                <Search className="w-3.5 h-3.5 mr-1.5" />
                Error Code: RVS_404_NOT_FOUND
            </p>
        </div>
      </main>

      {/* Footer - Flexbox positioning */}
      <footer className="relative z-10 w-full text-center pb-6 mt-auto">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Kriyadocs RVS. All rights reserved.
        </p>
      </footer>
    </div>
  );
};