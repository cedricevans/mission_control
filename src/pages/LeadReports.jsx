
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import ConversionFunnel from '@/components/ConversionFunnel';
import SourcePerformance from '@/components/SourcePerformance';
import CampaignROI from '@/components/CampaignROI';
import AgentPerformance from '@/components/AgentPerformance';
import LeadQualityTrend from '@/components/LeadQualityTrend';

function LeadReports() {
  return (
    <div className="space-y-6">
       {/* Header */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
             <h2 className="text-2xl font-bold text-[var(--text-primary)]">Mission Analytics</h2>
             <p className="text-sm text-[var(--text-secondary)]">Deep dive into performance metrics and KPI tracking</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]">
                <Calendar className="w-4 h-4 mr-2" /> Last 30 Days
             </Button>
             <Button className="bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)]/90">
                <Download className="w-4 h-4 mr-2" /> Export PDF
             </Button>
          </div>
       </div>

       {/* Top Row: Pipeline & Trends */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <ConversionFunnel />
          </div>
          <div className="w-full">
            <LeadQualityTrend />
          </div>
       </div>

       {/* Middle Row: Split Metrics */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SourcePerformance />
          <CampaignROI />
       </div>

       {/* Bottom Row: Leaderboard */}
       <div className="w-full">
          <AgentPerformance />
       </div>
    </div>
  );
}

export default LeadReports;
