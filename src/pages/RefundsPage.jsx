
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getRefunds } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

function RefundsPage() {
  const refunds = getRefunds();

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Billing', path: '/billing' }, { label: 'Refunds', path: '/billing/refunds' }]} />
       <h1 className="text-3xl font-display font-bold">Refund Requests</h1>
       
       <PremiumCard className="p-0 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
                <tr>
                   <th className="p-4">Refund ID</th>
                   <th className="p-4">Txn ID</th>
                   <th className="p-4">Amount</th>
                   <th className="p-4">Reason</th>
                   <th className="p-4">Status</th>
                </tr>
             </thead>
             <tbody>
                {refunds.map(r => (
                   <tr key={r.id} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                      <td className="p-4 font-mono text-sm">{r.id}</td>
                      <td className="p-4 font-mono text-sm text-[var(--text-secondary)]">{r.txnId}</td>
                      <td className="p-4">${r.amount}</td>
                      <td className="p-4">{r.reason}</td>
                      <td className="p-4"><Badge variant={r.status === 'Approved' ? 'default' : 'secondary'}>{r.status}</Badge></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </PremiumCard>
    </div>
  );
}

export default RefundsPage;
