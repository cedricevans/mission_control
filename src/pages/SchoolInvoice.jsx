
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const invoices = [
   { id: 'INV-2024-001', school: 'Howard University', amount: 12500, date: '2024-01-15', status: 'Paid' },
   { id: 'INV-2024-002', school: 'Spelman College', amount: 8400, date: '2024-01-20', status: 'Pending' },
   { id: 'INV-2024-003', school: 'Morehouse College', amount: 9200, date: '2024-01-22', status: 'Overdue' },
];

function SchoolInvoice() {
  const { toast } = useToast();

  const handleAction = (title, description) => {
    toast({ title, description, duration: 2500 });
  };

  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-display font-bold">School Invoices</h1>
       <PremiumCard className="p-0 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
                <tr>
                   <th className="p-4">Invoice #</th>
                   <th className="p-4">School</th>
                   <th className="p-4">Amount</th>
                   <th className="p-4">Date</th>
                   <th className="p-4">Status</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody>
                {invoices.map(inv => (
                   <tr key={inv.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
                      <td className="p-4 font-mono">{inv.id}</td>
                      <td className="p-4 font-medium">{inv.school}</td>
                      <td className="p-4">${inv.amount.toLocaleString()}</td>
                      <td className="p-4">{inv.date}</td>
                      <td className="p-4">
                         <Badge className={
                            inv.status === 'Paid' ? 'bg-green-500 text-white' :
                            inv.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                         }>{inv.status}</Badge>
                      </td>
                      <td className="p-4 text-right">
                         <Button variant="ghost" size="icon" onClick={() => handleAction('Invoice Opened', `${inv.id} opened for review.`)}>
                           <Eye className="w-4 h-4" />
                         </Button>
                         <Button variant="ghost" size="icon" onClick={() => handleAction('Download Ready', `${inv.id} downloaded.`)}>
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

export default SchoolInvoice;
