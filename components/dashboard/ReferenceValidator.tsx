import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, XCircle, Download, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type ValidationStatus = 'idle' | 'uploading' | 'processing' | 'complete';

export const ReferenceValidator: React.FC = () => {
  const [status, setStatus] = useState<ValidationStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock Data
  const stats = {
    total: 142,
    valid: 128,
    invalid: 14
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const runValidation = async () => {
    if (!file) return;

    // Upload Phase
    setStatus('uploading');
    setProgress(0);
    
    // Simulate Upload
    for (let i = 0; i <= 100; i += 8) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 150));
    }

    // Processing Phase
    setStatus('processing');
    
    // Simulate Processing (Indeterminate wait)
    await new Promise(r => setTimeout(r, 2000));

    setStatus('complete');
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Hero Section */}
      <section aria-labelledby="validator-title" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 animate-fade-in">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
                <h2 id="validator-title" className="text-xl md:text-2xl font-bold text-gray-900">Validate References</h2>
                <p className="text-sm md:text-base text-gray-500 mt-1">Upload your manuscript or bibliography file to cross-check references against CrossRef and PubMed.</p>
            </div>
            <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
                    Supported: .docx, .csv, .bib
                </span>
            </div>
        </header>

        {/* Main Workspace */}
        <div className="relative">
            
            {/* IDLE STATE - Upload Zone */}
            {status === 'idle' && (
                <div 
                    role="button"
                    tabIndex={0}
                    aria-label="File upload dropzone"
                    className={`
                        border-2 border-dashed rounded-xl p-6 md:p-12 text-center transition-all duration-300 cursor-pointer
                        ${file 
                            ? 'border-brand-400 bg-brand-50/30' 
                            : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'
                        }
                    `}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={handleFileDrop}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                >
                    <input 
                        ref={fileInputRef}
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".csv,.docx,.bib"
                        onChange={handleFileInput}
                        onClick={(e) => e.stopPropagation()} 
                    />
                    
                    <div className="flex flex-col items-center">
                        <div className={`p-4 rounded-full mb-4 ${file ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-400'}`}>
                            {file ? <FileText className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
                        </div>
                        
                        {file ? (
                            <>
                                <h3 className="text-lg font-medium text-gray-900 break-all">{file.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                                <div className="mt-6 w-full max-w-xs flex flex-col gap-3 mx-auto">
                                    <Button 
                                        className="w-full" 
                                        onClick={(e) => { e.stopPropagation(); runValidation(); }}
                                    >
                                        Start Validation
                                    </Button>
                                    <button 
                                        className="text-sm text-red-500 hover:underline py-2"
                                        onClick={handleRemoveFile}
                                    >
                                        Remove file
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-medium text-gray-900">Click to upload or drag and drop</h3>
                                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                                    Upload a CSV, BibTeX, or Word document. We'll extract and validate the citation metadata.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* LOADING STATE */}
            {(status === 'uploading' || status === 'processing') && (
                <div className="border rounded-xl p-8 md:p-16 text-center bg-white min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center animate-fade-in" aria-live="polite">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-brand-100 rounded-full opacity-20 animate-ping"></div>
                        <div className="relative bg-white p-4 rounded-full shadow-md border border-gray-100">
                            <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {status === 'uploading' ? 'Uploading Document...' : 'Validating References...'}
                    </h3>
                    <p className="text-gray-500 max-w-xs mx-auto mb-6">
                        {status === 'uploading' 
                            ? 'Please wait while we securely upload your file.' 
                            : 'Cross-checking metadata with CrossRef and PubMed databases.'
                        }
                    </p>
                    
                    {status === 'uploading' ? (
                        <div className="w-full max-w-md px-4">
                            <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                                <span>Upload Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                                <div 
                                    className="bg-brand-600 h-2 rounded-full transition-all duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                         <div className="flex items-center justify-center space-x-2 text-brand-600 bg-brand-50 px-4 py-2 rounded-full">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span className="text-sm font-medium">Processing content...</span>
                        </div>
                    )}
                </div>
            )}

            {/* COMPLETE STATE - Results */}
            {status === 'complete' && (
                <div className="animate-fade-in-up">
                    {/* Stats Grid */}
                    <section aria-label="Statistics" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Total Card */}
                        <article className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FileText className="w-24 h-24 text-gray-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total References</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-2">{stats.total}</h3>
                        </article>

                        {/* Valid Card */}
                        <article className="bg-green-50/50 p-6 rounded-xl border border-green-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <CheckCircle className="w-24 h-24 text-green-600" />
                            </div>
                            <p className="text-sm font-bold text-green-700 uppercase tracking-wider flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1.5" /> Validated
                            </p>
                            <h3 className="text-4xl font-bold text-green-800 mt-2">{stats.valid}</h3>
                            <p className="text-sm text-green-600 mt-1">90.1% Match Rate</p>
                        </article>

                        {/* Invalid Card - Emphasis */}
                        <article className="bg-orange-50/50 p-6 rounded-xl border border-orange-100 shadow-sm relative overflow-hidden ring-1 ring-orange-200">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <AlertCircle className="w-24 h-24 text-orange-600" />
                            </div>
                            <p className="text-sm font-bold text-orange-700 uppercase tracking-wider flex items-center">
                                <XCircle className="w-4 h-4 mr-1.5" /> Not Validated
                            </p>
                            <h3 className="text-4xl font-extrabold text-orange-800 mt-2 tracking-tight">{stats.invalid}</h3>
                            <p className="text-sm text-orange-600 mt-1 font-medium">Attention Required</p>
                        </article>
                    </section>

                    {/* Actions Area */}
                    <section aria-label="Report Actions" className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">Download Reports</h4>
                                <p className="text-gray-500 text-sm mt-1">Export your validation results for further review.</p>
                            </div>
                             <Button onClick={reset} className="w-full md:w-auto">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Validate Another
                            </Button>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                            <Button variant="outline" className="bg-white justify-start">
                                <Download className="w-4 h-4 mr-2" />
                                Validated (.csv)
                            </Button>
                            <Button variant="outline" className="bg-white border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 justify-start">
                                <Download className="w-4 h-4 mr-2" />
                                Not Validated (.csv)
                            </Button>
                        </div>
                    </section>
                </div>
            )}

        </div>
      </section>
    </div>
  );
};