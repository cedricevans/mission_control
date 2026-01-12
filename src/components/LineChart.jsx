
import React from 'react';
import { motion } from 'framer-motion';

function LineChart({ data = [], color = '#D4AF37', height = 100 }) {
  // Normalize data for SVG
  const maxVal = Math.max(...data) || 100;
  const minVal = Math.min(...data) || 0;
  const range = maxVal - minVal || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - minVal) / range) * 80 - 10; // keep some padding
    return `${x},${y}`;
  }).join(' ');

  // Creating a smooth curve path (simplified bezier)
  // For simplicity in this constrained environment, we'll stick to a polyline or simple smoothing
  // A simple way to "smooth" is to use a cardinal spline algorithm, but standard polyline is reliable.
  // Let's use a polyline for "sharp" tech look or standard SVG logic.
  
  // Generating Area path
  const areaPoints = `${points} 100,100 0,100`;

  return (
    <div className="w-full relative" style={{ height: `${height}px` }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

        {/* Area fill */}
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          points={areaPoints}
          fill={`url(#gradient-${color})`}
        />

        {/* Line */}
        <motion.polyline
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        />
        
        {/* Dots */}
        {data.map((val, i) => {
           const x = (i / (data.length - 1)) * 100;
           const y = 100 - ((val - minVal) / range) * 80 - 10;
           return (
             <motion.circle
               key={i}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 + i * 0.1 }}
               cx={x}
               cy={y}
               r="1.5"
               fill="#1A1F2E"
               stroke={color}
               strokeWidth="1"
             />
           );
        })}
      </svg>
    </div>
  );
}

export default LineChart;
