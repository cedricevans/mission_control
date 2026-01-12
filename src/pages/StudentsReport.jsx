
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { LineChartAdvanced, PieChartAdvanced } from '@/components/charts/AdvancedCharts';

const enrollmentData = [
  { label: 'Jan', value: 120 }, { label: 'Feb', value: 145 },
  { label: 'Mar', value: 160 }, { label: 'Apr', value: 130 },
  { label: 'May', value: 180 }, { label: 'Jun', value: 210 }
];

const statusData = [
  { label: 'Active', value: 850, color: '#00FF41' },
  { label: 'Graduated', value: 320, color: '#D4AF37' },
  { label: 'Dropped', value: 120, color: '#EF4444' },
  { label: 'Paused', value: 80, color: '#3B82F6' }
];

function StudentsReport() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Student Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PremiumCard className="p-6">
           <h3 className="text-lg font-bold mb-4">Enrollment Trend (6 Mo)</h3>
           <LineChartAdvanced data={enrollmentData} color="#00D9FF" />
        </PremiumCard>
        
        <PremiumCard className="p-6 flex flex-col items-center justify-center">
           <h3 className="text-lg font-bold mb-4 w-full text-left">Student Status Distribution</h3>
           <PieChartAdvanced data={statusData} />
        </PremiumCard>
      </div>

      <PremiumCard className="p-6">
         <h3 className="text-lg font-bold mb-4">Detailed Metrics</h3>
         <div className="p-8 text-center border rounded-lg border-dashed border-[var(--border-color)] text-[var(--text-secondary)]">
            Detailed student performance table would go here...
         </div>
      </PremiumCard>
    </div>
  );
}

export default StudentsReport;
