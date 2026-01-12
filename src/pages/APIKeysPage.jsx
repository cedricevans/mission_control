
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getApiKeys } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';

function APIKeysPage() {
  const keys = getApiKeys();

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Settings', path: '/settings' }, { label: 'API Keys', path: '/settings/api-keys' }]} />
       <div className="flex justify-between items-center">
          <h1 className="text-3xl font-display font-bold">API Keys</h1>
          <Button>Generate New Key</Button>
       </div>
       
       <PremiumCard className="p-6">
          <div className="space-y-4">
             {keys.map(key => (
                <div key={key.id} className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-xl bg-[var(--secondary-bg)]/20">
                   <div>
                      <div className="font-bold text-lg">{key.name}</div>
                      <div className="font-mono text-sm text-[var(--text-secondary)]">{key.prefix}****************</div>
                      <div className="text-xs text-[var(--text-secondary)] mt-1">Created: {key.created} • Last Used: {key.lastUsed}</div>
                   </div>
                   <div className="flex gap-2">
                      <Button size="icon" variant="ghost"><Copy className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
             ))}
          </div>
       </PremiumCard>
    </div>
  );
}

export default APIKeysPage;
