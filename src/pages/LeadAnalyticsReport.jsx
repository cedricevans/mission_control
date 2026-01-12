
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { LineChartAdvanced, PieChartAdvanced } from '@/components/charts/AdvancedCharts';
import Breadcrumb from '@/components/Breadcrumb';
import { getDashboardStats, getLeadQualityTrendData } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

function LeadAnalyticsReport() {
  const stats = getDashboardStats();
  const trendData = getLeadQualityTrendData();
  
  const leadSourceData = [
    { label: 'Organic', value: 450, color: '#00D9FF' },
    { label: 'Paid Search', value: 320, color: '#00FF41' },
    { label: 'Referral', value: 150, color: '#D4AF37' },
    { label: 'Direct', value: 200, color: '#EF4444' }
  ];

  const trendChartData = trendData.map(d => ({ label: d.month, value: d.leads }));

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Reports', path: '/reports' }, { label: 'Lead Analytics', path: '/reports/lead-analytics' }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Lead Analytics</h1>
          <p className="text-[var(--text-secondary)]">Detailed metrics on lead acquisition and quality</p>
        </div>
        <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PremiumCard className="p-6 text-center">
          <div className="text-3xl font-bold text-[var(--accent-blue)]">{stats.totalLeads}</div>
          <div className="text-sm text-[var(--text-secondary)]">Total Leads</div>
        </PremiumCard>
        <PremiumCard className="p-6 text-center">
          <div className="text-3xl font-bold text-[var(--accent-green)]">{stats.conversionRate.toFixed(1)}%</div>
          <div className="text-sm text-[var(--text-secondary)]">Conversion Rate</div>
        </PremiumCard>
         <PremiumCard className="p-6 text-center">
          <div className="text-3xl font-bold text-[var(--accent-gold)]">${stats.costPerLead.toFixed(2)}</div>
          <div className="text-sm text-[var(--text-secondary)]">Cost Per Lead</div>
        </PremiumCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PremiumCard className="p-6">
            <h3 className="text-lg font-bold mb-4">Lead Acquisition Trend</h3>
            <LineChartAdvanced data={trendChartData} color="#00D9FF" />
        </PremiumCard>
        <PremiumCard className="p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 w-full text-left">Lead Source Distribution</h3>
            <PieChartAdvanced data={leadSourceData} />
        </PremiumCard>
      </div>
    </div>
  );
}

export default LeadAnalyticsReport;
