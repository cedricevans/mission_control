
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

const TopExternalNameOffersTable = () => {
  const data = [
     { name: 'Concorde Career College', rev: 2461.80, cost: 1394.00, profit: 1067.80, margin: 43.37 },
     { name: 'Universal Technical Institute', rev: 1850.50, cost: 950.25, profit: 900.25, margin: 48.65 },
     { name: 'Arizona College of Nursing', rev: 1200.00, cost: 600.00, profit: 600.00, margin: 50.00 },
     { name: 'Fortis College', rev: 980.00, cost: 450.00, profit: 530.00, margin: 54.08 },
     { name: 'Lincoln Tech', rev: 750.00, cost: 300.00, profit: 450.00, margin: 60.00 }
  ];

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <PremiumCard className="p-0 overflow-hidden h-full">
       <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--card-bg)]">
          <h3 className="font-bold text-[var(--text-primary)]">Top External Name Offers</h3>
          <div className="flex items-center gap-2">
             <span className="text-xs text-[var(--text-secondary)]">Show</span>
             <Select defaultValue="5">
                <SelectTrigger className="h-8 w-16 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="5">5</SelectItem>
                   <SelectItem value="10">10</SelectItem>
                </SelectContent>
             </Select>
             <span className="text-xs text-[var(--text-secondary)]">entries</span>
          </div>
       </div>
       <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
             <thead className="bg-[var(--secondary-bg)] text-[var(--text-secondary)] font-semibold border-b border-[var(--border-color)]">
                <tr>
                   <th className="p-3 pl-4">External Name <ArrowUpDown className="inline w-3 h-3 ml-1"/></th>
                   <th className="p-3 text-right">Revenue <ArrowUpDown className="inline w-3 h-3 ml-1"/></th>
                   <th className="p-3 text-right">Cost <ArrowUpDown className="inline w-3 h-3 ml-1"/></th>
                   <th className="p-3 text-right">Profit <ArrowUpDown className="inline w-3 h-3 ml-1"/></th>
                   <th className="p-3 pr-4 text-right">Margin <ArrowUpDown className="inline w-3 h-3 ml-1"/></th>
                </tr>
             </thead>
             <tbody className="divide-y divide-[var(--border-color)]">
                {data.map((row, i) => (
                   <tr key={i} className="hover:bg-[var(--hover-bg)] transition-colors group cursor-pointer">
                      <td className="p-3 pl-4 font-medium text-[var(--text-primary)] max-w-[200px] truncate" title={row.name}>{row.name}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(row.rev)}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(row.cost)}</td>
                      <td className="p-3 text-right font-mono font-bold text-[var(--accent-gold)]">{formatCurrency(row.profit)}</td>
                      <td className="p-3 pr-4 text-right font-mono">{row.margin}%</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </PremiumCard>
  );
};

export default TopExternalNameOffersTable;
