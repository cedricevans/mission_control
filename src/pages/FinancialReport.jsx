
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChartAdvanced } from '@/components/charts/AdvancedCharts';

const revenueData = [
  { label: 'Jan', value: 45000 }, { label: 'Feb', value: 52000 },
  { label: 'Mar', value: 49000 }, { label: 'Apr', value: 63000 },
  { label: 'May', value: 58000 }, { label: 'Jun', value: 71000 },
  { label: 'Jul', value: 68000 }, { label: 'Aug', value: 84000 },
  { label: 'Sep', value: 79000 }, { label: 'Oct', value: 92000 },
  { label: 'Nov', value: 88000 }, { label: 'Dec', value: 105000 }
];

const costData = [
  { label: 'Jan', value: 18000 }, { label: 'Feb', value: 22000 },
  { label: 'Mar', value: 20000 }, { label: 'Apr', value: 28000 },
  { label: 'May', value: 25000 }, { label: 'Jun', value: 31000 },
  { label: 'Jul', value: 29000 }, { label: 'Aug', value: 34000 },
  { label: 'Sep', value: 32000 }, { label: 'Oct', value: 36000 },
  { label: 'Nov', value: 33000 }, { label: 'Dec', value: 39000 }
];

const profitData = revenueData.map((item, index) => ({
  label: item.label,
  value: item.value - costData[index].value
}));

const marginData = revenueData.map((item, index) => ({
  label: item.label,
  value: Math.round(((item.value - costData[index].value) / item.value) * 100)
}));

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
                <LineChartAdvanced data={revenueData} height={250} color="#00FF41" />
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
          <TabsContent value="cost" className="space-y-6">
            <div className="h-64">
              <LineChartAdvanced data={costData} height={250} color="#EF4444" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">Total Spend</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">$342,000</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">YoY Change</div>
                <div className="text-2xl font-bold text-[var(--accent-red)]">+8.1%</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">Avg. Monthly</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">$28,500</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="profit" className="space-y-6">
            <div className="h-64">
              <LineChartAdvanced data={profitData} height={250} color="#00D9FF" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">Total Profit</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">$512,000</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">YoY Growth</div>
                <div className="text-2xl font-bold text-[var(--accent-green)]">+19.4%</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">Avg. Monthly</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">$42,600</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="margin" className="space-y-6">
            <div className="h-64">
              <LineChartAdvanced data={marginData} height={250} color="#D4AF37" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">Avg Margin</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">58.7%</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">Highest Month</div>
                <div className="text-2xl font-bold text-[var(--accent-green)]">62%</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--secondary-bg)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--text-secondary)]">Lowest Month</div>
                <div className="text-2xl font-bold text-[var(--accent-red)]">52%</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PremiumCard>
    </div>
  );
}

export default FinancialReport;
