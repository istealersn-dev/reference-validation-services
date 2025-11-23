import React, { useState } from 'react';
import { Search, Book, MessageCircle, FileText, ChevronRight, ChevronDown, Zap, CreditCard, Layout, ChevronLeft, Home, ArrowRight, X } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

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
            <h3 className="text-xl font-bold text-gray-900">Welcome to Kriyadocs RVS</h3>
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
        id: 'upload-bibtex',
        title: 'How to upload a BibTeX file correctly',
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed">
             <p>Ensure your <code>.bib</code> file is text-based and encoded in UTF-8. You can drag and drop the file directly into the validation zone on the Dashboard.</p>
             <p>We support standard BibTeX fields including:</p>
             <ul className="list-disc pl-5 space-y-1">
                 <li>author</li>
                 <li>year</li>
                 <li>title</li>
                 <li>DOI</li>
                 <li>journal</li>
             </ul>
          </div>
        )
      },
      {
        id: 'team-preferences',
        title: "Changing your team's display preferences",
        content: (
            <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Admins can manage team settings under <strong>Settings &gt; Organization</strong>.</p>
                <p>Individual users can update their display name, avatar, and notification preferences under <strong>Settings &gt; Profile</strong>.</p>
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
      },
      {
        id: 'error-codes',
        title: "Understanding validation error codes",
        content: (
            <div className="space-y-4 text-gray-600 leading-relaxed">
                <h4 className="font-bold text-gray-900">Common Errors</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Metadata Mismatch:</strong> The provided metadata (e.g., Year, Author) does not match external databases like CrossRef.</li>
                    <li><strong>Not Found:</strong> The DOI or reference string could not be found in any connected database.</li>
                    <li><strong>Formatting Error:</strong> The citation style does not adhere to the project's requirements.</li>
                </ul>
            </div>
        )
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
        id: 'cicd-keys',
        title: "Generating an API key for CI/CD",
        content: (
            <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>To integrate validation into your build pipeline:</p>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>Go to the <strong>API Keys</strong> section in the sidebar.</li>
                    <li>Click <strong>Create New Key</strong>.</li>
                    <li>Give it a descriptive name (e.g., "Jenkins Pipeline").</li>
                    <li>Copy the generated secret immediately. For security, the key is only shown once.</li>
                </ol>
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

// Refactored to reference the actual data structure
const popularArticlesRefs = [
  { categoryId: 'getting-started', articleId: 'upload-bibtex' },
  { categoryId: 'platform-guide', articleId: 'error-codes' },
  { categoryId: 'api-integration', articleId: 'cicd-keys' },
  { categoryId: 'getting-started', articleId: 'team-preferences' }
];

// --- Component ---

export const HelpSupport: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<'home' | 'category'>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-600 pointer-events-none">
                    <Search className="w-5 h-5 transition-colors" />
                </div>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for articles, guides, or troubleshooting..." 
                    className="w-full pl-12 pr-10 py-3.5 rounded-xl border-none bg-white text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-brand-500/30 shadow-xl transition-all outline-none"
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

                    {/* Popular Articles - Now Navigational */}
                    <section aria-labelledby="popular-articles-title" className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 id="popular-articles-title" className="font-semibold text-gray-900 flex items-center">
                                <Zap className="w-4 h-4 mr-2 text-orange-500" />
                                Popular Articles
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {popularArticlesRefs.map((ref, idx) => {
                                const cat = categoriesData.find(c => c.id === ref.categoryId);
                                const art = cat?.articles.find(a => a.id === ref.articleId);
                                
                                if (!cat || !art) return null;

                                return (
                                    <button 
                                        key={idx} 
                                        onClick={() => handleSearchResultClick(ref.categoryId, ref.articleId)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex items-center">
                                            <FileText className="w-4 h-4 mr-3 text-gray-400 group-hover:text-brand-500 transition-colors flex-shrink-0" />
                                            <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                                {art.title}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}
         </div>

         {/* Contact Form Sidebar */}
         <aside className="lg:col-span-1 order-last lg:order-none" aria-labelledby="contact-support-title">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
              <div className="mb-6">
                  <h3 id="contact-support-title" className="text-lg font-bold text-gray-900 mb-1">Contact Support</h3>
                  <p className="text-sm text-gray-500">Can't find what you need? Send us a message.</p>
              </div>
              <ContactForm />
            </div>
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
             Home
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

  return (
    <section aria-labelledby="help-title" className="max-w-6xl mx-auto">
      {view === 'home' ? renderHome() : renderCategoryView()}
    </section>
  );
};