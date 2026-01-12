
import React from 'react';
import { motion } from 'framer-motion';

function GaugeChart({ value = 0, max = 100, label, size = 'md', color = '#D4AF37' }) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClasses[size] || sizeClasses.md} relative`}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Track */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="#252b3d"
          strokeWidth="8"
        />
        {/* Indicator */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white font-poppins">
          {Math.round(value)}%
        </span>
        {label && (
          <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</span>
        )}
      </div>
    </div>
  );
}

export default GaugeChart;
