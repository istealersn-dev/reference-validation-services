import React, { useState } from 'react';
import { Key, Plus, Copy, Trash2, AlertCircle, Eye, EyeOff, Check, Shield, Calendar, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export const ApiKeys: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Production Server', prefix: 'pk_live_...', created: 'Oct 15, 2023', lastUsed: '2 mins ago', status: 'active' },
    { id: '2', name: 'Development Test', prefix: 'pk_test_...', created: 'Nov 02, 2023', lastUsed: '5 days ago', status: 'active' },
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_KEYS = 5;

  const handleCreateStart = () => {
    setIsCreating(true);
    setNewKeyName('');
    setGeneratedKey(null);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newId = Math.random().toString(36).substr(2, 9);
    const secretKey = `sk_${Math.random().toString(36).substr(2, 24)}${Math.random().toString(36).substr(2, 24)}`;
    
    const newKeyObject: ApiKey = {
        id: newId,
        name: newKeyName,
        prefix: secretKey.substring(0, 12) + '...',
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastUsed: 'Never',
        status: 'active'
    };

    setKeys([newKeyObject, ...keys]);
    setGeneratedKey(secretKey);
    setIsLoading(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone and any applications using this key will stop working.')) {
        setKeys(keys.filter(k => k.id !== id));
    }
  };

  const handleCloseModal = () => {
    setIsCreating(false);
    setGeneratedKey(null);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
            <p className="text-gray-500 mt-1">Manage authentication tokens for accessing the platform programmatically.</p>
        </div>
        <Button 
            onClick={handleCreateStart} 
            disabled={keys.length >= MAX_KEYS}
            className={keys.length >= MAX_KEYS ? "opacity-50 cursor-not-allowed" : ""}
        >
            <Plus className="w-4 h-4 mr-2" />
            Create New Key
        </Button>
      </div>

      {/* Usage Warning / Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-3">
         <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
         <div className="text-sm text-blue-800">
            <p className="font-medium">Security Best Practices</p>
            <p className="opacity-90 mt-1">
                Do not share your API keys with others or expose them in client-side code. 
                Rotate your keys periodically to maintain security.
            </p>
         </div>
      </div>

      {/* Keys List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Active Keys</h3>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${keys.length >= MAX_KEYS ? 'bg-orange-100 text-orange-700' : 'bg-gray-200 text-gray-600'}`}>
                {keys.length} / {MAX_KEYS} Used
            </span>
        </div>
        
        {keys.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
                <Key className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No active API keys found.</p>
            </div>
        ) : (
            <div className="divide-y divide-gray-100">
                {keys.map((key) => (
                    <div key={key.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-gray-900">{key.name}</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-100 text-green-700 tracking-wide">Active</span>
                            </div>
                            <div className="flex items-center gap-2 font-mono text-sm text-gray-500 bg-gray-100 w-fit px-2 py-1 rounded border border-gray-200">
                                <Key className="w-3 h-3" />
                                {key.prefix}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex flex-col items-end">
                                <span className="flex items-center gap-1.5" title="Created Date">
                                    <Calendar className="w-3.5 h-3.5" /> {key.created}
                                </span>
                                <span className="flex items-center gap-1.5 mt-1" title="Last Used">
                                    <Clock className="w-3.5 h-3.5" /> Used {key.lastUsed}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                                <button 
                                    onClick={() => handleDelete(key.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    title="Revoke Key"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Create Key Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden scale-100 animate-fade-in-up">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">
                        {generatedKey ? 'API Key Created' : 'Create New API Key'}
                    </h3>
                    {!generatedKey && (
                        <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                            <span className="sr-only">Close</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </div>

                <div className="p-6">
                    {generatedKey ? (
                        <div className="space-y-4">
                            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex gap-3">
                                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-green-800">
                                    Success! Your API key has been generated. Copy it now as you won't be able to see it again.
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Secret Key</label>
                                <div className="flex">
                                    <input 
                                        readOnly 
                                        value={generatedKey} 
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-l-lg px-4 py-3 text-sm font-mono text-gray-800 focus:outline-none"
                                    />
                                    <button 
                                        onClick={() => handleCopy(generatedKey, 'modal')}
                                        className="bg-white border border-l-0 border-gray-200 rounded-r-lg px-4 text-gray-600 hover:bg-gray-50 hover:text-brand-600 transition-colors flex items-center"
                                    >
                                        {copiedId === 'modal' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button onClick={handleCloseModal} fullWidth>Done</Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <p className="text-sm text-gray-500 mb-4">
                                Give your key a name to identify where it's being used (e.g., "CI/CD Pipeline", "Mobile App").
                            </p>
                            <Input 
                                label="Key Name" 
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                placeholder="e.g. Production Server"
                                autoFocus
                            />
                            <div className="pt-2 flex gap-3 justify-end">
                                <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                                <Button type="submit" isLoading={isLoading} disabled={!newKeyName.trim()}>Generate Key</Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};