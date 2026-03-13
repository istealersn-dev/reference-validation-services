import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  FileSearch, 
  Database, 
  Globe, 
  Menu, 
  X,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

// Reusable component for the "Grainy" effect requested
const GrainFilter = () => (
  <svg className="hidden">
    <filter id="grainy-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
         <feFuncA type="linear" slope="0.3" /> 
      </feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
      <feBlend mode="multiply" in="monoNoise" in2="SourceGraphic" />
    </filter>
  </svg>
);

// Updated to remove hardcoded 'relative' to allow absolute positioning for layering
const GrainyBlob: React.FC<{ colorClass: string; className?: string }> = ({ colorClass, className = "relative" }) => (
  <div className={`${className}`}>
    <div className={`absolute inset-0 rounded-full ${colorClass} opacity-80`} style={{ filter: 'url(#grainy-noise)' }}></div>
    {/* Clean gradient overlay to soften the grain */}
    <div className={`absolute inset-0 rounded-full ${colorClass} mix-blend-multiply opacity-40`}></div>
  </div>
);

// Dummy Logo Components
const LogoUniversity = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 160 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L10 35H30L20 20Z" fillOpacity="0.8"/>
    <path d="M10 5H30V20H10V5Z" fillOpacity="0.6"/>
    <text x="40" y="26" fontFamily="sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">UniPress</text>
  </svg>
);

const LogoScience = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 180 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="8" fillOpacity="0.6"/>
    <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 20 20)"/>
    <text x="45" y="26" fontFamily="sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">SciDirect</text>
  </svg>
);

const LogoJournal = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 190 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="8" width="24" height="24" rx="4" fillOpacity="0.6"/>
    <path d="M17 5V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <text x="40" y="26" fontFamily="sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">OpenJournal</text>
  </svg>
);

const LogoAcademic = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 180 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 5L35 35H5L20 5Z" fill="none" stroke="currentColor" strokeWidth="3"/>
    <text x="45" y="26" fontFamily="sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">Academic</text>
  </svg>
);

const LogoResearch = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 180 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="20" r="4" fill="currentColor"/>
    <circle cx="30" cy="10" r="4" fill="currentColor"/>
    <circle cx="30" cy="30" r="4" fill="currentColor"/>
    <path d="M10 20L30 10M10 20L30 30" stroke="currentColor" strokeWidth="2"/>
    <text x="45" y="26" fontFamily="sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">ResHub</text>
  </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900 overflow-x-hidden">
      {/* Inject SVG Filter globally */}
      <GrainFilter />

      {/* --- Navigation (Floating, Centered, Rounded) --- */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] lg:w-[75%] max-w-7xl z-50 transition-all duration-300">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-xl shadow-brand-900/5 rounded-2xl px-4 md:px-6 relative">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="h-9 w-9 md:h-10 md:w-10 bg-brand-600 rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">Kriyadocs RVS</span>
            </div>

            {/* Centered Desktop Nav Links */}
            <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">Features</a>
              <a href="#benefits" className="text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">Benefits</a>
              <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">Pricing</a>
            </nav>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={onLogin}
                  className="text-sm font-semibold text-gray-700 hover:text-brand-700 transition-colors"
                >
                  Log in
                </button>
                <Button onClick={onRegister} className="shadow-brand-600/20 h-10 px-5 rounded-lg">
                  Sign Up Free
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-gray-500 hover:text-brand-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Floating Dropdown) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 shadow-2xl flex flex-col gap-4 animate-fade-in-up origin-top">
            <a href="#features" className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-base font-medium text-gray-700">Features</a>
            <a href="#benefits" className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-base font-medium text-gray-700">Benefits</a>
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <Button variant="outline" fullWidth onClick={onLogin}>Log in</Button>
              <Button fullWidth onClick={onRegister}>Sign Up Free</Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Decor - Pushed further back */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/50 via-white to-white -z-20"></div>
          
          {/* Dot Grid Pattern - Increased opacity from 0.05 to 0.25 for better visibility */}
          <div className="absolute inset-0 -z-10 opacity-25" 
               style={{ 
                 backgroundImage: 'radial-gradient(#5f259f 1.5px, transparent 1.5px)', 
                 backgroundSize: '40px 40px',
                 backgroundPosition: '0 0'
               }}>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Hero Copy */}
              <div className="text-center lg:text-left animate-fade-in-up">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-brand-600 mr-2 animate-pulse"></span>
                  Now compatible with JATS XML
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
                  Reference validation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-500">scholarly publishing.</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Automate the integrity of your manuscripts. Instant cross-checking against Crossref, PubMed, and ORCID to ensure every citation is accurate before publication.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button onClick={onRegister} className="h-14 px-8 text-lg shadow-xl shadow-brand-600/20 hover:shadow-brand-600/30 w-full sm:w-auto">
                    Start Validating for Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <button onClick={() => {}} className="flex items-center font-semibold text-gray-700 hover:text-brand-700 px-6 py-4 transition-colors">
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Watch Demo
                  </button>
                </div>
                <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-400 font-medium">
                  <span>Trusted by 500+ Journals</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>99.9% Uptime</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>GDPR Compliant</span>
                </div>
              </div>

              {/* Tilted Product Snapshot */}
              <div className="relative lg:h-[600px] flex items-center justify-center perspective-[2000px] group">
                {/* Background Blobs for depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-200/30 to-purple-200/30 rounded-full blur-[80px] -z-10 animate-blob"></div>
                
                {/* The 3D Container Wrapper with Floating Animation */}
                <div className="animate-float w-full max-w-[600px]">
                    <div 
                    className="relative w-full transition-transform duration-700 ease-out transform lg:-rotate-y-12 lg:rotate-x-6 lg:-rotate-z-2 group-hover:rotate-y-0 group-hover:rotate-x-0 group-hover:rotate-z-0"
                    style={{ transformStyle: 'preserve-3d' }}
                    >
                    {/* Glass Reflection Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-20 pointer-events-none rounded-xl"></div>

                    {/* Mock Browser Interface */}
                    <div className="bg-white rounded-xl shadow-2xl shadow-brand-900/20 border border-gray-200 overflow-hidden ring-1 ring-gray-900/5">
                        {/* Browser Header */}
                        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center space-x-2">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="ml-4 flex-1 bg-white border border-gray-200 rounded-md h-6 w-full max-w-sm mx-auto shadow-sm"></div>
                        </div>
                        
                        {/* Screenshot Simulation (Using actual code structure for fidelity) */}
                        <div className="p-6 bg-gray-50/50 min-h-[400px]">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Validation Results</h3>
                                        <p className="text-xs text-gray-500">manuscript_final_v2.docx</p>
                                    </div>
                                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">98% Match</div>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-start p-3 bg-gray-50 rounded-md border border-gray-100">
                                            <div className="mt-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white flex-shrink-0">✓</div>
                                            <div className="ml-3 space-y-2 w-full">
                                                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-start p-3 bg-orange-50 rounded-md border border-orange-100 ring-1 ring-orange-200">
                                        <div className="mt-1 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px] text-white flex-shrink-0">!</div>
                                        <div className="ml-3 space-y-2 w-full">
                                            <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                                            <div className="flex gap-2">
                                                <span className="text-[10px] text-orange-600 font-medium">DOI Missing</span>
                                                <span className="text-[10px] text-blue-600 font-medium underline">Auto-correct</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Social Proof --- */}
        <section className="py-16 bg-brand-900 border-y border-brand-800 relative overflow-hidden">
          {/* Subtle glow effect behind logos */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-brand-800/50 blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
             <p className="text-sm font-bold text-brand-200/90 mb-12 uppercase tracking-[0.2em]">Powering editorial teams at</p>
             <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 gap-y-10">
                <LogoUniversity className="h-9 md:h-11 text-white opacity-70 hover:opacity-100 transition-all duration-300" />
                <LogoScience className="h-9 md:h-11 text-white opacity-70 hover:opacity-100 transition-all duration-300" />
                <LogoJournal className="h-9 md:h-11 text-white opacity-70 hover:opacity-100 transition-all duration-300" />
                <LogoAcademic className="h-9 md:h-11 text-white opacity-70 hover:opacity-100 transition-all duration-300" />
                <LogoResearch className="h-9 md:h-11 text-white opacity-70 hover:opacity-100 transition-all duration-300" />
             </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-base font-bold text-brand-600 uppercase tracking-wide mb-2">Capabilities</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to validate citations.</h3>
              <p className="text-lg text-gray-500">
                Stop checking references manually. Our intelligent engine parses, verifies, and formats your bibliography in seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-brand-200 transition-colors group">
                <div className="w-14 h-14 mb-6 relative flex items-center justify-center">
                   <GrainyBlob colorClass="bg-blue-400" className="absolute inset-0 w-full h-full" />
                   <Database className="w-7 h-7 text-blue-700 relative z-10" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Multi-Database Check</h4>
                <p className="text-gray-600 leading-relaxed">
                  We cross-reference every citation against Crossref, PubMed, and Web of Science simultaneously to guarantee existence and accuracy.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-brand-200 transition-colors group">
                <div className="w-14 h-14 mb-6 relative flex items-center justify-center">
                   <GrainyBlob colorClass="bg-purple-400" className="absolute inset-0 w-full h-full" />
                   <ShieldCheck className="w-7 h-7 text-purple-700 relative z-10" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Integrity Shield</h4>
                <p className="text-gray-600 leading-relaxed">
                  Detect retracted papers and preprints automatically. Prevent the propagation of invalid research with our advanced flagging system.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-brand-200 transition-colors group">
                <div className="w-14 h-14 mb-6 relative flex items-center justify-center">
                   <GrainyBlob colorClass="bg-green-400" className="absolute inset-0 w-full h-full" />
                   <Zap className="w-7 h-7 text-green-700 relative z-10" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Instant Formatting</h4>
                <p className="text-gray-600 leading-relaxed">
                  Convert bibliographies between APA, MLA, Chicago, and 5,000+ other styles with a single click. Compliance made effortless.
                </p>
              </div>

               {/* Feature 4 */}
               <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-brand-200 transition-colors group">
                <div className="w-14 h-14 mb-6 relative flex items-center justify-center">
                   <GrainyBlob colorClass="bg-orange-400" className="absolute inset-0 w-full h-full" />
                   <FileSearch className="w-7 h-7 text-orange-700 relative z-10" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">PDF & JATS Parsing</h4>
                <p className="text-gray-600 leading-relaxed">
                  Upload raw manuscripts in Word, PDF, or JATS XML. Our engine extracts metadata intelligently without manual entry.
                </p>
              </div>

               {/* Feature 5 */}
               <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-brand-200 transition-colors group">
                <div className="w-14 h-14 mb-6 relative flex items-center justify-center">
                   <GrainyBlob colorClass="bg-teal-400" className="absolute inset-0 w-full h-full" />
                   <Globe className="w-7 h-7 text-teal-700 relative z-10" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">ORCID Integration</h4>
                <p className="text-gray-600 leading-relaxed">
                   Verify author identities directly through our ORCID partnership. Ensure credit goes to the right researchers.
                </p>
              </div>

               {/* Feature 6 */}
               <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-brand-200 transition-colors group flex flex-col justify-center items-center text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">And much more...</h4>
                  <Button variant="outline" onClick={onRegister}>Explore all features</Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-24 bg-brand-900 relative overflow-hidden">
          {/* Background Grain/Noise */}
          <div className="absolute inset-0 opacity-10" style={{ filter: 'url(#grainy-noise)' }}></div>

          {/* Dot Grid Pattern - Dark Theme (White dots) */}
          <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', 
               backgroundSize: '40px 40px',
               backgroundPosition: '0 0'
             }}>
          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600 rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-40"></div>

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to streamline your editorial workflow?</h2>
            <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
              Join 10,000+ editors and researchers using Kriyadocs RVS to publish with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Button onClick={onRegister} className="h-14 px-10 text-lg bg-white text-brand-900 hover:bg-brand-50 border-none shadow-xl">
                 Get Started for Free
               </Button>
               <span className="text-brand-200 text-sm mt-2 sm:mt-0">No credit card required</span>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
                   <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Kriyadocs RVS</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                The standard for reference validation in scholarly publishing.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-600">Features</a></li>
                <li><a href="#" className="hover:text-brand-600">Integrations</a></li>
                <li><a href="#" className="hover:text-brand-600">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-600">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-600">Documentation</a></li>
                <li><a href="#" className="hover:text-brand-600">API Reference</a></li>
                <li><a href="#" className="hover:text-brand-600">Community</a></li>
                <li><a href="#" className="hover:text-brand-600">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-600">About</a></li>
                <li><a href="#" className="hover:text-brand-600">Careers</a></li>
                <li><a href="#" className="hover:text-brand-600">Legal</a></li>
                <li><a href="#" className="hover:text-brand-600">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Kriyadocs. All rights reserved.</p>
             <div className="flex space-x-6 text-gray-400">
                {/* Social icons placeholders */}
                <div className="w-5 h-5 bg-gray-200 rounded-full hover:bg-brand-500 transition-colors"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full hover:bg-brand-500 transition-colors"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full hover:bg-brand-500 transition-colors"></div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
