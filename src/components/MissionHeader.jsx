
import React, { useState, useEffect } from 'react';
import { Rocket, Activity } from 'lucide-react';
import MissionBadge from './MissionBadge';

function MissionHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
  };
  
  return (
    <div className="glass-panel-strong border-b-2 neon-border-cyan">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Rocket className="w-10 h-10 text-cyan-400 pulse-cyan" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full pulse-glow" />
            </div>
            <div>
              <h1 className="text-3xl font-mission font-bold neon-text-cyan tracking-wider">
                MISSION CONTROL
              </h1>
              <p className="text-xs font-mono-mission text-slate-400 uppercase tracking-widest">
                Lead Management System v2.0
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-mono-mission font-bold text-cyan-400 neon-text-cyan">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs font-mono-mission text-slate-400">
                {formatDate(currentTime)}
              </div>
            </div>
            
            <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg">
              <Activity className="w-4 h-4 text-green-400 pulse-glow" />
              <MissionBadge status="active" showDot={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionHeader;
