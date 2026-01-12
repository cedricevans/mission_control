
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { DollarSign, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

const KPICard = ({ title, value, type = 'currency', trend }) => {
  return (
    <PremiumCard className="p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 shadow-xl border-t-4 border-t-[var(--accent-gold)]">
       <h3 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
          {type === 'currency' ? value : `${value}%`}
       </h3>
       <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">{title}</p>
       {trend && (
           <span className={cn(
               "text-xs font-bold mt-2 px-2 py-0.5 rounded",
               trend > 0 ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
           )}>
               {trend > 0 ? '+' : ''}{trend}%
           </span>
       )}
    </PremiumCard>
  );
};

const KPICards = () => {
  // Mock Data
  const metrics = {
      revenue: '$40,940.74',
      cost: '$21,224.65',
      profit: '$19,716.09',
      margin: '48.16'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
       <KPICard title="Revenue" value={metrics.revenue} />
       <KPICard title="Cost" value={metrics.cost} />
       <KPICard title="Profit" value={metrics.profit} />
       <KPICard title="Margin" value={metrics.margin} type="percent" />
    </div>
  );
};

export default KPICards;
