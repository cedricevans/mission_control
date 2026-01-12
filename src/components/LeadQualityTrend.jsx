
import React, { useMemo } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { LineChartAdvanced } from '@/components/charts/AdvancedCharts';
import { getLeadQualityTrendData } from '@/lib/storage';
import { Activity } from 'lucide-react';

const LeadQualityTrend = () => {
  const rawData = useMemo(() => getLeadQualityTrendData(), []);
  
  const chartData = rawData.map(d => ({
    label: d.month,
    value: d.quality
  }));

  return (
    <PremiumCard className="h-full">
       <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-[var(--accent-green-dim)] rounded-lg border border-[var(--accent-green)]/20">
            <Activity className="w-5 h-5 text-[var(--accent-green)]" />
         </div>
         <div>
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Quality Trend</h3>
            <p className="text-xs text-[var(--text-secondary)]">30-Day Average Score</p>
         </div>
      </div>
      <div className="h-48 md:h-64">
         <LineChartAdvanced data={chartData} height="100%" color="#00FF41" />
      </div>
    </PremiumCard>
  );
};

export default LeadQualityTrend;
