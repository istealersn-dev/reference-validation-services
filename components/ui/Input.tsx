import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon: Icon, 
  rightElement, 
  error, 
  id, 
  className = '', 
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mb-5 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"
      >
        {label}
      </label>
      
      <div
        className={`
          relative flex items-center w-full rounded-lg border bg-gray-50/50 transition-all duration-200
          ${error 
            ? 'border-red-300 bg-red-50/30 ring-4 ring-red-500/10' 
            : `border-gray-200 hover:border-gray-300 ${isFocused ? 'border-brand-500 ring-4 ring-brand-500/10 bg-white' : ''}`
          }
        `}
      >
        {Icon && (
          <div className={`pl-3 flex-shrink-0 transition-colors duration-200 ${isFocused ? 'text-brand-600' : 'text-gray-400'}`}>
            <Icon size={20} />
          </div>
        )}
        
        <input
          {...props}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : props['aria-describedby']}
          className={`
            w-full bg-transparent border-none outline-none py-3 text-gray-900 text-base placeholder-gray-400
            disabled:cursor-not-allowed disabled:opacity-50
            ${Icon ? 'pl-3' : 'pl-4'}
            ${rightElement ? 'pr-2' : 'pr-4'}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
        />

        {rightElement && (
          <div className="pr-3 flex-shrink-0 text-gray-400">
            {rightElement}
          </div>
        )}
      </div>
      
      {error && (
        <div 
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 ml-1 text-xs text-red-500 font-medium flex items-start animate-fade-in"
        >
          <span className="mr-1.5 text-[10px] mt-[2px]" aria-hidden="true">●</span> 
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};