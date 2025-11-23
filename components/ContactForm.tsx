import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface ContactFormProps {
  id?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ id }) => {
  const [contactForm, setContactForm] = useState({ subject: '', message: '', category: 'technical' });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) return;

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSending(false);
    setSent(true);
    setContactForm({ subject: '', message: '', category: 'technical' });
    setTimeout(() => setSent(false), 5000);
  };

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center animate-fade-in">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <h4 className="font-bold text-gray-900 mb-1">Message Sent!</h4>
        <p className="text-sm text-gray-600">We've received your ticket and will get back to you shortly via email.</p>
        <button 
            type="button"
            onClick={() => setSent(false)}
            className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700 underline"
        >
            Send another message
        </button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleContactSubmit} className="space-y-4">
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Message</label>
          <div className="relative w-full rounded-lg border border-gray-200 bg-gray-50/50 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:bg-white transition-all duration-200">
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
  );
};
