
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import GaugeChart from '@/components/GaugeChart';
import LineChart from '@/components/LineChart';
import WorldMap from '@/components/WorldMap';
import HeatMap from '@/components/HeatMap';
import { ArrowUpRight, ArrowDownRight, Activity, Users } from 'lucide-react';

function Analytics() {
  // Mock Data
  const trendData1 = [40, 55, 45, 70, 65, 85, 90, 85, 95];
  const trendData2 = [30, 25, 45, 30, 55, 40, 65, 50, 60];
  const trendData3 = [70, 65, 60, 55, 45, 40, 35, 30, 25];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
           <h2 className="text-2xl font-poppins font-bold text-[var(--text-primary)]">Mission Intelligence</h2>
           <p className="text-[var(--text-secondary)] text-sm mt-1">Real-time surveillance and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[var(--accent-gold)] text-[var(--text-inverse)] rounded-lg font-bold text-sm hover:opacity-90 transition-colors shadow-lg shadow-[var(--accent-gold-dim)]">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PremiumCard glow delay={0.1}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-wider mb-1">Total Conversions</p>
              <h3 className="text-3xl font-extrabold text-[var(--text-primary)]">2,845</h3>
            </div>
            <div className="p-2 bg-[var(--accent-green-dim)] rounded-lg border border-[var(--accent-green)]/30">
              <ArrowUpRight className="w-5 h-5 text-[var(--accent-green)]" />
            </div>
          </div>
          <div className="h-16">
            <LineChart data={trendData1} color="#00FF41" height={64} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[var(--accent-green)] text-xs font-bold">+12.5%</span>
            <span className="text-[var(--text-secondary)] text-xs">vs last mission</span>
          </div>
        </PremiumCard>

        <PremiumCard delay={0.2}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-wider mb-1">Active Leads</p>
              <h3 className="text-3xl font-extrabold text-[var(--text-primary)]">1,204</h3>
            </div>
            <div className="p-2 bg-[var(--accent-gold-dim)] rounded-lg border border-[var(--accent-gold)]/30">
              <Users className="w-5 h-5 text-[var(--accent-gold)]" />
            </div>
          </div>
          <div className="h-16">
            <LineChart data={trendData2} color="#D4AF37" height={64} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[var(--accent-gold)] text-xs font-bold">+5.2%</span>
            <span className="text-[var(--text-secondary)] text-xs">engagement rate</span>
          </div>
        </PremiumCard>

        <PremiumCard delay={0.3}>
           <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-wider mb-1">Cost Per Lead</p>
              <h3 className="text-3xl font-extrabold text-[var(--text-primary)]">$45.20</h3>
            </div>
            <div className="p-2 bg-[var(--accent-red-dim)] rounded-lg border border-[var(--accent-red)]/30">
              <ArrowDownRight className="w-5 h-5 text-[var(--accent-red)]" />
            </div>
          </div>
          <div className="h-16">
             <LineChart data={trendData3} color="#FF3333" height={64} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[var(--accent-green)] text-xs font-bold">-2.4%</span>
            <span className="text-[var(--text-secondary)] text-xs">optimization</span>
          </div>
        </PremiumCard>
      </div>

      {/* Main Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map & Heatmap Section */}
        <div className="lg:col-span-2 space-y-6">
           <PremiumCard className="h-80" delay={0.4}>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-[var(--text-primary)] font-bold text-lg">Global Lead Distribution</h3>
                 <div className="flex gap-4">
                    <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium"><span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] shadow-[0_0_8px_var(--accent-gold)]"></span> Hot Zones</span>
                    <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium"><span className="w-2 h-2 rounded-full bg-gray-600"></span> Inactive</span>
                 </div>
              </div>
              <div className="h-60 relative">
                <WorldMap />
              </div>
           </PremiumCard>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PremiumCard delay={0.5}>
                 <h3 className="text-[var(--text-primary)] font-bold text-lg mb-4">Activity Matrix</h3>
                 <div className="h-40">
                    <HeatMap />
                 </div>
              </PremiumCard>
              <PremiumCard delay={0.6}>
                  <h3 className="text-[var(--text-primary)] font-bold text-lg mb-4">Revenue Trajectory</h3>
                  <div className="h-40">
                     <LineChart data={[10, 25, 20, 45, 40, 60, 55, 80, 75, 95]} color="#D4AF37" height={160} />
                  </div>
              </PremiumCard>
           </div>
        </div>

        {/* Gauges Column */}
        <div className="space-y-6">
           <PremiumCard className="h-full flex flex-col justify-between" delay={0.5}>
              <div>
                <h3 className="text-[var(--text-primary)] font-bold text-lg mb-2">Predictive Success</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-8 font-medium">AI-calculated probability of hitting Q4 targets based on current pipeline velocity.</p>
                
                <div className="flex justify-center mb-8">
                   <GaugeChart value={87} label="Probability" size="lg" color="#D4AF37" />
                </div>
              </div>

              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-[var(--text-secondary)] font-medium">Resource Allocation</span>
                       <span className="text-[var(--text-primary)] font-bold">92%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--primary-bg)] rounded-full overflow-hidden">
                       <div className="h-full bg-[var(--accent-green)] w-[92%] shadow-[0_0_8px_var(--accent-green)]"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-[var(--text-secondary)] font-medium">Budget Utilization</span>
                       <span className="text-[var(--text-primary)] font-bold">64%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--primary-bg)] rounded-full overflow-hidden">
                       <div className="h-full bg-[var(--accent-gold)] w-[64%] shadow-[0_0_8px_var(--accent-gold)]"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-[var(--text-secondary)] font-medium">System Load</span>
                       <span className="text-[var(--text-primary)] font-bold">23%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--primary-bg)] rounded-full overflow-hidden">
                       <div className="h-full bg-[var(--accent-blue)] w-[23%] shadow-[0_0_8px_var(--accent-blue)]"></div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 p-4 bg-[var(--input-bg)] rounded-lg border border-[var(--border-color)]">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--accent-gold-dim)] rounded-full border border-[var(--accent-gold)]/30">
                       <Activity className="w-4 h-4 text-[var(--accent-gold)]" />
                    </div>
                    <div>
                       <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">AI Insight</div>
                       <div className="text-xs text-[var(--text-primary)] font-medium">Lead quality score increased by 15% following new filter implementation.</div>
                    </div>
                 </div>
              </div>
           </PremiumCard>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
