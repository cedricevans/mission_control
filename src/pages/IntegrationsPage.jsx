
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getIntegrations } from '@/lib/storage';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

function IntegrationsPage() {
  const integrations = getIntegrations();

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Settings', path: '/settings' }, { label: 'Integrations', path: '/settings/integrations' }]} />
       <h1 className="text-3xl font-display font-bold">Integrations</h1>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map(int => (
             <PremiumCard key={int.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-xl font-bold">{int.name}</h3>
                   <Switch checked={int.status === 'Connected'} />
                </div>
                <div className="flex gap-2 mb-4">
                   <Badge variant="outline">{int.category}</Badge>
                   <Badge className={int.status === 'Connected' ? 'bg-green-500' : 'bg-gray-500'}>{int.status}</Badge>
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Last Sync: {int.lastSync}</div>
             </PremiumCard>
          ))}
       </div>
    </div>
  );
}

export default IntegrationsPage;
