
import React, { useMemo } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { BarChartAdvanced } from '@/components/charts/AdvancedCharts';
import { getSourcePerformanceData } from '@/lib/storage';
import { Share2 } from 'lucide-react';

const SourcePerformance = () => {
  const rawData = useMemo(() => getSourcePerformanceData(), []);
  
  // Format for Chart
  const chartData = rawData.map((d, i) => ({
    label: d.source,
    value: d.leads,
    tooltipValue: `${d.leads} leads (${d.rate}% conv)`,
    color: ['#D4AF37', '#00D9FF', '#00FF41', '#FF3333', '#A855F7', '#EC4899'][i % 6]
  }));

  return (
    <PremiumCard className="h-full">
      <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-[var(--accent-blue-dim)] rounded-lg border border-[var(--accent-blue)]/20">
            <Share2 className="w-5 h-5 text-[var(--accent-blue)]" />
         </div>
         <div>
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Channel Efficiency</h3>
            <p className="text-xs text-[var(--text-secondary)]">Volume by acquisition source</p>
         </div>
      </div>
      <BarChartAdvanced data={chartData} height={200} />
    </PremiumCard>
  );
};

export default SourcePerformance;
