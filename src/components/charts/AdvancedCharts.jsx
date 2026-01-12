
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- PIE CHART ADVANCED ---
export const PieChartAdvanced = ({ data, size = 200, thickness = 20 }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((item, i) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} 100`;
            const strokeDashoffset = -currentAngle;
            currentAngle += percentage;
            
            // Adjust radius to fit stroke thickness
            const radius = 50 - (thickness / 4); 

            return (
              <motion.circle
                key={i}
                cx="50"
                cy="50"
                r={25} // Half viewbox
                fill="transparent"
                stroke={item.color}
                strokeWidth={thickness} // Relative to viewbox size (100)
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: strokeDasharray }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                pathLength={100} // Normalizes dasharray
              >
                 <title>{`${item.label}: ${item.value} (${percentage.toFixed(1)}%)`}</title>
              </motion.circle>
            );
          })}
        </svg>
        {/* Center Text or Icon could go here */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
             <span className="text-2xl font-bold text-[var(--text-primary)]">{total}</span>
             <p className="text-[10px] uppercase text-[var(--text-secondary)]">Total</p>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-full">
         {data.map((item, i) => (
           <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                 <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                 <span className="text-[var(--text-secondary)] truncate max-w-[80px]">{item.label}</span>
              </div>
              <span className="font-bold text-[var(--text-primary)]">{((item.value/total)*100).toFixed(0)}%</span>
           </div>
         ))}
      </div>
    </div>
  );
};

// --- BAR CHART ADVANCED ---
export const BarChartAdvanced = ({ data, height = 250, showValues = true }) => {
  const maxVal = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="w-full flex flex-col gap-2">
       <div className="flex items-end justify-between gap-3 w-full" style={{ height }}>
         {data.map((item, i) => {
           const percent = (item.value / maxVal) * 100;
           return (
             <div key={i} className="flex-1 flex flex-col justify-end h-full group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                   <div className="bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded px-2 py-1 shadow-xl whitespace-nowrap">
                      <div className="font-bold">{item.label}</div>
                      <div>{item.tooltipValue || item.value}</div>
                   </div>
                </div>

                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${percent}%` }}
                   transition={{ duration: 0.6, delay: i * 0.1 }}
                   className="w-full rounded-t-md relative hover:opacity-90 transition-opacity cursor-pointer min-h-[4px]"
                   style={{ backgroundColor: item.color || '#00D9FF' }}
                >
                   {showValues && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
                         {item.value}
                      </span>
                   )}
                </motion.div>
                
                {/* X Axis Label */}
                <span className="text-[10px] text-[var(--text-secondary)] mt-2 text-center truncate w-full block">
                   {item.label}
                </span>
             </div>
           )
         })}
       </div>
    </div>
  );
};

// --- FUNNEL CHART ---
export const FunnelChart = ({ data }) => {
  // data: [{ label, value, color }]
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <div className="flex flex-col gap-1 w-full max-w-lg mx-auto">
      {data.map((stage, i) => {
        const widthPercent = (stage.value / maxVal) * 100;
        const nextStage = data[i + 1];
        const dropOff = nextStage ? ((stage.value - nextStage.value) / stage.value * 100).toFixed(0) : 0;

        return (
          <div key={i} className="relative group">
            {/* Bar */}
            <div className="flex items-center">
               <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="h-10 md:h-12 rounded-r-lg flex items-center px-4 relative shadow-sm"
                  style={{ 
                     backgroundColor: stage.color,
                     minWidth: '140px' // Ensure text fits
                  }}
               >
                  <span className="text-xs md:text-sm font-bold text-white drop-shadow-md truncate w-full">
                     {stage.label}
                  </span>
               </motion.div>

               {/* Value Label */}
               <div className="ml-3 flex flex-col">
                  <span className="text-sm font-bold text-[var(--text-primary)]">{stage.value}</span>
                  {nextStage && (
                     <span className="text-[10px] text-[var(--accent-red)] flex items-center">
                        ↓ {dropOff}% drop
                     </span>
                  )}
               </div>
            </div>
            
            {/* Connector Line (visual only) */}
            {i < data.length - 1 && (
               <div className="absolute left-8 top-10 md:top-12 h-2 w-0.5 bg-[var(--border-color)] z-0" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// --- LINE CHART ADVANCED ---
export const LineChartAdvanced = ({ data, height = 200, color = '#00FF41' }) => {
  // data: [{ label: 'Jan', value: 10 }, ...]
  const padding = 20;
  const values = data.map(d => d.value);
  const minVal = 0; // Or Math.min(...values)
  const maxVal = Math.max(...values, 100);

  // Calculate points
  const getX = (index) => (index / (data.length - 1)) * 100;
  const getY = (value) => 100 - ((value - minVal) / (maxVal - minVal)) * 100;

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  
  // Create area path for gradient
  const areaPath = `0,100 ${points} 100,100`;

  return (
    <div className="relative w-full" style={{ height }}>
       <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {/* Gradient Def */}
          <defs>
             <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
             </linearGradient>
          </defs>

          {/* Area Fill */}
          <motion.polygon
             points={areaPath}
             fill={`url(#gradient-${color})`}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1 }}
          />

          {/* Line */}
          <motion.polyline
             points={points}
             fill="none"
             stroke={color}
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
             vectorEffect="non-scaling-stroke" // Keeps line width constant on resize
          />

          {/* Data Points (Tooltips) */}
          {data.map((d, i) => (
             <g key={i} className="group">
                <circle
                   cx={getX(i)}
                   cy={getY(d.value)}
                   r="1.5"
                   fill={color}
                   stroke="var(--card-bg)"
                   strokeWidth="0.5"
                   className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                   vectorEffect="non-scaling-stroke"
                />
                {/* Tooltip via foreignObject for HTML content in SVG (or use overlay div) */}
                {/* Simplification: Just circle hover effect here, actual tooltip logic is complex in pure SVG */}
             </g>
          ))}
       </svg>
       
       {/* HTML Overlay for better tooltips */}
       <div className="absolute inset-0 flex justify-between items-end pointer-events-none">
          {data.map((d, i) => (
             <div key={i} className="relative group h-full flex flex-col justify-end pointer-events-auto w-4">
                <div 
                   className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 bg-[var(--text-primary)] mb-1"
                   style={{ bottom: `${100 - getY(d.value)}%` }}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] text-xs p-2 rounded shadow-xl whitespace-nowrap">
                       <div className="font-bold text-[var(--text-primary)]">{d.label}</div>
                       <div className="text-[var(--accent-gold)]">{d.value}</div>
                    </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

// --- LEADERBOARD CHART ---
export const LeaderboardChart = ({ data }) => {
  // data: [{ id, name, value, subValue, rank }]
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="flex flex-col gap-3">
       {data.map((item, i) => (
          <motion.div 
             key={item.id || i}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.1 }}
             className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors group"
          >
             {/* Rank Badge */}
             <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                i === 0 ? "bg-[var(--accent-gold)] text-[var(--text-inverse)] shadow-[0_0_10px_var(--accent-gold)]" :
                i === 1 ? "bg-gray-300 text-gray-800" :
                i === 2 ? "bg-amber-700 text-white" :
                "bg-[var(--secondary-bg)] text-[var(--text-secondary)]"
             )}>
                {i + 1}
             </div>

             <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-sm font-bold text-[var(--text-primary)] truncate">{item.name}</span>
                   <span className="text-sm font-mono text-[var(--accent-blue)]">{item.displayValue || item.value}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[var(--secondary-bg)] rounded-full overflow-hidden">
                   <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / maxValue) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-green)]"
                   />
                </div>
                {item.subValue && (
                   <div className="text-[10px] text-[var(--text-secondary)] mt-1 text-right">
                      {item.subValue}
                   </div>
                )}
             </div>
          </motion.div>
       ))}
    </div>
  );
};
