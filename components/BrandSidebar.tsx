import React from 'react';

export const BrandSidebar: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-16 overflow-hidden bg-brand-900">
      
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Deep Brand Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-[#3b1466] to-[#250b42] opacity-100"></div>
        
        {/* Refined Dot Grid Pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', 
               backgroundSize: '40px 40px',
               backgroundPosition: '0 0'
             }}>
        </div>
        
        {/* Subtle Wave/Gradient Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-brand-900/80"></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>

      {/* Brand Content */}
      <div className="relative z-10">
        <header className="flex items-center space-x-3 mb-8">
           <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
           </div>
           <span className="text-xl font-bold tracking-wide text-white font-sans">KriyaDocs Publisher</span>
        </header>
      </div>

      <div className="relative z-10 max-w-md">
        <h2 className="text-4xl font-bold text-white mb-6 leading-snug tracking-tight">
          Transforming scholarly publishing.
        </h2>
        <p className="text-brand-100 text-lg leading-relaxed mb-8 font-light opacity-90">
          Accelerate your publishing workflow with our intelligent, document-centric platform designed for the modern era of research.
        </p>
        
        <div className="flex items-center space-x-4 pt-8 border-t border-white/10">
           <div className="flex -space-x-3">
             {[1, 2, 3].map((i) => (
               <div key={i} className={`w-10 h-10 rounded-full border-2 border-brand-800 bg-brand-700 overflow-hidden ring-2 ring-brand-900/50`}>
                 <img src={`https://picsum.photos/seed/${i + 55}/100/100`} alt="User" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
               </div>
             ))}
           </div>
           <div className="text-sm text-brand-100 pl-2">
             <span className="font-bold text-white">Trusted by 500+</span> leading publishers.
           </div>
        </div>
      </div>
    </div>
  );
};