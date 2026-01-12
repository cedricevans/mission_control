
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getTaxReports } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

function TaxReportsPage() {
  const reports = getTaxReports();

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Billing', path: '/billing' }, { label: 'Tax Reports', path: '/billing/tax-reports' }]} />
       <h1 className="text-3xl font-display font-bold">Tax Reports</h1>
       
       <PremiumCard className="p-0 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
                <tr>
                   <th className="p-4">Period</th>
                   <th className="p-4">Total Tax</th>
                   <th className="p-4">Filed Date</th>
                   <th className="p-4">Status</th>
                   <th className="p-4">Action</th>
                </tr>
             </thead>
             <tbody>
                {reports.map(r => (
                   <tr key={r.id} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                      <td className="p-4">{r.period}</td>
                      <td className="p-4">${r.totalTax.toLocaleString()}</td>
                      <td className="p-4">{r.dateFiled}</td>
                      <td className="p-4 text-green-500 font-medium">{r.status}</td>
                      <td className="p-4">
                         <Button size="sm" variant="ghost"><Download className="w-4 h-4 mr-2"/> Download</Button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </PremiumCard>
    </div>
  );
}

export default TaxReportsPage;
