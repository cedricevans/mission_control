
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { BarChartAdvanced } from '@/components/charts/AdvancedCharts';
import { getPublisherPerformance } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function PublishersReport() {
  const { toast } = useToast();
  const publishers = getPublisherPerformance();
  const totalLeads = publishers.reduce((sum, p) => sum + p.leads, 0);
  const avgConversion = publishers.length
    ? publishers.reduce((sum, p) => sum + p.conversionRate, 0) / publishers.length
    : 0;
  const activePublishers = publishers.filter((p) => p.status === 'Active').length;
  const chartData = publishers.map((publisher) => ({
    label: publisher.name.split(' ')[0],
    value: publisher.leads
  }));

  const handleAction = (title, description) => {
    toast({ title, description, duration: 2500 });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Reports', path: '/reports' }, { label: 'Publishers', path: '/reports/publishers' }]} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Publisher Performance</h1>
          <p className="text-[var(--text-secondary)]">Track lead quality, revenue, and conversion trends by publisher.</p>
        </div>
        <Button variant="outline" onClick={() => handleAction('Export Ready', 'Publisher report exported as CSV.')}>
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
          <div className="text-3xl font-bold text-[var(--accent-green)]">{avgConversion.toFixed(1)}%</div>
          <div className="text-sm text-[var(--text-secondary)]">Avg Conversion Rate</div>
        </PremiumCard>
        <PremiumCard className="p-6 text-center">
          <div className="text-3xl font-bold text-[var(--accent-gold)]">{activePublishers}</div>
          <div className="text-sm text-[var(--text-secondary)]">Active Publishers</div>
        </PremiumCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PremiumCard className="p-6 lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">Leads by Publisher</h3>
          <BarChartAdvanced data={chartData} />
        </PremiumCard>
        <PremiumCard className="p-0 overflow-hidden lg:col-span-2">
          <table className="w-full text-left">
            <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
              <tr>
                <th className="p-4">Publisher</th>
                <th className="p-4">Leads</th>
                <th className="p-4">Conversion</th>
                <th className="p-4">Avg Quality</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Last Active</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher) => (
                <tr key={publisher.name} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
                  <td className="p-4 font-semibold">{publisher.name}</td>
                  <td className="p-4">{publisher.leads}</td>
                  <td className="p-4">{publisher.conversionRate.toFixed(1)}%</td>
                  <td className="p-4">{publisher.avgQuality}</td>
                  <td className="p-4">${publisher.revenue.toLocaleString()}</td>
                  <td className="p-4">{publisher.lastActiveLabel}</td>
                  <td className="p-4">
                    <Badge variant={publisher.status === 'Active' ? 'default' : 'secondary'}>{publisher.status}</Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => handleAction('Publisher View', `${publisher.name} details opened.`)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleAction('Message Sent', `Check-in sent to ${publisher.name}.`)}>
                      <MessageSquare className="w-4 h-4" />
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

export default PublishersReport;
