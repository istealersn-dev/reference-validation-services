import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  fullWidth = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center h-12 px-6 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Updated to use a subtle purple gradient matching Kriyadocs style
    primary: "bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40 hover:-translate-y-0.5 focus:ring-brand-500 border-transparent",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 focus:ring-slate-900",
    outline: "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-brand-700 focus:ring-gray-200",
    ghost: "bg-transparent text-brand-600 hover:bg-brand-50 hover:text-brand-700 focus:ring-brand-200",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};