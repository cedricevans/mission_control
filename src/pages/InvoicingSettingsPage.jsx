
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getInvoicingSettings } from '@/lib/storage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function InvoicingSettingsPage() {
  const settings = getInvoicingSettings();

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Billing', path: '/billing' }, { label: 'Invoicing Settings', path: '/billing/invoicing-settings' }]} />
       <h1 className="text-3xl font-display font-bold">Invoicing Configuration</h1>
       
       <PremiumCard className="p-6 max-w-2xl">
          <div className="space-y-4">
             <div className="space-y-2">
                <Label>Company Name</Label>
                <Input defaultValue={settings.companyName} />
             </div>
             <div className="space-y-2">
                <Label>Billing Address</Label>
                <Input defaultValue={settings.address} />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label>Tax ID</Label>
                   <Input defaultValue={settings.taxId} />
                </div>
                <div className="space-y-2">
                   <Label>Billing Frequency</Label>
                   <Input defaultValue={settings.frequency} />
                </div>
             </div>
             <div className="pt-4">
                <Button>Save Settings</Button>
             </div>
          </div>
       </PremiumCard>
    </div>
  );
}

export default InvoicingSettingsPage;
