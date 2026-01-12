
import React from 'react';
import { motion } from 'framer-motion';

export const SimpleBarChart = ({ data, height = 200, color = '#D4AF37' }) => {
  // Data format: [{ label: 'A', value: 10 }, ...]
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="w-full flex items-end justify-between gap-2" style={{ height }}>
      {data.map((item, index) => {
        const heightPercent = (item.value / maxValue) * 100;
        return (
          <div key={index} className="flex-1 flex flex-col items-center group relative">
             {/* Tooltip */}
            <div className="absolute -top-8 bg-[var(--card-bg)] border border-[var(--border-color)] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-lg">
              <span className="font-bold text-[var(--accent-gold)]">{item.value}</span> {item.label}
            </div>

            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${heightPercent}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="w-full rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
              style={{ backgroundColor: item.color || color }}
            />
            <span className="text-[10px] text-[var(--text-secondary)] mt-1 truncate max-w-full">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export const SimplePieChart = ({ data, size = 150 }) => {
  // Data format: [{ label: 'A', value: 10, color: '#f00' }, ...]
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
        {data.map((slice, index) => {
          if (slice.value === 0) return null;
          
          const startPercent = cumulativePercent;
          const slicePercent = slice.value / total;
          cumulativePercent += slicePercent;
          const endPercent = cumulativePercent;

          const [startX, startY] = getCoordinatesForPercent(startPercent);
          const [endX, endY] = getCoordinatesForPercent(endPercent);

          const largeArcFlag = slicePercent > 0.5 ? 1 : 0;

          const pathData = `
            M 0 0
            L ${startX} ${startY}
            A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z
          `;

          return (
            <motion.path
              key={index}
              d={pathData}
              fill={slice.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hover:opacity-80 cursor-pointer"
            >
              <title>{`${slice.label}: ${slice.value} (${Math.round(slicePercent * 100)}%)`}</title>
            </motion.path>
          );
        })}
      </svg>
    </div>
  );
};
