
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChartAdvanced } from '@/components/charts/AdvancedCharts';

const mockData = [
  { label: 'Jan', value: 45000 }, { label: 'Feb', value: 52000 },
  { label: 'Mar', value: 49000 }, { label: 'Apr', value: 63000 },
  { label: 'May', value: 58000 }, { label: 'Jun', value: 71000 },
  { label: 'Jul', value: 68000 }, { label: 'Aug', value: 84000 },
  { label: 'Sep', value: 79000 }, { label: 'Oct', value: 92000 },
  { label: 'Nov', value: 88000 }, { label: 'Dec', value: 105000 }
];

function FinancialReport() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Financial Report</h1>
      
      <PremiumCard className="p-6">
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mb-8">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="cost">Cost</TabsTrigger>
            <TabsTrigger value="profit">Profit</TabsTrigger>
            <TabsTrigger value="margin">Margin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-6">
             <div className="h-64">
                <LineChartAdvanced data={mockData} height={250} color="#00FF41" />
             </div>
             <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                   <div className="text-sm text-[var(--text-secondary)]">Total Revenue</div>
                   <div className="text-2xl font-bold text-[var(--text-primary)]">$854,000</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                   <div className="text-sm text-[var(--text-secondary)]">YoY Growth</div>
                   <div className="text-2xl font-bold text-[var(--accent-green)]">+24.5%</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                   <div className="text-sm text-[var(--text-secondary)]">Avg. Monthly</div>
                   <div className="text-2xl font-bold text-[var(--text-primary)]">$71,166</div>
                </div>
             </div>
          </TabsContent>
          
          {/* Other tabs would have similar structure with different data */}
          <TabsContent value="cost"><div className="p-8 text-center text-[var(--text-secondary)]">Cost Data Visualization</div></TabsContent>
          <TabsContent value="profit"><div className="p-8 text-center text-[var(--text-secondary)]">Profit Data Visualization</div></TabsContent>
          <TabsContent value="margin"><div className="p-8 text-center text-[var(--text-secondary)]">Margin Data Visualization</div></TabsContent>
        </Tabs>
      </PremiumCard>
    </div>
  );
}

export default FinancialReport;
