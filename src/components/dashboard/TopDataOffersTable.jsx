
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

const TopDataOffersTable = () => {
  const data = [
     { name: 'B2L - South University PPL-WT (77)', rev: 15555.00, cost: 10801.75, profit: 4753.25, margin: 30.56 },
     { name: 'B2L - South University Online CALL PPL (251)', rev: 7344.00, cost: 3569.66, profit: 3774.34, margin: 51.39 },
     { name: 'B2L - Provide Media (Web) (201)', rev: 4735.30, cost: 15.94, profit: 4719.36, margin: 99.66 },
     { name: 'LYD - South University Web (157)', rev: 2910.00, cost: 1282.00, profit: 1628.00, margin: 55.95 },
     { name: 'B2L - Concorde Career Colleges (278)', rev: 2461.80, cost: 1394.00, profit: 1067.80, margin: 43.37 }
  ];

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <PremiumCard className="p-0 overflow-hidden h-full">
       <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--card-bg)]">
          <h3 className="font-bold text-[var(--text-primary)]">Top Data Offers</h3>
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
                   <th className="p-3 pl-4">Offer <ArrowUpDown className="inline w-3 h-3 ml-1"/></th>
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

export default TopDataOffersTable;
