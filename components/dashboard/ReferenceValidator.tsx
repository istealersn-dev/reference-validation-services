import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, CheckCircle, XCircle, Download, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

type ValidationStatus = 'idle' | 'uploading' | 'processing' | 'complete';

export const ReferenceValidator: React.FC = () => {
  const [status, setStatus] = useState<ValidationStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  // Mock Data
  const stats = {
    total: 142,
    valid: 128,
    invalid: 14
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const runValidation = async () => {
    if (!file) return;

    // Upload Phase
    setStatus('uploading');
    setProgress(0);
    
    // Simulate Upload
    for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 100));
    }

    // Processing Phase
    setStatus('processing');
    setProgress(0);
    
    // Simulate Processing - Granular updates
    for (let i = 0; i <= 100; i++) {
        setProgress(i);
        // Variable speed to make it look realistic: fast start, slow middle, fast finish
        let delay = 20;
        if (i > 20 && i < 60) delay = 50 + Math.random() * 40;
        else if (i > 80) delay = 15;
        
        await new Promise(r => setTimeout(r, delay));
    }

    await new Promise(r => setTimeout(r, 500)); // Small pause at 100%
    setStatus('complete');
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
  };

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Validate References</h2>
                <p className="text-gray-500 mt-1">Upload your manuscript or bibliography file to cross-check references against CrossRef and PubMed.</p>
            </div>
            <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
                    Supported: .docx, .csv, .bib
                </span>
            </div>
        </div>

        {/* Main Workspace */}
        <div className="relative">
            
            {/* IDLE STATE - Upload Zone */}
            {status === 'idle' && (
                <div 
                    className={`
                        border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
                        ${file 
                            ? 'border-brand-400 bg-brand-50/30' 
                            : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'
                        }
                    `}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".csv,.docx,.bib"
                        onChange={handleFileInput} 
                    />
                    
                    <div className="flex flex-col items-center">
                        <div className={`p-4 rounded-full mb-4 ${file ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-400'}`}>
                            {file ? <FileText className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
                        </div>
                        
                        {file ? (
                            <>
                                <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                                <Button 
                                    className="mt-6 min-w-[200px]" 
                                    onClick={(e) => { e.stopPropagation(); runValidation(); }}
                                >
                                    Start Validation
                                </Button>
                                <button 
                                    className="mt-4 text-sm text-red-500 hover:underline"
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                >
                                    Remove file
                                </button>
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
                <div className="border rounded-xl p-16 text-center bg-white min-h-[400px] flex flex-col items-center justify-center animate-fade-in">
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
                    
                    <div className="w-full max-w-md">
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div 
                                className="bg-brand-600 h-2 rounded-full transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        {status === 'processing' && (
                             <p className="text-xs text-brand-500 mt-3 animate-pulse">
                                Analyzing citation {Math.min(Math.floor((progress / 100) * stats.total), stats.total)} of {stats.total}...
                             </p>
                        )}
                    </div>
                </div>
            )}

            {/* COMPLETE STATE - Results */}
            {status === 'complete' && (
                <div className="animate-fade-in-up">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Total Card */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FileText className="w-24 h-24 text-gray-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total References</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-2">{stats.total}</h3>
                        </div>

                        {/* Valid Card */}
                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <CheckCircle className="w-24 h-24 text-green-600" />
                            </div>
                            <p className="text-sm font-bold text-green-700 uppercase tracking-wider flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1.5" /> Validated
                            </p>
                            <h3 className="text-4xl font-bold text-green-800 mt-2">{stats.valid}</h3>
                            <p className="text-sm text-green-600 mt-1">90.1% Match Rate</p>
                        </div>

                        {/* Invalid Card - Emphasis */}
                        <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100 shadow-sm relative overflow-hidden ring-1 ring-orange-200">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <AlertCircle className="w-24 h-24 text-orange-600" />
                            </div>
                            <p className="text-sm font-bold text-orange-700 uppercase tracking-wider flex items-center">
                                <XCircle className="w-4 h-4 mr-1.5" /> Not Validated
                            </p>
                            <h3 className="text-4xl font-extrabold text-orange-800 mt-2 tracking-tight">{stats.invalid}</h3>
                            <p className="text-sm text-orange-600 mt-1 font-medium">Attention Required</p>
                        </div>
                    </div>

                    {/* Actions Area */}
                    <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Download Reports</h4>
                            <p className="text-gray-500 text-sm mt-1">Export your validation results for further review.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" className="bg-white">
                                <Download className="w-4 h-4 mr-2" />
                                Validated (.csv)
                            </Button>
                            <Button variant="outline" className="bg-white border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300">
                                <Download className="w-4 h-4 mr-2" />
                                Not Validated (.csv)
                            </Button>
                            <Button onClick={reset} className="ml-2">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Validate Another
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};
