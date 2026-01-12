
import React, { useMemo } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { LeaderboardChart } from '@/components/charts/AdvancedCharts';
import { getAgentPerformanceData } from '@/lib/storage';
import { Trophy } from 'lucide-react';

const AgentPerformance = () => {
  const rawData = useMemo(() => getAgentPerformanceData(), []);
  
  const chartData = rawData.map(d => ({
    id: d.id,
    name: d.name,
    value: d.revenue,
    displayValue: `$${(d.revenue/1000).toFixed(1)}k`,
    subValue: `${d.leadsGenerated} leads • ${d.conversionRate}% conv`
  }));

  return (
    <PremiumCard className="h-full">
       <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-[var(--accent-gold-dim)] rounded-lg border border-[var(--accent-gold)]/20">
            <Trophy className="w-5 h-5 text-[var(--accent-gold)]" />
         </div>
         <div>
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Top Agents</h3>
            <p className="text-xs text-[var(--text-secondary)]">Revenue Leaderboard</p>
         </div>
      </div>
      <LeaderboardChart data={chartData} />
    </PremiumCard>
  );
};

export default AgentPerformance;
