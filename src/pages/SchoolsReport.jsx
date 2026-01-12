
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { BarChartAdvanced } from '@/components/charts/AdvancedCharts';

const schoolData = [
  { label: 'Howard', value: 1240 },
  { label: 'Spelman', value: 850 },
  { label: 'Morehouse', value: 920 },
  { label: 'Hampton', value: 780 },
  { label: 'NC A&T', value: 1350 }
];

function SchoolsReport() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">School Performance</h1>
      
      <PremiumCard className="p-6">
         <h3 className="text-lg font-bold mb-6">Top Schools by Enrollment</h3>
         <BarChartAdvanced data={schoolData} height={300} />
      </PremiumCard>
      
      <div className="grid grid-cols-3 gap-6">
         <PremiumCard className="p-6 text-center">
            <div className="text-3xl font-bold text-[var(--accent-gold)]">42</div>
            <div className="text-sm text-[var(--text-secondary)]">Partner Schools</div>
         </PremiumCard>
         <PremiumCard className="p-6 text-center">
            <div className="text-3xl font-bold text-[var(--accent-blue)]">12.5k</div>
            <div className="text-sm text-[var(--text-secondary)]">Total Students</div>
         </PremiumCard>
         <PremiumCard className="p-6 text-center">
            <div className="text-3xl font-bold text-[var(--accent-green)]">$18.2M</div>
            <div className="text-sm text-[var(--text-secondary)]">Total Revenue</div>
         </PremiumCard>
      </div>
    </div>
  );
}

export default SchoolsReport;
