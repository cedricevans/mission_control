
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getPaymentHistory } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

function PaymentHistoryPage() {
  const history = getPaymentHistory();

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Billing', path: '/billing/payment-history' }, { label: 'Payment History', path: '/billing/payment-history' }]} />
       <h1 className="text-3xl font-display font-bold">Payment History</h1>
       
       <PremiumCard className="p-0 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
                <tr>
                   <th className="p-4">Transaction ID</th>
                   <th className="p-4">Date</th>
                   <th className="p-4">Amount</th>
                   <th className="p-4">Method</th>
                   <th className="p-4">Status</th>
                </tr>
             </thead>
             <tbody>
                {history.map(tx => (
                   <tr key={tx.id} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                      <td className="p-4 font-mono text-sm">{tx.id}</td>
                      <td className="p-4">{tx.date}</td>
                      <td className="p-4">${tx.amount.toLocaleString()}</td>
                      <td className="p-4">{tx.method}</td>
                      <td className="p-4">
                         <Badge className={
                            tx.status === 'Completed' ? 'bg-green-500' : 
                            tx.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                         }>{tx.status}</Badge>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </PremiumCard>
    </div>
  );
}

export default PaymentHistoryPage;
