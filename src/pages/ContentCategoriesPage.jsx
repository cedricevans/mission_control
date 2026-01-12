
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getContentCategories } from '@/lib/storage';
import { BarChartAdvanced } from '@/components/charts/AdvancedCharts';

function ContentCategoriesPage() {
  const categories = getContentCategories();
  const chartData = categories.map(c => ({ label: c.name, value: c.leads }));

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Source Mgmt', path: '/source-management' }, { label: 'Content Categories', path: '/source-management/content-categories' }]} />
       <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Content Categories</h1>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PremiumCard className="p-6">
             <h3 className="text-lg font-bold mb-4">Leads by Category</h3>
             <BarChartAdvanced data={chartData} />
          </PremiumCard>
          
          <div className="grid grid-cols-1 gap-4">
             {categories.map(cat => (
                <PremiumCard key={cat.id} className="p-4 flex justify-between items-center hover:bg-[var(--hover-bg)] transition-colors">
                   <div>
                      <div className="font-bold text-lg">{cat.name}</div>
                      <div className="text-sm text-[var(--text-secondary)]">Engagement Score: {cat.engagement}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--accent-blue)]">{cat.leads}</div>
                      <div className="text-xs text-[var(--text-secondary)]">Leads Generated</div>
                   </div>
                </PremiumCard>
             ))}
          </div>
       </div>
    </div>
  );
}

export default ContentCategoriesPage;
