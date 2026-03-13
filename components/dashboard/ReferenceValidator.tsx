
import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Download, 
  AlertCircle, 
  RefreshCw,
  Search,
  ChevronRight,
  ShieldAlert,
  Database,
  ExternalLink,
  ChevronDown,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type ValidationStatus = 'idle' | 'uploading' | 'processing' | 'complete';
type FilterType = 'all' | 'valid' | 'invalid';

interface Reference {
  id: number;
  citation: string;
  status: 'valid' | 'invalid';
  error?: string;
  doi?: string;
  source: string[];
}

// Reusable grainy blob from landing page for consistency
const GrainyBlob: React.FC<{ colorClass: string; className?: string }> = ({ colorClass, className = "relative" }) => (
  <div className={`${className} pointer-events-none`}>
    <div className={`absolute inset-0 rounded-full ${colorClass} opacity-20`} style={{ filter: 'url(#grainy-noise)' }}></div>
    <div className={`absolute inset-0 rounded-full ${colorClass} mix-blend-multiply opacity-10`}></div>
  </div>
);

export const ReferenceValidator: React.FC = () => {
  const [status, setStatus] = useState<ValidationStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Mock Data for the references
  const mockReferences: Reference[] = [
    { id: 1, citation: "Smith, J., & Doe, R. (2022). Quantum Mechanics in Biology. Nature, 590(7844), 34-45.", status: 'valid', doi: "10.1038/s41586-021-03180-z", source: ['Crossref'] },
    { id: 2, citation: "Doe, A. (2019). The Future of Artificial Intelligence. Journal of Science, 12(3).", status: 'invalid', error: "Retracted Paper Detected (Oct 2023)", source: ['PubMed', 'Crossref'] },
    { id: 3, citation: "Brown, L. (2023). Ethics in Research. Bioethics Monthly, 45(2), 112-118.", status: 'invalid', error: "Year Mismatch (Crossref: 2021)", doi: "10.1111/bioe.12845", source: ['Crossref'] },
    { id: 4, citation: "Wilson, K. et al. (2021). Neural Networks in Healthcare. Lancet Digital Health, 3(5), e297-e307.", status: 'valid', doi: "10.1016/S2589-7500(21)00048-2", source: ['PubMed'] },
    { id: 5, citation: "Miller, P. (2018). Genomic Sequencing Advances. Science, 361(6409), 1335.", status: 'valid', doi: "10.1126/science.aar5468", source: ['Crossref', 'Web of Science'] },
    { id: 6, citation: "Garcia, M. (2020). Climate Change Impacts. Global Env. Change, 61, 102047.", status: 'invalid', error: "DOI Not Found", source: [] },
  ];

  const processingSteps = [
    "Initializing JATS XML parser...",
    "Extracting bibliography metadata...",
    "Mapping citation strings...",
    "Connecting to Crossref API...",
    "Cross-checking DOIs against central registry...",
    "Querying PubMed for PMIDs...",
    "Verifying author ORCID credentials...",
    "Detecting retracted papers (Shield Integrity)...",
    "Finalizing validation report..."
  ];

  useEffect(() => {
    if (status === 'processing') {
      let step = 0;
      const interval = setInterval(() => {
        if (step < processingSteps.length) {
          setLogMessages(prev => [...prev, processingSteps[step]]);
          step++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStatus('complete'), 800);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logMessages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const runValidation = async () => {
    if (!file) return;
    setStatus('uploading');
    for (let i = 0; i <= 100; i += 20) {
        await new Promise(r => setTimeout(r, 150));
    }
    setStatus('processing');
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setLogMessages([]);
  };

  const filteredReferences = mockReferences.filter(ref => {
    if (activeFilter === 'valid') return ref.status === 'valid';
    if (activeFilter === 'invalid') return ref.status === 'invalid';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Brand Decor */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

      <header className="mb-8 animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
                    <Database className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Reference Integrity Suite</h2>
            </div>
            <p className="text-gray-500 max-w-xl leading-relaxed">
                Professional-grade citation validation. Automated cross-referencing against Global Metadata Registries.
            </p>
        </div>
        {status === 'complete' && (
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={reset} className="h-10 text-xs px-4 border-gray-200">
                    <RefreshCw className="w-3.5 h-3.5 mr-2" />
                    New Job
                </Button>
            </div>
        )}
      </header>

      <div className="relative">
        {/* IDLE STATE */}
        {status === 'idle' && (
          <div 
            className={`relative bg-white border-2 border-dashed rounded-3xl p-12 md:p-24 text-center transition-all duration-500 shadow-sm overflow-hidden group ${file ? 'border-brand-500 ring-8 ring-brand-50' : 'border-gray-200 hover:border-brand-400'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <GrainyBlob colorClass="bg-brand-400" className="absolute -top-32 -right-32 w-80 h-80 opacity-10" />
            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            
            <div className="relative z-10 flex flex-col items-center">
                <div className={`w-24 h-24 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 ${file ? 'bg-brand-600 text-white scale-110 shadow-xl' : 'bg-gray-50 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                    {file ? <FileText className="w-12 h-12" /> : <UploadCloud className="w-12 h-12" />}
                </div>
                {file ? (
                    <div className="animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{file.name}</h3>
                        <p className="text-sm text-gray-400 mb-10">{(file.size / 1024).toFixed(1)} KB • Ready for validation</p>
                        <Button className="h-14 px-10 text-lg shadow-xl shadow-brand-600/30" onClick={(e) => { e.stopPropagation(); runValidation(); }}>
                            Validate References
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Manuscript</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                            Drag and drop your DOCX, JATS XML, or BibTeX file. We'll automatically extract and verify every citation.
                        </p>
                        <div className="flex gap-4">
                            <span className="px-3 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase rounded-full border border-gray-100">Crossref</span>
                            <span className="px-3 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase rounded-full border border-gray-100">PubMed</span>
                            <span className="px-3 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase rounded-full border border-gray-100">ORCID</span>
                        </div>
                    </>
                )}
            </div>
          </div>
        )}

        {/* PROCESSING STATE */}
        {(status === 'uploading' || status === 'processing') && (
            <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-brand-900/10 min-h-[500px] flex flex-col animate-fade-in">
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start flex-1">
                    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                        <div className="relative w-40 h-40 mb-10">
                            <div className="absolute inset-0 bg-brand-50 rounded-full animate-pulse"></div>
                            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-inner">
                                <RefreshCw className="w-16 h-16 text-brand-600 animate-spin" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {status === 'uploading' ? 'Syncing File...' : 'Validating Data'}
                        </h3>
                        <p className="text-gray-500 font-medium text-center md:text-left leading-relaxed">
                            Scanning 142 citation nodes against global metadata registries.
                        </p>
                    </div>
                    <div className="w-full md:w-2/3 bg-slate-900 rounded-2xl p-6 font-mono text-sm text-brand-200 overflow-hidden flex flex-col shadow-inner">
                        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse"></div>
                            <span className="font-bold text-xs uppercase tracking-widest text-brand-400">Reference_Scan_V2.log</span>
                        </div>
                        <div className="space-y-2.5 overflow-y-auto max-h-[350px] custom-scrollbar pr-4">
                            {logMessages.map((msg, i) => (
                                <div key={i} className="flex gap-4 animate-fade-in">
                                    <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                                    <span className="text-brand-400 font-bold tracking-tight">INF:</span>
                                    <span className="text-white/90">{msg}</span>
                                </div>
                            ))}
                            <div ref={logEndRef} />
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* COMPLETE STATE */}
        {status === 'complete' && (
            <div className="space-y-8 animate-fade-in-up">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                        <div className="relative w-20 h-20 flex-shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#5f259f" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="28.27" className="transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-brand-900">90%</div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Integrity Score</p>
                            <p className="text-xl font-bold text-gray-900 leading-none">High Confidence</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                            <CheckCircle className="w-9 h-9" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Valid References</p>
                            <p className="text-3xl font-bold text-gray-900 leading-none">128</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 ring-1 ring-orange-200 bg-orange-50/10">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                            <ShieldAlert className="w-9 h-9" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">Manual Fix Required</p>
                            <p className="text-3xl font-bold text-orange-900 leading-none">14</p>
                        </div>
                    </div>
                </div>

                {/* Main Results Table */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-brand-900/5 overflow-hidden">
                    {/* Table Header & Controls */}
                    <div className="px-8 py-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gray-50/50">
                        <div className="flex items-center gap-6">
                            <div className="flex bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
                                <button 
                                    onClick={() => setActiveFilter('all')}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeFilter === 'all' ? 'bg-brand-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    All (142)
                                </button>
                                <button 
                                    onClick={() => setActiveFilter('valid')}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeFilter === 'valid' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Valid
                                </button>
                                <button 
                                    onClick={() => setActiveFilter('invalid')}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeFilter === 'invalid' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Issues (14)
                                </button>
                            </div>
                        </div>

                        {/* Best Export Options UX: Multi-format Dropdown */}
                        <div className="relative" ref={downloadMenuRef}>
                            <div className="flex">
                                <Button className="rounded-r-none h-11 px-6 shadow-brand-600/20">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Report
                                </Button>
                                <button 
                                    onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                                    className="bg-brand-700 hover:bg-brand-800 text-white border-l border-brand-500 px-3 rounded-r-lg transition-colors flex items-center justify-center"
                                >
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDownloadMenu ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            {showDownloadMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2 animate-fade-in origin-top-right">
                                    <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center group transition-colors">
                                        <FileText className="w-4 h-4 mr-3 text-gray-400 group-hover:text-brand-600" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900">Download CSV</span>
                                            <span className="text-[10px] text-gray-400">Compact flat-file format</span>
                                        </div>
                                    </button>
                                    <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center group transition-colors border-t border-gray-100">
                                        <FileSpreadsheet className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-600" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900">Download XLSX</span>
                                            <span className="text-[10px] text-gray-400">Formatted Excel with highlighting</span>
                                        </div>
                                    </button>
                                    <div className="border-t border-gray-100 my-2"></div>
                                    <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center group transition-colors">
                                        <ShieldAlert className="w-4 h-4 mr-3 text-red-500" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-red-600">Issues Only (CSV)</span>
                                            <span className="text-[10px] text-gray-400">Just the problematic rows</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed List */}
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto custom-scrollbar">
                        {filteredReferences.length === 0 ? (
                            <div className="p-20 text-center flex flex-col items-center">
                                <Search className="w-12 h-12 text-gray-200 mb-4" />
                                <p className="text-gray-500 font-medium">No citations match your filter criteria.</p>
                            </div>
                        ) : (
                            filteredReferences.map((ref) => (
                                <div key={ref.id} className="p-6 lg:px-8 hover:bg-gray-50/80 transition-all group flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-4 mb-3">
                                            {ref.status === 'valid' ? (
                                                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
                                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-1">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className={`text-sm md:text-base leading-relaxed mb-3 ${ref.status === 'invalid' ? 'text-red-900 font-medium' : 'text-gray-700 font-normal'}`}>
                                                    {ref.citation}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    {ref.doi && (
                                                        <span className="inline-flex items-center text-[10px] font-mono font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">
                                                            DOI: {ref.doi}
                                                        </span>
                                                    )}
                                                    {ref.source.map(s => (
                                                        <span key={s} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                                            <Database size={10} />
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="md:w-64 flex flex-col justify-center items-start md:items-end md:text-right border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                        {ref.status === 'valid' ? (
                                            <span className="text-xs font-bold text-green-600 flex items-center mb-1">
                                                <CheckCircle className="w-4 h-4 mr-1.5" />
                                                Fully Verified
                                            </span>
                                        ) : (
                                            <div className="space-y-2">
                                                <span className="text-xs font-bold text-red-600 flex items-center">
                                                    <AlertCircle className="w-4 h-4 mr-1.5" />
                                                    {ref.error}
                                                </span>
                                                <button className="text-[11px] font-bold text-brand-600 hover:text-brand-800 underline underline-offset-4 flex items-center md:ml-auto">
                                                    Edit in Manuscript
                                                    <ExternalLink className="ml-1.5 w-3 h-3" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Bottom Stats Summary */}
                    <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                            Showing <span className="font-bold text-gray-900">{filteredReferences.length}</span> of 142 detected references.
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-9 px-4 text-xs bg-white" disabled>Previous</Button>
                            <Button variant="outline" className="h-9 px-4 text-xs bg-white">Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
