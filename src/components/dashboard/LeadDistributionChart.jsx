
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PremiumCard from '@/components/PremiumCard';
import { getLeadDistribution } from '@/lib/storage';

const LeadDistributionChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        const filteredData = getLeadDistribution(filters);
        setData(filteredData.filter(item => item.count > 0));
        setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  
  const colors = {
    'Gross': '#64748b',
    'Valid': '#00D9FF',
    'Accepted': '#00FF41',
    'Invalid': '#FF3333',
    'Rejected': '#D4AF37',
    'Returned': '#9333ea'
  };

  let currentAngle = 0;

  if (loading) {
      return (
          <PremiumCard className="h-full min-h-[400px] flex items-center justify-center" glow>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-gold)]"></div>
          </PremiumCard>
      );
  }

  if (data.length === 0) {
      return (
        <PremiumCard className="h-full min-h-[400px] flex flex-col justify-center items-center" glow>
             <h3 className="text-lg font-bold text-[var(--text-primary)] font-display mb-4">Lead Distribution</h3>
             <p className="text-[var(--text-secondary)]">No data found for selected period.</p>
        </PremiumCard>
      );
  }

  // Calculate gross excluded total for percentage calc if needed
  const displayTotal = total - (data.find(d => d.status === 'Gross')?.count || 0);

  return (
    <PremiumCard className="h-full min-h-[400px] flex flex-col justify-center items-center relative" glow>
      <div className="absolute top-6 left-6 z-20">
        <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">Lead Distribution</h3>
        <p className="text-xs text-[var(--text-secondary)] mt-1">Status breakdown</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-full pt-10">
        <div className="relative w-56 h-56">
          <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full overflow-visible">
            {data.map((item, i) => {
              if (item.status === 'Gross') return null;
              
              const percentage = displayTotal > 0 ? (item.count / displayTotal) * 100 : 0;
              const strokeDasharray = `${percentage} 100`;
              const strokeDashoffset = -currentAngle;
              currentAngle += percentage;
              
              return (
                <motion.circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors[item.status]}
                  strokeWidth={hoveredIndex === i ? "12" : "10"}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  initial={{ strokeDasharray: "0 100", opacity: 0 }}
                  animate={{ strokeDasharray: strokeDasharray, opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="transition-all duration-300 cursor-pointer drop-shadow-lg"
                  pathLength={100}
                />
              );
            })}
             
             {/* Center Stats */}
             <foreignObject x="25" y="25" width="50" height="50" className="pointer-events-none transform rotate-90">
               <div className="flex flex-col items-center justify-center w-full h-full text-center">
                 <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Valid</span>
                 <span className="text-xl font-bold text-[var(--text-primary)] font-display">
                   {displayTotal}
                 </span>
               </div>
             </foreignObject>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {data.filter(d => d.status !== 'Gross').map((item, i) => (
            <motion.div 
              key={item.status}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${hoveredIndex === i ? 'bg-[var(--hover-bg)]' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: colors[item.status] }} 
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[var(--text-secondary)]">{item.status}</span>
                <span className="text-sm font-bold text-[var(--text-primary)]">{item.count}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PremiumCard>
  );
};

export default LeadDistributionChart;
