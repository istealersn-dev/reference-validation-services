import React, { useState, useRef } from 'react';
import { User, CreditCard, AlertTriangle, Camera, Mail, Globe, Shield, Trash2, Check, CreditCard as CardIcon, Briefcase, ChevronDown, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { OrcidIcon } from '@/components/icons/OrcidIcon';

type Tab = 'profile' | 'billing' | 'misc';

interface SettingsProps {
  currentAvatar?: string;
  onAvatarUpdate?: (url: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  currentAvatar = "https://picsum.photos/seed/user123/200/200", 
  onAvatarUpdate 
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal States
  const [showClearHistoryModal, setShowClearHistoryModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [deleteConfirmationEmail, setDeleteConfirmationEmail] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Mock User Data
  const [profile, setProfile] = useState({
    givenName: 'Jane',
    familyName: 'Doe',
    displayName: 'Jane Doe',
    email: 'jane.doe@scholarly-pub.com',
    jobTitle: 'Editorial Manager',
    country: 'United States',
    orcid: '0000-0002-1825-0097',
    isOrcidLinked: true
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAvatarUpdate) {
      // Create a local URL for the selected file to display immediately
      const imageUrl = URL.createObjectURL(file);
      onAvatarUpdate(imageUrl);
    }
  };

  // --- Danger Zone Handlers ---

  const handleClearHistoryClick = () => {
    setShowClearHistoryModal(true);
  };

  const confirmClearHistory = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowClearHistoryModal(false);
  };

  const handleDeleteAccountClick = () => {
    setDeleteConfirmationEmail('');
    setDeleteError('');
    setShowDeleteAccountModal(true);
  };

  const confirmDeleteAccount = async () => {
    if (deleteConfirmationEmail !== profile.email) {
        setDeleteError('The email address you entered does not match your account email.');
        return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowDeleteAccountModal(false);
    // Force a reload to simulate account deletion/logout for this demo
    window.location.reload(); 
  };

  return (
    <section aria-labelledby="settings-title" className="max-w-4xl mx-auto animate-fade-in relative">
      
      {/* Page Header */}
      <header className="mb-8">
        <h2 id="settings-title" className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 mt-1">Manage your personal information, billing details, and security preferences.</p>
      </header>

      {/* Tabs Navigation */}
      <nav aria-label="Settings Tabs" className="flex space-x-1 bg-gray-100/80 p-1 rounded-xl mb-8 w-full md:w-fit overflow-x-auto" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
          className={`
            flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-1 md:flex-none
            ${activeTab === 'profile' 
              ? 'bg-white text-brand-700 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }
          `}
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'billing'}
          onClick={() => setActiveTab('billing')}
          className={`
            flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-1 md:flex-none
            ${activeTab === 'billing' 
              ? 'bg-white text-brand-700 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }
          `}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Billing
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'misc'}
          onClick={() => setActiveTab('misc')}
          className={`
            flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-1 md:flex-none
            ${activeTab === 'misc' 
              ? 'bg-white text-red-600 shadow-sm ring-1 ring-red-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }
          `}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Danger Zone
        </button>
      </nav>

      {/* CONTENT AREAS */}
      
      {/* --- PROFILE TAB --- */}
      {activeTab === 'profile' && (
        <section role="tabpanel" className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in-up">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                    aria-label="Upload Avatar"
                />
                <div 
                    className="relative group cursor-pointer" 
                    onClick={handleAvatarClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleAvatarClick() }}
                >
                  <div className="w-32 h-32 rounded-full p-1 border-2 border-dashed border-gray-300 group-hover:border-brand-400 transition-colors">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                        <img 
                            src={currentAvatar}
                            alt="Avatar" 
                            className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Camera className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-md border border-gray-200 text-gray-500 group-hover:text-brand-600">
                     <Camera className="w-4 h-4" />
                  </div>
                </div>
                <button 
                    type="button"
                    onClick={handleAvatarClick}
                    className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded px-2 py-1"
                >
                    Change Avatar
                </button>
              </div>

              {/* Form Section */}
              <form className="flex-1 space-y-5" onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input 
                        label="Given Name"
                        id="givenName"
                        value={profile.givenName}
                        onChange={(e) => setProfile({...profile, givenName: e.target.value})}
                    />
                    <Input 
                        label="Family Name"
                        id="familyName"
                        value={profile.familyName}
                        onChange={(e) => setProfile({...profile, familyName: e.target.value})}
                    />
                </div>

                <Input 
                    label="Display Name"
                    id="displayName"
                    icon={User}
                    value={profile.displayName}
                    onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                    placeholder="How your name appears in the header"
                />

                <Input 
                    label="Job Title"
                    id="jobTitle"
                    icon={Briefcase}
                    value={profile.jobTitle}
                    onChange={(e) => setProfile({...profile, jobTitle: e.target.value})}
                    placeholder="e.g. Senior Editor"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input 
                        label="Email Address"
                        id="email"
                        type="email"
                        icon={Mail}
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                    <div className="relative mb-5">
                         <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Country</label>
                         <div className="relative flex items-center w-full rounded-lg border border-gray-200 bg-gray-50/50 hover:border-gray-300 overflow-hidden focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:bg-white transition-all duration-200">
                                <div className="pl-3 text-gray-400">
                                    <Globe size={20} />
                                </div>
                                <select 
                                    className="w-full h-full bg-transparent border-none outline-none py-3 pl-3 pr-8 text-gray-900 text-base appearance-none cursor-pointer"
                                    value={profile.country}
                                    onChange={(e) => setProfile({...profile, country: e.target.value})}
                                >
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Canada</option>
                                    <option>Germany</option>
                                    <option>Australia</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                   <ChevronDown size={16} />
                                </div>
                        </div>
                    </div>
                </div>

                {/* ORCID Section */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center">
                            <OrcidIcon className="w-6 h-6 mr-2" />
                            <span className="font-bold text-gray-700">ORCID iD</span>
                        </div>
                        {profile.isOrcidLinked && (
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                                <Check className="w-3 h-3 mr-1" /> Verified
                             </span>
                        )}
                    </div>
                    <div className="relative mt-2">
                         <input 
                            type="text" 
                            value={profile.orcid}
                            disabled={profile.isOrcidLinked}
                            className="w-full bg-white border border-gray-300 text-gray-500 rounded-lg px-4 py-2.5 font-mono text-sm disabled:opacity-70 disabled:bg-gray-100 disabled:cursor-not-allowed"
                         />
                         {profile.isOrcidLinked && (
                             <p className="text-xs text-gray-500 mt-2 flex items-center">
                                <Shield className="w-3 h-3 mr-1 flex-shrink-0" />
                                Linked securely via ORCID OAuth. Cannot be edited manually.
                             </p>
                         )}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
                        Save Changes
                    </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* --- BILLING TAB --- */}
      {activeTab === 'billing' && (
        <section role="tabpanel" className="space-y-6 animate-fade-in-up">
            {/* Current Plan Card */}
            <article className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 relative">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-brand-100 to-transparent w-32 h-32 rounded-bl-full opacity-50 pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 relative z-10 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Current Subscription</h3>
                        <h2 className="text-3xl font-bold text-gray-900">Pro Plan</h2>
                        <p className="text-gray-500 mt-2">Perfect for independent researchers and small editorial teams.</p>
                    </div>
                    <div className="text-left md:text-right">
                         <span className="text-3xl font-bold text-gray-900">$49</span>
                         <span className="text-gray-500">/month</span>
                         <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                            </span>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Billing Period</p>
                        <p className="font-medium text-gray-900">Monthly</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Next Invoice</p>
                        <p className="font-medium text-gray-900">Nov 24, 2023</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                        <div className="flex items-center">
                            <CardIcon className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900">Visa ending in 4242</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button variant="outline">Download Invoices</Button>
                    <Button>Manage Subscription</Button>
                </div>
            </article>

            {/* Usage Stats */}
            <article className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Monthly Usage</h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                            <span>Validations Run</span>
                            <span>142 / 500</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-brand-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                            <span>Storage Used</span>
                            <span>1.2 GB / 10 GB</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-400 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
      )}

      {/* --- MISC TAB (Danger Zone) --- */}
      {activeTab === 'misc' && (
        <section role="tabpanel" className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden animate-fade-in-up">
            <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-4">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
                        <p className="text-sm text-red-700/70">Irreversible actions regarding your account and data.</p>
                    </div>
                </div>

                <div className="border-t border-red-50 divide-y divide-red-50">
                    <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h4 className="text-base font-medium text-gray-900">Delete Validation History</h4>
                            <p className="text-sm text-gray-500 mt-1">
                                Permanently remove all your past validation reports and uploaded files.
                            </p>
                        </div>
                        <Button 
                            variant="outline" 
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 whitespace-nowrap w-full md:w-auto"
                            onClick={handleClearHistoryClick}
                        >
                            Clear History
                        </Button>
                    </div>

                    <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h4 className="text-base font-medium text-gray-900">Delete Account</h4>
                            <p className="text-sm text-gray-500 mt-1 max-w-lg">
                                Permanently delete your account and all associated data. This action cannot be undone and your subscription will be cancelled immediately.
                            </p>
                        </div>
                        <Button 
                            className="bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 whitespace-nowrap w-full md:w-auto"
                            onClick={handleDeleteAccountClick}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bg-red-50 px-6 py-4 border-t border-red-100">
                <p className="text-xs text-red-600/80 text-center">
                    Need help? Contact <a href="#" className="underline font-medium">support@scholarly-pub.com</a> before taking drastic actions.
                </p>
            </div>
        </section>
      )}

      {/* Confirmation Modal: Clear History */}
      <Modal
        isOpen={showClearHistoryModal}
        onClose={() => setShowClearHistoryModal(false)}
        className="max-w-md"
      >
        <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Validation History?</h3>
            <p className="text-gray-500 leading-relaxed mb-8">
                Are you sure you want to delete all validation reports? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowClearHistoryModal(false)}>
                    Cancel
                </Button>
                <Button 
                    className="bg-red-600 hover:bg-red-700 text-white border-transparent"
                    isLoading={isLoading}
                    onClick={confirmClearHistory}
                >
                    Yes, Clear History
                </Button>
            </div>
        </div>
      </Modal>

      {/* Confirmation Modal: Delete Account */}
      <Modal
        isOpen={showDeleteAccountModal}
        onClose={() => setShowDeleteAccountModal(false)}
        title="Delete Account"
        className="max-w-lg"
      >
        <div>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                    <p className="font-bold">Warning: This action is permanent.</p>
                    <p className="mt-1 opacity-90">All your data, including validation history, API keys, and subscription details will be permanently wiped.</p>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    To confirm, please type <span className="font-bold select-all">{profile.email}</span>
                </label>
                <Input 
                    label=""
                    id="confirmEmail"
                    value={deleteConfirmationEmail}
                    onChange={(e) => {
                        setDeleteConfirmationEmail(e.target.value);
                        if(deleteError) setDeleteError('');
                    }}
                    error={deleteError}
                    placeholder={profile.email}
                    className="mb-0"
                    autoFocus
                />
            </div>

            <div className="mt-8 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteAccountModal(false)}>
                    Cancel
                </Button>
                <Button 
                    className="bg-red-600 hover:bg-red-700 text-white border-transparent"
                    isLoading={isLoading}
                    onClick={confirmDeleteAccount}
                    disabled={!deleteConfirmationEmail}
                >
                    Delete Account
                </Button>
            </div>
        </div>
      </Modal>

    </section>
  );
};