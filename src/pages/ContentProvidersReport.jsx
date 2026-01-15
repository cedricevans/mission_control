
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { BarChartAdvanced } from '@/components/charts/AdvancedCharts';
import { getContentProviderPerformance, getContentLibrary } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Rocket } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function ContentProvidersReport() {
  const { toast } = useToast();
  const providers = getContentProviderPerformance();
  const contentItems = getContentLibrary();
  const totalLeads = providers.reduce((sum, p) => sum + p.leads, 0);
  const avgQuality = providers.length
    ? providers.reduce((sum, p) => sum + p.avgQuality, 0) / providers.length
    : 0;
  const chartData = providers.map((provider) => ({
    label: provider.name.split(' ')[0],
    value: provider.leads
  }));

  const handleAction = (title, description) => {
    toast({ title, description, duration: 2500 });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Reports', path: '/reports' }, { label: 'Content Providers', path: '/reports/content' }]} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Content Analytics</h1>
          <p className="text-[var(--text-secondary)]">Benchmark content partners and top-performing assets.</p>
        </div>
        <Button variant="outline" onClick={() => handleAction('Export Ready', 'Content provider report exported as CSV.')}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PremiumCard className="p-6 text-center">
          <div className="text-3xl font-bold text-[var(--accent-blue)]">{totalLeads}</div>
          <div className="text-sm text-[var(--text-secondary)]">Total Leads</div>
        </PremiumCard>
        <PremiumCard className="p-6 text-center">
          <div className="text-3xl font-bold text-[var(--accent-green)]">{avgQuality.toFixed(1)}</div>
          <div className="text-sm text-[var(--text-secondary)]">Avg Quality Score</div>
        </PremiumCard>
        <PremiumCard className="p-6 text-center">
          <div className="text-3xl font-bold text-[var(--accent-gold)]">{contentItems.length}</div>
          <div className="text-sm text-[var(--text-secondary)]">Active Assets</div>
        </PremiumCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PremiumCard className="p-6 lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">Leads by Provider</h3>
          <BarChartAdvanced data={chartData} />
        </PremiumCard>
        <PremiumCard className="p-0 overflow-hidden lg:col-span-2">
          <table className="w-full text-left">
            <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
              <tr>
                <th className="p-4">Provider</th>
                <th className="p-4">Leads</th>
                <th className="p-4">Conversion</th>
                <th className="p-4">Avg Quality</th>
                <th className="p-4">Last Active</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.name} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
                  <td className="p-4 font-semibold">{provider.name}</td>
                  <td className="p-4">{provider.leads}</td>
                  <td className="p-4">{provider.conversionRate.toFixed(1)}%</td>
                  <td className="p-4">{provider.avgQuality}</td>
                  <td className="p-4">{provider.lastActiveLabel}</td>
                  <td className="p-4">
                    <Badge variant={provider.status === 'Active' ? 'default' : 'secondary'}>{provider.status}</Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => handleAction('Provider View', `${provider.name} details opened.`)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleAction('Campaign Launched', `New campaign drafted for ${provider.name}.`)}>
                      <Rocket className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PremiumCard>
      </div>
    </div>
  );
}

export default ContentProvidersReport;
