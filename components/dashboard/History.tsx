import React from 'react';
import { FileText, Download, Search, Filter, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const History: React.FC = () => {
  // Mock Data
  const historyData = [
    { id: 1, date: 'Oct 24, 2023', time: '14:30 PM', filename: 'manuscript_v2.docx', total: 142, valid: 128, invalid: 14 },
    { id: 2, date: 'Oct 23, 2023', time: '09:15 AM', filename: 'references_final.bib', total: 56, valid: 56, invalid: 0 },
    { id: 3, date: 'Oct 22, 2023', time: '16:45 PM', filename: 'chapter_4_citations.csv', total: 89, valid: 82, invalid: 7 },
    { id: 4, date: 'Oct 20, 2023', time: '11:20 AM', filename: 'bio_research_paper.docx', total: 210, valid: 195, invalid: 15 },
    { id: 5, date: 'Oct 18, 2023', time: '10:00 AM', filename: 'grant_proposal_refs.bib', total: 34, valid: 30, invalid: 4 },
    { id: 6, date: 'Oct 15, 2023', time: '13:10 PM', filename: 'medical_journal_review.docx', total: 78, valid: 60, invalid: 18 },
  ];

  return (
    <section aria-labelledby="history-title" className="max-w-6xl mx-auto animate-fade-in">
      {/* Header / Filter Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
            <h2 id="history-title" className="text-2xl font-bold text-gray-900">Validation History</h2>
            <p className="text-gray-500 mt-1">View and download past reference validation reports.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
             <div className="flex items-center w-full sm:w-64 rounded-lg border border-gray-200 bg-white overflow-hidden focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                <div className="pl-3 text-gray-400">
                   <Search className="w-4 h-4" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search files..." 
                    className="w-full pl-2 pr-4 py-2.5 text-sm border-none focus:ring-0 outline-none placeholder-gray-400 text-gray-900"
                />
             </div>
             <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-600 border-gray-200 w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" /> Filter
             </Button>
        </div>
      </header>

      {/* Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-200">
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Document</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Total Refs</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Validated</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Not Validated</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Downloads</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {historyData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="py-4 px-6 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <div className="flex items-center text-sm font-medium text-gray-900 mb-0.5">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                        {item.date}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400">
                                        <Clock className="w-3 h-3 mr-1.5" />
                                        {item.time}
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex items-center">
                                    <div className="p-2 rounded-lg bg-brand-50 text-brand-600 mr-3 group-hover:bg-brand-100 transition-colors flex-shrink-0">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors truncate max-w-[200px]">{item.filename}</span>
                                </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    {item.total}
                                </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                                <span className="text-sm font-semibold text-green-600">{item.valid}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                                {item.invalid > 0 ? (
                                    <span className="text-sm font-semibold text-orange-600">{item.invalid}</span>
                                ) : (
                                    <span className="text-sm text-gray-300">-</span>
                                )}
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex justify-start gap-2 opacity-100 md:opacity-70 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        className="flex items-center px-2 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/30 whitespace-nowrap"
                                        title="Download Validated CSV"
                                    >
                                        <Download className="w-3 h-3 mr-1.5" />
                                        Valid
                                    </button>
                                    
                                    {item.invalid > 0 && (
                                        <button 
                                            className="flex items-center px-2 py-1.5 text-xs font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 rounded border border-orange-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/30 whitespace-nowrap"
                                            title="Download Not Validated CSV"
                                        >
                                            <Download className="w-3 h-3 mr-1.5" />
                                            Invalid
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
            <span className="text-sm text-gray-500 text-center sm:text-left">Showing <span className="font-medium text-gray-900">1-6</span> of <span className="font-medium text-gray-900">24</span> results</span>
            <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
                <Button variant="outline" className="h-8 px-3 text-xs bg-white hover:bg-gray-50" disabled>Previous</Button>
                <Button variant="outline" className="h-8 px-3 text-xs bg-white hover:bg-gray-50">Next</Button>
            </div>
        </div>
      </div>
    </section>
  );
};