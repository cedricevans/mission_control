
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getGeoDistribution } from '@/lib/storage';
import { PieChartAdvanced } from '@/components/charts/AdvancedCharts';

function GeographicDistributionReport() {
  const geoData = getGeoDistribution();
  const chartData = geoData.map((d, i) => ({ 
      label: d.region, 
      value: d.leads, 
      color: ['#00D9FF', '#00FF41', '#D4AF37', '#EF4444', '#A855F7'][i] 
  }));

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Reports', path: '/reports' }, { label: 'Geographic Distribution', path: '/reports/geographic-distribution' }]} />
      
      <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Geographic Distribution</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <PremiumCard className="p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 w-full text-left">Regional Breakdown</h3>
            <PieChartAdvanced data={chartData} />
         </PremiumCard>
         
         <PremiumCard className="p-0 overflow-hidden">
             <table className="w-full text-left h-full">
                <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
                   <tr>
                      <th className="p-4">Region</th>
                      <th className="p-4">Leads</th>
                      <th className="p-4">Share</th>
                   </tr>
                </thead>
                <tbody>
                   {geoData.map((d, i) => (
                      <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                         <td className="p-4 font-medium">{d.region}</td>
                         <td className="p-4">{d.leads}</td>
                         <td className="p-4">{d.percentage}%</td>
                      </tr>
                   ))}
                </tbody>
             </table>
         </PremiumCard>
      </div>
    </div>
  );
}

export default GeographicDistributionReport;
