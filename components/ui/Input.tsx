import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon: Icon, error, id, className = '', ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  // Handle auto-fill detection
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <div className={`mb-5 group ${className}`}>
      <div
        className={`
          relative flex items-center w-full rounded-lg border bg-gray-50/50 overflow-hidden
          transition-all duration-300 ease-out
          ${error 
            ? 'border-red-300 bg-red-50/30 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10' 
            : 'border-gray-200 hover:border-gray-300 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:bg-white'
          }
        `}
      >
        {Icon && (
          <div className={`pl-4 transition-colors duration-300 ${isFocused || hasValue ? 'text-brand-600' : 'text-gray-400'}`}>
            <Icon size={20} />
          </div>
        )}
        
        <div className="flex-1 relative h-14">
          <input
            {...props}
            id={id}
            className={`
              w-full h-full bg-transparent border-none outline-none px-4 pt-6 pb-1 text-gray-900 text-base font-medium placeholder-transparent
              disabled:cursor-not-allowed disabled:opacity-50
              ${Icon ? 'pl-2' : 'pl-4'}
            `}
            onFocus={(e) => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={handleBlur}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              if (props.onChange) props.onChange(e);
            }}
          />
          <label
            htmlFor={id}
            className={`
              absolute left-0 transition-all duration-200 ease-out pointer-events-none
              ${Icon ? 'pl-2' : 'pl-4'}
              ${isFocused || hasValue 
                ? 'top-2 text-[10px] text-brand-600 font-bold uppercase tracking-wider' 
                : 'top-4 text-gray-500 text-base font-normal group-hover:text-gray-600'
              }
            `}
          >
            {label}
          </label>
        </div>
      </div>
      
      {error && (
        <div className="mt-1.5 ml-1 text-xs text-red-500 font-medium flex items-start animate-fade-in">
          <span className="mr-1.5 text-[10px] mt-[2px]">●</span> 
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};