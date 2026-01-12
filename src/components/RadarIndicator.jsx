
import React from 'react';
import { cn } from '@/lib/utils';

function RadarIndicator({ active = true, size = 'md', pulseCount = 3 }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };
  
  return (
    <div className={cn('relative', sizeClasses[size])}>
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30" />
      
      {/* Pulse Rings */}
      {active && [...Array(pulseCount)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-cyan-400/50 radar-pulse"
          style={{
            animationDelay: `${i * 0.6}s`,
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
          }}
        />
      ))}
      
      {/* Scanning Line */}
      {active && (
        <div className="absolute inset-0">
          <div className="radar-scan w-full h-full">
            <div 
              className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
              style={{
                background: 'linear-gradient(to right, rgba(0, 212, 255, 0), rgba(0, 212, 255, 1))',
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
                transform: 'translateY(-50%)'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Center Dot */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 pulse-cyan" />
      
      {/* Grid Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-px h-full bg-cyan-500/20 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-500/20 -translate-y-1/2" />
      </div>
    </div>
  );
}

export default RadarIndicator;
