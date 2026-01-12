
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function GaugeMeter({ value = 0, max = 100, label, color = 'cyan', size = 'md' }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);
  
  const percentage = Math.min((displayValue / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };
  
  const colorClasses = {
    cyan: 'text-cyan-400',
    orange: 'text-orange-400',
    green: 'text-green-400',
    red: 'text-red-400'
  };
  
  const strokeColor = {
    cyan: 'var(--electric-cyan)',
    orange: 'var(--mission-orange)',
    green: 'var(--status-active)',
    red: 'var(--alert-red)'
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn('relative', sizeClasses[size])}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(0, 212, 255, 0.1)"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={strokeColor[color]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: `drop-shadow(0 0 8px ${strokeColor[color]})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={cn('text-2xl font-bold font-mission counter-animate', colorClasses[color])}>
              {Math.round(displayValue)}
            </div>
            <div className="text-xs text-slate-400 font-mono-mission">/{max}</div>
          </div>
        </div>
      </div>
      {label && (
        <div className="text-sm font-mission text-slate-300 uppercase tracking-wider">
          {label}
        </div>
      )}
    </div>
  );
}

export default GaugeMeter;
