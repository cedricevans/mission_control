
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { FunnelChart } from '@/components/charts/AdvancedCharts';
import Breadcrumb from '@/components/Breadcrumb';
import { getConversionFunnelData } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

function ConversionFunnelReport() {
  const funnelData = getConversionFunnelData();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Reports', path: '/reports' }, { label: 'Conversion Funnel', path: '/reports/conversion-funnel' }]} />
      
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Conversion Funnel</h1>
           <p className="text-[var(--text-secondary)]">Visualize student enrollment journey stages</p>
        </div>
        <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>
      
      <PremiumCard className="p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
           <FunnelChart data={funnelData} />
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center">
            <div className="p-4 bg-[var(--secondary-bg)] rounded-lg">
                <div className="text-2xl font-bold text-[var(--text-primary)]">15%</div>
                <div className="text-xs text-[var(--text-secondary)]">Total Conversion Rate</div>
            </div>
             <div className="p-4 bg-[var(--secondary-bg)] rounded-lg">
                <div className="text-2xl font-bold text-[var(--text-primary)]">12 Days</div>
                <div className="text-xs text-[var(--text-secondary)]">Avg. Time to Enroll</div>
            </div>
        </div>
      </PremiumCard>
    </div>
  );
}

export default ConversionFunnelReport;
