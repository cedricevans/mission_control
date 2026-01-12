
import React from 'react';
import { motion } from 'framer-motion';
import PremiumCard from '@/components/PremiumCard';

const TimeSeriesChart = () => {
  // Mock Data Points [Revenue, Cost, Profit]
  const data = [
     { day: 'Jan 1', rev: 1200, cost: 500, profit: 700 },
     { day: 'Jan 2', rev: 2500, cost: 1200, profit: 1300 },
     { day: 'Jan 3', rev: 1800, cost: 900, profit: 900 },
     { day: 'Jan 4', rev: 3200, cost: 1500, profit: 1700 },
     { day: 'Jan 5', rev: 2800, cost: 1100, profit: 1700 },
     { day: 'Jan 6', rev: 4500, cost: 2000, profit: 2500 },
     { day: 'Jan 7', rev: 3800, cost: 1800, profit: 2000 },
     { day: 'Jan 8', rev: 5200, cost: 2400, profit: 2800 },
     { day: 'Jan 9', rev: 4200, cost: 2100, profit: 2100 },
  ];

  const maxVal = Math.max(...data.map(d => d.rev));
  const height = 300;
  const width = 100; // Using percentages for responsiveness

  const getPoints = (key) => {
     return data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (d[key] / maxVal) * 100;
        return `${x},${y}`;
     }).join(' ');
  };

  return (
    <PremiumCard className="p-6 h-full min-h-[400px] flex flex-col">
       <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--accent-blue)]"></span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Revenue</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Cost</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--accent-gold)]"></span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Profit</span>
             </div>
          </div>
       </div>

       <div className="flex-1 w-full relative">
          {/* Y-Axis Labels (Mock) */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-[var(--text-secondary)] pointer-events-none z-10 pr-2 border-r border-dashed border-[var(--border-color)]">
             <span>${(maxVal).toLocaleString()}</span>
             <span>${(maxVal * 0.75).toLocaleString()}</span>
             <span>${(maxVal * 0.5).toLocaleString()}</span>
             <span>${(maxVal * 0.25).toLocaleString()}</span>
             <span>$0</span>
          </div>

          <div className="ml-10 h-full relative">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                {/* Grid Lines */}
                {[0, 25, 50, 75, 100].map(y => (
                   <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--border-color)" strokeDasharray="2 2" strokeWidth="0.5" />
                ))}

                {/* Revenue Line */}
                <motion.polyline
                   points={getPoints('rev')}
                   fill="none"
                   stroke="var(--accent-blue)"
                   strokeWidth="2"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 1.5 }}
                   vectorEffect="non-scaling-stroke"
                />
                
                {/* Cost Line */}
                <motion.polyline
                   points={getPoints('cost')}
                   fill="none"
                   stroke="gray"
                   strokeWidth="2"
                   strokeOpacity="0.5"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 1.5, delay: 0.2 }}
                   vectorEffect="non-scaling-stroke"
                />

                {/* Profit Line */}
                <motion.polyline
                   points={getPoints('profit')}
                   fill="none"
                   stroke="var(--accent-gold)"
                   strokeWidth="2"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 1.5, delay: 0.4 }}
                   vectorEffect="non-scaling-stroke"
                />
             </svg>

             {/* X-Axis Labels */}
             <div className="absolute top-full w-full flex justify-between text-[10px] text-[var(--text-secondary)] mt-2">
                 {data.map((d, i) => (
                    <span key={i}>{d.day}</span>
                 ))}
             </div>
          </div>
       </div>
    </PremiumCard>
  );
};

export default TimeSeriesChart;
