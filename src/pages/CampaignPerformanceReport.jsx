
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getCampaignROIData } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

function CampaignPerformanceReport() {
  const campaigns = getCampaignROIData();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Reports', path: '/reports' }, { label: 'Campaign Performance', path: '/reports/campaign-performance' }]} />
      
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Campaign Performance</h1>
            <p className="text-[var(--text-secondary)]">ROI and effectiveness analysis</p>
         </div>
         <Button variant="outline" className="gap-2"><Download className="w-4 h-4"/> Export</Button>
      </div>

      <PremiumCard className="p-0 overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
               <tr>
                  <th className="p-4">Campaign Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Spend</th>
                  <th className="p-4">Revenue</th>
                  <th className="p-4">ROI</th>
               </tr>
            </thead>
            <tbody>
               {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                     <td className="p-4 font-medium">{c.name}</td>
                     <td className="p-4"><Badge variant={c.status === 'Active' ? 'default' : 'secondary'}>{c.status}</Badge></td>
                     <td className="p-4">${c.spent.toLocaleString()}</td>
                     <td className="p-4">${c.revenue.toLocaleString()}</td>
                     <td className="p-4 text-[var(--accent-green)] font-bold">{c.roi}%</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </PremiumCard>
    </div>
  );
}

export default CampaignPerformanceReport;
