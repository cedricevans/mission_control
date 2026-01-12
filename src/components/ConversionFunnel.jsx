import React, { useMemo } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { FunnelChart } from '@/components/charts/AdvancedCharts';
import { getFunnelData } from '@/lib/storage';
import { Filter } from 'lucide-react';

const ConversionFunnel = () => {
  const data = useMemo(() => getFunnelData(), []);

  return (
    <PremiumCard className="h-full flex flex-col" glow>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-[var(--accent-gold-dim)] rounded-lg border border-[var(--accent-gold)]/20">
             <Filter className="w-5 h-5 text-[var(--accent-gold)]" />
           </div>
           <div>
              <h3 className="font-bold text-[var(--text-primary)] text-lg">Pipeline Velocity</h3>
              <p className="text-xs text-[var(--text-secondary)]">Lead progression & drop-off analysis</p>
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-4">
         <FunnelChart data={data} />
      </div>
    </PremiumCard>
  );
};

export default ConversionFunnel;