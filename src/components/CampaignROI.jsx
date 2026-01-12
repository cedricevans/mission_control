
import React, { useMemo } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { getCampaignROIData } from '@/lib/storage';
import { Target, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const CampaignROI = () => {
  const data = useMemo(() => getCampaignROIData(), []);
  const maxRev = Math.max(...data.map(d => d.revenue));

  return (
    <PremiumCard className="h-full">
       <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-[var(--accent-green-dim)] rounded-lg border border-[var(--accent-green)]/20">
            <Target className="w-5 h-5 text-[var(--accent-green)]" />
         </div>
         <div>
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Campaign ROI</h3>
            <p className="text-xs text-[var(--text-secondary)]">Revenue vs Cost Analysis</p>
         </div>
      </div>

      <div className="space-y-4">
         {data.slice(0, 5).map((item, i) => {
            const calculatedRoi = item.spent > 0 ? ((item.revenue - item.spent) / item.spent * 100).toFixed(0) : 0;
            const revPercent = maxRev > 0 ? (item.revenue / maxRev) * 100 : 0;

            return (
               <div key={i} className="group relative">
                  <div className="flex justify-between text-xs mb-1">
                     <span className="font-bold text-[var(--text-primary)]">{item.name}</span>
                     <span className="text-[var(--accent-green)] font-mono flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {calculatedRoi}% ROI
                     </span>
                  </div>
                  
                  {/* Revenue Bar */}
                  <div className="relative h-6 bg-[var(--secondary-bg)] rounded overflow-hidden flex items-center px-2">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${revPercent}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="absolute top-0 left-0 h-full bg-[var(--accent-gold)] opacity-20"
                     />
                     <div className="absolute top-0 left-0 h-full w-1 bg-[var(--accent-gold)]" />
                     
                     <div className="relative z-10 flex justify-between w-full text-[10px]">
                        <span className="flex items-center gap-1">
                           <DollarSign className="w-3 h-3 text-[var(--accent-gold)]" />
                           Rev: ${(item.revenue/1000).toFixed(1)}k
                        </span>
                        <span className="text-[var(--text-secondary)]">Cost: ${(item.spent/1000).toFixed(1)}k</span>
                     </div>
                  </div>
               </div>
            )
         })}
      </div>
    </PremiumCard>
  );
};

export default CampaignROI;
