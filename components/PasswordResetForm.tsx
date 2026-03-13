import React, { useState } from 'react';
import { Mail, Lock, Key, ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface PasswordResetFormProps {
  onBackToLogin: () => void;
}

type Step = 'request' | 'verify' | 'reset';

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onBackToLogin }) => {
  const [step, setStep] = useState<Step>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateEmail = () => {
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
    return '';
  };

  const validateCode = () => {
    if (!code.trim() || code.length < 6) {
      return 'Please enter the 6-digit code sent to your email.';
    }
    return '';
  };

  const validatePasswords = () => {
    const newErrors: {[key: string]: string} = {};
    let isValid = true;

    if (!password) {
      newErrors.password = 'New password is required.';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail();
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep('verify');
      setErrors({});
    } catch (error) {
      setErrors({ form: 'Failed to send code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const codeError = validateCode();
    if (codeError) {
      setErrors({ code: codeError });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation: fail if code is "000000"
      if (code === "000000") {
          throw new Error("Invalid code");
      }

      setStep('reset');
      setErrors({});
    } catch (error) {
      setErrors({ code: 'Invalid verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Password reset successfully! You can now login with your new password.');
      onBackToLogin();
    } catch (error) {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Password Strength Logic
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (pass.length >= 8 && /\d/.test(pass)) score += 1;
    if (pass.length >= 8 && /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(password);
  const getStrengthConfig = (score: number) => {
    switch (score) {
      case 1: return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
      case 2: return { label: 'Fair', color: 'bg-orange-400', text: 'text-orange-500' };
      case 3: return { label: 'Good', color: 'bg-yellow-400', text: 'text-yellow-600' };
      case 4: return { label: 'Strong', color: 'bg-green-500', text: 'text-green-600' };
      default: return { label: 'Too short', color: 'bg-gray-200', text: 'text-gray-400' };
    }
  };
  const strengthConfig = getStrengthConfig(passwordStrength);

  const getHeaderText = () => {
    switch (step) {
      case 'request': return 'Forgot password?';
      case 'verify': return 'Check your email';
      case 'reset': return 'Set new password';
    }
  };

  const getSubHeaderText = () => {
    switch (step) {
      case 'request': return "No worries, we'll send you reset instructions.";
      case 'verify': return `We've sent a 6-digit code to ${email}.`;
      case 'reset': return "Must be at least 8 characters.";
    }
  };

  return (
    <div className="w-full space-y-8 animate-fade-in-up">
      {/* Header */}
      <header className="space-y-2">
        <button 
          onClick={onBackToLogin}
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to login
        </button>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {getHeaderText()}
        </h2>
        <p className="text-gray-500 font-light">
          {getSubHeaderText()}
        </p>
      </header>

      {/* Step 1: Request Code */}
      {step === 'request' && (
        <form onSubmit={handleSendCode} className="space-y-6">
          <Input
            id="email"
            type="email"
            label="Email Address"
            icon={Mail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({});
            }}
            error={errors.email}
            placeholder="name@company.com"
          />
          
          <Button type="submit" fullWidth isLoading={isLoading} className="h-12 text-base shadow-brand-600/25 hover:shadow-brand-600/40">
            <span className="mr-2">Send Reset Code</span>
            {!isLoading && <ArrowRight size={18} />}
          </Button>
        </form>
      )}

      {/* Step 2: Verify Code */}
      {step === 'verify' && (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div className="bg-brand-50/50 border border-brand-100 rounded-lg p-4 flex items-start gap-3">
             <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
             <div className="text-sm text-brand-800">
               <p className="font-medium">Code sent!</p>
               <p className="opacity-90">Please check your inbox and spam folder.</p>
             </div>
          </div>

          <Input
            id="code"
            type="text"
            label="Verification Code"
            icon={Key}
            value={code}
            onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                setCode(val);
                if (errors.code) setErrors(prev => ({ ...prev, code: '' }));
            }}
            error={errors.code}
            placeholder="000000"
            maxLength={6}
            className="font-mono text-lg"
            autoFocus
          />

          <Button type="submit" fullWidth isLoading={isLoading} className="h-12 text-base shadow-brand-600/25 hover:shadow-brand-600/40">
            <span className="mr-2">Verify Code</span>
            {!isLoading && <ArrowRight size={18} />}
          </Button>
          
          <div className="text-center">
            <button 
                type="button"
                onClick={() => setStep('request')}
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
                Change email address
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Set New Password */}
      {step === 'reset' && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              icon={Lock}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
              }}
              error={errors.password}
              className="mb-2"
              autoFocus
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

            {/* Strength Indicator */}
            {password && (
              <div className="mb-4 px-1 animate-fade-in">
                <div className="flex gap-1.5 h-1.5 mb-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level}
                      className={`h-full flex-1 rounded-full transition-colors duration-500 ${
                        passwordStrength >= level ? strengthConfig.color : 'bg-gray-100'
                      }`} 
                    />
                  ))}
                </div>
                <div className="flex justify-end">
                  <span className={`text-xs font-medium transition-colors duration-300 ${strengthConfig.text}`}>
                    {strengthConfig.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm New Password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }}
            error={errors.confirmPassword}
            rightElement={
              <button
                type="button"
                className="text-gray-400 hover:text-brand-600 transition-colors focus:outline-none p-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <Button type="submit" fullWidth isLoading={isLoading} className="h-12 text-base shadow-brand-600/25 hover:shadow-brand-600/40 mt-2">
            <span className="mr-2">Reset Password</span>
            {!isLoading && <ArrowRight size={18} />}
          </Button>
        </form>
      )}
    </div>
  );
};