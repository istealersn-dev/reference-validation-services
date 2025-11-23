import React, { useState } from 'react';
import { Search, Book, MessageCircle, FileText, ChevronRight, ChevronDown, Send, Zap, CreditCard, Layout, CheckCircle, ChevronLeft, Home, ArrowRight, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

// --- Types & Data ---

type Article = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type Category = {
  id: string;
  title: string;
  description: string;
  icon: any;
  articles: Article[];
};

const categoriesData: Category[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Account setup, first validation run, and basic navigation.',
    icon: Zap,
    articles: [
      {
        id: 'account-setup',
        title: 'Setting up your account',
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <h3 className="text-xl font-bold text-gray-900">Welcome to Publisher Portal</h3>
            <p>
              We are thrilled to have you on board. This guide will walk you through the initial steps to configure your profile and organization settings.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mt-4">1. Profile Configuration</h4>
            <p>
              Navigate to the <strong>Settings</strong> tab to update your display name and avatar. If you have an ORCID iD, we highly recommend linking it for seamless authentication.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mt-4">2. Organization Details</h4>
            <p>
              Ensure your company details are accurate in the Billing section. This information will appear on all your generated invoices and validation reports.
            </p>
          </div>
        )
      },
      {
        id: 'first-validation',
        title: 'Running your first validation',
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <h3 className="text-xl font-bold text-gray-900">Validate your first manuscript</h3>
            <p>
              Our core feature is the Reference Validator. Here is how to use it:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Go to the <strong>Dashboard</strong> home view.</li>
              <li>Drag and drop your <code>.docx</code> or <code>.bib</code> file into the upload zone.</li>
              <li>Click "Start Validation" and wait for the process to complete.</li>
              <li>Download the resulting CSV report to see which references need attention.</li>
            </ul>
          </div>
        )
      },
      {
        id: 'navigation',
        title: 'Navigating the dashboard',
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              The sidebar is your main command center. You can access your validation history, manage API keys, and configure settings from there.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <strong>Pro Tip:</strong> You can collapse the sidebar on smaller screens to give yourself more workspace.
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: 'platform-guide',
    title: 'Platform Guide',
    description: 'Detailed overview of dashboard features and history management.',
    icon: Layout,
    articles: [
      {
        id: 'dashboard-overview',
        title: 'Dashboard Overview',
        content: <p>Comprehensive guide to all widgets available on the main dashboard.</p>
      },
      {
        id: 'history-reports',
        title: 'History & Reports',
        content: <p>How to search, filter, and export your past validation jobs.</p>
      }
    ]
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Authentication, endpoints, and rate limits for developers.',
    icon: MessageCircle,
    articles: [
      {
        id: 'authentication',
        title: 'Authentication',
        content: (
          <div className="space-y-4">
             <p>All API requests must be authenticated using a Bearer token in the header.</p>
             <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
               Authorization: Bearer pk_live_12345...
             </pre>
          </div>
        )
      },
      {
        id: 'endpoints',
        title: 'Core Endpoints',
        content: <p>List of available endpoints for validation and user management.</p>
      },
      {
        id: 'rate-limits',
        title: 'Rate Limits',
        content: <p>Understanding the throughput limits of your current plan.</p>
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Subscription',
    description: 'Invoices, payment methods, and plan upgrades.',
    icon: CreditCard,
    articles: [
      {
        id: 'manage-plan',
        title: 'Managing your plan',
        content: <p>How to upgrade to Pro or Enterprise tiers.</p>
      },
      {
        id: 'invoices',
        title: 'Invoices',
        content: <p>Where to find and download your monthly invoices.</p>
      }
    ]
  },
];

const popularArticles = [
  {
    title: "How to upload a BibTeX file correctly",
    content: "Ensure your .bib file is text-based and encoded in UTF-8. You can drag and drop the file directly into the validation zone on the Dashboard. We support standard BibTeX fields including author, year, title, and DOI."
  },
  {
    title: "Understanding validation error codes",
    content: "Common errors include 'Metadata Mismatch' (provided metadata doesn't match external databases), 'Not Found' (DOI or reference string not found in CrossRef/PubMed), and 'Formatting Error' (citation style validation failed)."
  },
  {
    title: "Generating an API key for CI/CD",
    content: "Go to the API Keys section in the sidebar. Click 'Create New Key', give it a descriptive name (e.g., 'Jenkins Pipeline'), and copy the generated secret immediately. For security, the key is only shown once."
  },
  {
    title: "Changing your team's display preferences",
    content: "Admins can manage team settings under Settings > Organization. Individual users can update their display name, avatar, and notification preferences under Settings > Profile."
  }
];

// --- Component ---

export const HelpSupport: React.FC = () => {
  // Contact Form State
  const [contactForm, setContactForm] = useState({ subject: '', message: '', category: 'technical' });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Navigation State
  const [view, setView] = useState<'home' | 'category'>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  // Search & Accordion State
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPopular, setExpandedPopular] = useState<string | null>(null);

  // Derived Data
  const currentCategoryData = categoriesData.find(c => c.id === activeCategory);
  const currentArticleData = currentCategoryData?.articles.find(a => a.id === activeArticle);

  // Handlers
  const handleCategoryClick = (catId: string) => {
    const cat = categoriesData.find(c => c.id === catId);
    if (cat && cat.articles.length > 0) {
      setActiveCategory(catId);
      setActiveArticle(cat.articles[0].id);
      setView('category');
      setSearchQuery(''); // Clear search on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleArticleClick = (articleId: string) => {
    setActiveArticle(articleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextArticle = () => {
    if (!currentCategoryData || !activeArticle) return;
    const currentIndex = currentCategoryData.articles.findIndex(a => a.id === activeArticle);
    if (currentIndex >= 0 && currentIndex < currentCategoryData.articles.length - 1) {
      setActiveArticle(currentCategoryData.articles[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getNextArticleTitle = () => {
    if (!currentCategoryData || !activeArticle) return null;
    const currentIndex = currentCategoryData.articles.findIndex(a => a.id === activeArticle);
    if (currentIndex >= 0 && currentIndex < currentCategoryData.articles.length - 1) {
      return currentCategoryData.articles[currentIndex + 1].title;
    }
    return null;
  };

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (view === 'category') {
      setView('home'); // Switch back to home to show results overlay context if needed, or handle in place
    }
  };

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: { categoryId: string; categoryTitle: string; article: Article }[] = [];

    categoriesData.forEach(cat => {
      cat.articles.forEach(art => {
        if (art.title.toLowerCase().includes(query) || cat.title.toLowerCase().includes(query)) {
          results.push({
            categoryId: cat.id,
            categoryTitle: cat.title,
            article: art
          });
        }
      });
    });
    return results;
  };

  const handleSearchResultClick = (categoryId: string, articleId: string) => {
    setActiveCategory(categoryId);
    setActiveArticle(articleId);
    setView('category');
    setSearchQuery('');
  };

  // --- Views ---

  const renderSearchResults = () => {
    const results = getSearchResults();
    
    if (results.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse the categories.</p>
            </div>
        );
    }

    return (
        <section aria-label="Search Results" className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Search Results ({results.length})</h3>
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                   <X className="w-4 h-4" />
                </button>
            </div>
            <div className="divide-y divide-gray-100">
                {results.map((result, idx) => (
                    <button 
                        key={`${result.categoryId}-${result.article.id}-${idx}`}
                        onClick={() => handleSearchResultClick(result.categoryId, result.article.id)}
                        className="w-full px-6 py-4 text-left hover:bg-brand-50/30 transition-colors group flex flex-col"
                    >
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-1">{result.categoryTitle}</span>
                        <span className="text-base font-medium text-gray-900 group-hover:text-brand-700">{result.article.title}</span>
                    </button>
                ))}
            </div>
        </section>
    );
  };

  const renderHome = () => (
    <div className="animate-fade-in">
      {/* Hero Search */}
      <section role="search" aria-label="Help Center Search" className="bg-brand-900 rounded-2xl p-8 md:p-12 mb-8 text-center relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-brand-500 blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
            <h2 id="help-title" className="text-2xl md:text-3xl font-bold text-white mb-4">How can we help you today?</h2>
            <div className="relative group">
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-brand-600" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for articles, guides, or troubleshooting..." 
                    className="w-full pl-12 pr-10 py-3.5 rounded-xl border-none bg-white text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-brand-500/30 shadow-xl transition-all"
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Content Column */}
         <div className="lg:col-span-2 space-y-8">
            {searchQuery ? (
                renderSearchResults()
            ) : (
                <>
                    {/* Documentation Categories */}
                    <nav aria-label="Documentation Topics">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Book className="w-5 h-5 mr-2 text-brand-600" />
                            Documentation Topics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categoriesData.map((cat) => (
                                <button 
                                key={cat.id} 
                                onClick={() => handleCategoryClick(cat.id)}
                                className="group bg-white border border-gray-200 p-5 rounded-xl hover:border-brand-300 hover:shadow-md transition-all cursor-pointer flex flex-col h-full text-left"
                                >
                                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-brand-100 transition-colors">
                                        <cat.icon className="w-5 h-5 text-brand-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{cat.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Popular Articles Accordion */}
                    <section aria-labelledby="popular-articles-title" className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 id="popular-articles-title" className="font-semibold text-gray-900 flex items-center">
                                <Zap className="w-4 h-4 mr-2 text-orange-500" />
                                Popular Articles
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {popularArticles.map((article, idx) => {
                                const isOpen = expandedPopular === article.title;
                                return (
                                    <article key={idx} className="group bg-white transition-colors">
                                        <button 
                                            onClick={() => setExpandedPopular(isOpen ? null : article.title)}
                                            aria-expanded={isOpen}
                                            className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${isOpen ? 'bg-brand-50/30' : 'hover:bg-gray-50'}`}
                                        >
                                            <div className="flex items-center">
                                                <FileText className={`w-4 h-4 mr-3 transition-colors flex-shrink-0 ${isOpen ? 'text-brand-600' : 'text-gray-400 group-hover:text-brand-500'}`} />
                                                <span className={`font-medium transition-colors ${isOpen ? 'text-brand-700' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                                    {article.title}
                                                </span>
                                            </div>
                                            {isOpen ? (
                                                <ChevronDown className="w-4 h-4 text-brand-500 flex-shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-400 flex-shrink-0" />
                                            )}
                                        </button>
                                        <div 
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="px-6 pb-5 pl-13 ml-10 text-sm text-gray-600 leading-relaxed border-l-2 border-brand-100">
                                                {article.content}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}
         </div>

         {/* Contact Form Sidebar */}
         <aside className="lg:col-span-1 order-last lg:order-none" aria-labelledby="contact-support-title">
            {renderContactForm()}
         </aside>
      </div>
    </div>
  );

  const renderCategoryView = () => {
    if (!currentCategoryData) return null;

    const nextArticleTitle = getNextArticleTitle();

    return (
      <div className="animate-fade-in">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-6 flex-wrap gap-1">
          <button onClick={() => setView('home')} className="hover:text-brand-600 transition-colors flex items-center">
             <Home className="w-4 h-4 mr-1" />
             Help Center
          </button>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
          <span className="font-medium text-gray-900 whitespace-nowrap">{currentCategoryData.title}</span>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
          <span className="text-brand-600 truncate max-w-[150px] md:max-w-[200px]">{currentArticleData?.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
           {/* Article Navigation Sidebar (Desktop) */}
           <nav className="hidden lg:block lg:col-span-1 sticky top-6" aria-label="Article Navigation">
              <h3 className="font-bold text-gray-900 mb-3 px-2">{currentCategoryData.title}</h3>
              <div className="space-y-1">
                 {currentCategoryData.articles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => handleArticleClick(article.id)}
                      aria-current={activeArticle === article.id ? 'page' : undefined}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeArticle === article.id 
                        ? 'bg-brand-50 text-brand-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {article.title}
                    </button>
                 ))}
              </div>
              
              <button 
                onClick={() => setView('home')}
                className="mt-8 flex items-center text-sm text-gray-500 hover:text-brand-600 px-2 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Categories
              </button>
           </nav>

            {/* Mobile Article Navigation (Dropdown style) */}
            <div className="lg:hidden w-full mb-4">
                <label htmlFor="article-select" className="block text-sm font-medium text-gray-700 mb-1">Select Article</label>
                <div className="relative">
                    <select
                        id="article-select"
                        value={activeArticle || ''}
                        onChange={(e) => handleArticleClick(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-3 pr-8"
                    >
                        {currentCategoryData.articles.map((article) => (
                            <option key={article.id} value={article.id}>
                                {article.title}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

           {/* Main Content Area */}
           <div className="lg:col-span-3 w-full">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-sm min-h-[500px]">
                 {currentArticleData ? (
                   <article className="prose prose-slate max-w-none">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                        {currentArticleData.title}
                      </h1>
                      {currentArticleData.content}
                   </article>
                 ) : (
                   <div className="flex items-center justify-center h-64 text-gray-400">Article not found</div>
                 )}

                 {/* Footer Navigation */}
                 <nav aria-label="Article Footer Navigation" className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400 text-center sm:text-left">
                      Was this article helpful? 
                      <button className="ml-2 text-brand-600 hover:underline">Yes</button> • 
                      <button className="ml-2 text-brand-600 hover:underline">No</button>
                    </div>

                    {nextArticleTitle && (
                      <button 
                        onClick={handleNextArticle}
                        className="group flex items-center text-right text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors"
                      >
                        <div className="text-right">
                          <div className="text-xs text-gray-400 font-normal uppercase tracking-wider mb-0.5">Next Article</div>
                          <div className="truncate max-w-[200px]">{nextArticleTitle}</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center ml-3 transition-colors flex-shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    )}
                 </nav>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderContactForm = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
      <div className="mb-6">
          <h3 id="contact-support-title" className="text-lg font-bold text-gray-900 mb-1">Contact Support</h3>
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
  );

  return (
    <section aria-labelledby="help-title" className="max-w-6xl mx-auto">
      {view === 'home' ? renderHome() : renderCategoryView()}
    </section>
  );
};