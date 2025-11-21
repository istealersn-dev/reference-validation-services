import React, { useState } from 'react';
import { Search, Book, MessageCircle, FileText, ChevronRight, Send, Zap, CreditCard, Layout, CheckCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const HelpSupport: React.FC = () => {
  const [contactForm, setContactForm] = useState({ subject: '', message: '', category: 'technical' });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) return;

    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSending(false);
    setSent(true);
    setContactForm({ subject: '', message: '', category: 'technical' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  const docCategories = [
    { icon: Zap, title: 'Getting Started', desc: 'Account setup, first validation run, and basic navigation.' },
    { icon: Layout, title: 'Platform Guide', desc: 'Detailed overview of dashboard features and history management.' },
    { icon: MessageCircle, title: 'API Integration', desc: 'Authentication, endpoints, and rate limits for developers.' },
    { icon: CreditCard, title: 'Billing & Subscription', desc: 'Invoices, payment methods, and plan upgrades.' },
  ];

  const popularArticles = [
    "How to upload a BibTeX file correctly",
    "Understanding validation error codes",
    "Generating an API key for CI/CD",
    "Changing your team's display preferences"
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      
      {/* Header Area with Search */}
      <div className="bg-brand-900 rounded-2xl p-8 md:p-12 mb-8 text-center relative overflow-hidden shadow-lg">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-brand-500 blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">How can we help you today?</h2>
            <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search for articles, guides, or troubleshooting..." 
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none bg-white text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-brand-500/30 shadow-xl"
                />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT COLUMN: Documentation */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* Categories Grid */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Book className="w-5 h-5 mr-2 text-brand-600" />
                    Documentation Topics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {docCategories.map((cat, idx) => (
                        <div key={idx} className="group bg-white border border-gray-200 p-5 rounded-xl hover:border-brand-300 hover:shadow-md transition-all cursor-pointer">
                            <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-brand-100 transition-colors">
                                <cat.icon className="w-5 h-5 text-brand-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">{cat.title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900">Popular Articles</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {popularArticles.map((article, idx) => (
                        <button key={idx} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left group">
                            <div className="flex items-center">
                                <FileText className="w-4 h-4 text-gray-400 mr-3 group-hover:text-brand-500 transition-colors" />
                                <span className="text-gray-700 group-hover:text-gray-900 font-medium">{article}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-400" />
                        </button>
                    ))}
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                    <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">View Knowledge Base</button>
                </div>
            </div>

         </div>

         {/* RIGHT COLUMN: Contact Support */}
         <div className="lg:col-span-1">
             <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Contact Support</h3>
                    <p className="text-sm text-gray-500">Can't find what you need? Send us a message.</p>
                </div>

                {sent ? (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center animate-fade-in">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Message Sent!</h4>
                        <p className="text-sm text-gray-600">We've received your ticket and will get back to you shortly via email.</p>
                        <button 
                            onClick={() => setSent(false)}
                            className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700 underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Topic</label>
                            <select 
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                                value={contactForm.category}
                                onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                            >
                                <option value="technical">Technical Issue</option>
                                <option value="billing">Billing Question</option>
                                <option value="feature">Feature Request</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <Input 
                            label="Subject"
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                            placeholder="Brief summary of issue"
                        />

                        <div className="group">
                             <div className="relative w-full rounded-lg border border-gray-200 bg-gray-50/50 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:bg-white transition-all duration-300">
                                <textarea
                                    rows={5}
                                    className="w-full bg-transparent border-none outline-none p-4 text-gray-900 text-sm resize-none placeholder-gray-400"
                                    placeholder="Describe your issue in detail..."
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            fullWidth 
                            isLoading={isSending}
                            disabled={!contactForm.subject || !contactForm.message}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Submit Ticket
                        </Button>
                        
                        <p className="text-xs text-center text-gray-400 mt-2">
                            Typical response time: &lt; 24 hours
                        </p>
                    </form>
                )}
             </div>
         </div>

      </div>
    </div>
  );
};