
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';

function EmailTemplatesPage() {
  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Settings', path: '/settings' }, { label: 'Email Templates', path: '/settings/email-templates' }]} />
       <h1 className="text-3xl font-display font-bold">Email Templates</h1>
       
       <PremiumCard className="p-8 text-center text-[var(--text-secondary)]">
          Email template editor placeholder...
       </PremiumCard>
    </div>
  );
}

export default EmailTemplatesPage;
