import React, { useState } from 'react';
import { Mail, Lock, User, Building, ArrowRight, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { OrcidIcon } from '@/components/icons/OrcidIcon';

interface RegistrationFormProps {
  onLoginClick: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  form?: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [consents, setConsents] = useState({
    terms: false,
    marketing: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!consents.terms) {
      newErrors.terms = 'You must agree to the Terms and Privacy Policy.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;

    // Base requirement: length 8
    if (pass.length >= 8) score += 1;
    
    // Bonus points
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1; // Mixed case
    if (pass.length >= 8 && /\d/.test(pass)) score += 1; // Numbers
    if (pass.length >= 8 && /[^A-Za-z0-9]/.test(pass)) score += 1; // Special chars

    return score; // Max 4
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, form: undefined }));

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success simulation
      alert('Registration request sent successfully! Please check your email.');
      onLoginClick();
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        form: 'Something went wrong during registration. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrcidSignup = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Redirecting to ORCID for signup...');
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
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

  return (
    <div className="w-full space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign up</h2>
        <p className="text-gray-500 font-light">Join our community of scholarly publishers.</p>
      </header>

      {/* Social / SSO Signup */}
      <div>
        <Button 
          variant="outline" 
          fullWidth 
          className="h-12 group relative border-gray-200 hover:border-orcid hover:bg-orcid/5 hover:shadow-lg hover:shadow-orcid/20 hover:-translate-y-0.5 transition-all duration-300"
          onClick={handleOrcidSignup}
          type="button"
        >
          <div className="flex items-center justify-center space-x-3">
            <OrcidIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-gray-700 font-semibold group-hover:text-orcid transition-colors">Sign up with ORCID</span>
          </div>
        </Button>
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400 font-medium tracking-widest">Or continue with</span>
        </div>
      </div>

      {/* General Error Alert */}
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
          id="name"
          label="Full Name"
          icon={User}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          placeholder="e.g. John Smith"
        />

        <Input
          id="email"
          type="email"
          label="Email Address"
          icon={Mail}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          placeholder="name@company.com"
        />

        <div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            icon={Lock}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            className="mb-2"
            placeholder="Create a password"
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
          
          {/* Password Strength Indicator */}
          {formData.password && (
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
          label="Confirm Password"
          icon={Lock}
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
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

        <Input
          id="company"
          label="Company Name"
          icon={Building}
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          error={errors.company}
          placeholder="e.g. Acme Publishing"
        />

        {/* Consent Checkboxes */}
        <div className="space-y-4 pt-2">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-brand-600 checked:bg-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
                checked={consents.terms}
                onChange={(e) => {
                    setConsents(prev => ({ ...prev, terms: e.target.checked }));
                    if(errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
                }}
              />
              <svg className="pointer-events-none absolute left-0.5 top-1 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                 <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-brand-600 hover:underline">Terms of Service</a>.
              </label>
              {errors.terms && (
                  <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
              )}
            </div>
          </div>

          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="marketing"
                name="marketing"
                type="checkbox"
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-brand-600 checked:bg-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
                checked={consents.marketing}
                onChange={(e) => setConsents(prev => ({ ...prev, marketing: e.target.checked }))}
              />
               <svg className="pointer-events-none absolute left-0.5 top-1 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                 <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="marketing" className="text-gray-500">
                I agree to receive product updates and marketing communications.
              </label>
            </div>
          </div>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading} className="h-12 text-base shadow-brand-600/25 hover:shadow-brand-600/40 mt-2">
          <span className="mr-2">Sign Up</span>
          {!isLoading && <ArrowRight size={18} />}
        </Button>
      </form>

      <div className="text-center pt-2">
         <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onLoginClick(); }}
              className="font-bold text-brand-600 hover:text-brand-700 hover:underline decoration-2 decoration-brand-600 underline-offset-4 transition-all"
            >
              Sign in
            </a>
         </p>
      </div>
    </div>
  );
};