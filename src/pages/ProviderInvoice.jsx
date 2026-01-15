
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { getProviderInvoices } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function ProviderInvoice() {
  const { toast } = useToast();
  const invoices = getProviderInvoices();

  const handleAction = (title, description) => {
    toast({ title, description, duration: 2500 });
  };

  return (
     <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Provider Invoices</h1>
      <PremiumCard className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Terms</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
                <td className="p-4 font-mono">{invoice.id}</td>
                <td className="p-4 font-medium">{invoice.partner}</td>
                <td className="p-4">${invoice.amount.toLocaleString()}</td>
                <td className="p-4">{invoice.dueDate}</td>
                <td className="p-4">{invoice.terms}</td>
                <td className="p-4">
                  <Badge className={
                    invoice.status === 'Approved' ? 'bg-green-500 text-white' :
                    invoice.status === 'Pending' ? 'bg-yellow-500 text-black' :
                    invoice.status === 'Overdue' ? 'bg-red-500 text-white' :
                    'bg-orange-500 text-white'
                  }>{invoice.status}</Badge>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleAction('Invoice Opened', `${invoice.id} opened for review.`)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleAction('Download Ready', `${invoice.id} downloaded.`)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PremiumCard>
    </div>
  );
}
export default ProviderInvoice;
