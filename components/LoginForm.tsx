import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { OrcidIcon } from '@/components/icons/OrcidIcon';

interface LoginFormProps {
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
  onLoginSuccess?: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onRegisterClick, onForgotPasswordClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ORCID Specific State
  const [isOrcidLoading, setIsOrcidLoading] = useState(false);
  const [orcidError, setOrcidError] = useState('');

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@organization.org).';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear form-level errors on submit
    setErrors(prev => ({ ...prev, form: undefined }));

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation logic for demonstration purposes
      if (formData.email.toLowerCase().includes('fail') || formData.password.length < 6) {
        throw new Error('Invalid credentials');
      }

      // Success logic
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        form: 'We couldn\'t find an account with those credentials. Please check your email and password and try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleOrcidLogin = async () => {
    setIsOrcidLoading(true);
    setOrcidError('');
    
    try {
        // Simulate OAuth Handshake
        await new Promise((resolve, reject) => setTimeout(() => {
             // Randomly simulate failure for demonstration if 'fail' is in email input (optional trick) 
             // or just standard success for happy path.
             // Uncomment next line to test error state manually if needed:
             // reject(new Error("ORCID_TIMEOUT")); 
             resolve(true);
        }, 2000));
        
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    } catch (error) {
        setOrcidError("Unable to authenticate with ORCID. Please try again or use your email credentials.");
    } finally {
        setIsOrcidLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
        <p className="text-gray-500 font-light">Enter your credentials to access the dashboard.</p>
      </header>

      {/* Social / SSO Login */}
      <div>
        <Button 
          variant="outline" 
          fullWidth 
          isLoading={isOrcidLoading}
          className="h-12 group relative border-gray-200 hover:border-orcid hover:bg-orcid/5 hover:shadow-lg hover:shadow-orcid/20 hover:-translate-y-0.5 transition-all duration-300"
          onClick={handleOrcidLogin}
          type="button"
          disabled={isLoading}
        >
          {isOrcidLoading ? (
             <span className="text-gray-600 font-medium">Connecting to ORCID...</span>
          ) : (
             <div className="flex items-center justify-center space-x-3">
                <OrcidIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-gray-700 font-semibold group-hover:text-orcid transition-colors">Sign in with ORCID</span>
             </div>
          )}
        </Button>
        
        {/* Specific ORCID Error Feedback - Prominent & Dismissible */}
        {orcidError && (
            <div 
                role="alert" 
                className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start justify-between shadow-sm animate-fade-in relative"
            >
                <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-red-900">Authentication Failed</h4>
                        <p className="text-sm text-red-800 mt-1 leading-relaxed">{orcidError}</p>
                    </div>
                </div>
                <button 
                    onClick={() => setOrcidError('')}
                    className="text-red-500 hover:text-red-800 hover:bg-red-100 rounded-md p-1.5 transition-colors absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto sm:self-start sm:-mr-1 sm:-mt-1"
                    aria-label="Dismiss error message"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        )}
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400 font-medium tracking-widest">Or continue with</span>
        </div>
      </div>

      {/* General Form Error Alert */}
      {errors.form && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start space-x-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 leading-relaxed font-medium">
            {errors.form}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          type="email"
          label="Email Address"
          icon={Mail}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          autoComplete="username"
          placeholder="name@company.com"
          disabled={isOrcidLoading || isLoading}
        />
        
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          icon={Lock}
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          autoComplete="current-password"
          placeholder="Enter your password"
          disabled={isOrcidLoading || isLoading}
          rightElement={
            <button
              type="button"
              className="text-gray-400 hover:text-brand-600 transition-colors focus:outline-none p-1"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-brand-600 checked:bg-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isOrcidLoading || isLoading}
                />
                <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
          </label>

          <button 
            type="button"
            onClick={onForgotPasswordClick}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline decoration-brand-500/30 underline-offset-4 transition-all"
            disabled={isOrcidLoading || isLoading}
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading} disabled={isOrcidLoading} className="h-12 text-base shadow-brand-600/25 hover:shadow-brand-600/40 mt-2">
          <span className="mr-2">Sign In</span>
          {!isLoading && <ArrowRight size={18} />}
        </Button>
      </form>

      {/* Registration Link */}
      <div className="text-center pt-2">
         <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onRegisterClick(); }}
              className="font-bold text-brand-600 hover:text-brand-700 hover:underline decoration-2 decoration-brand-600 underline-offset-4 transition-all"
            >
              Request access
            </a>
         </p>
      </div>
    </div>
  );
};