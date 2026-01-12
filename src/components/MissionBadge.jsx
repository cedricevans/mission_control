
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusConfig = {
  active: {
    label: 'ACTIVE',
    className: 'bg-green-500/20 text-green-400 border-green-400 pulse-glow',
    dotClass: 'status-dot active'
  },
  critical: {
    label: 'CRITICAL',
    className: 'bg-red-500/20 text-red-400 border-red-400 pulse-glow',
    dotClass: 'status-dot critical'
  },
  nominal: {
    label: 'NOMINAL',
    className: 'bg-cyan-500/20 text-cyan-400 border-cyan-400',
    dotClass: 'status-dot'
  },
  alert: {
    label: 'ALERT',
    className: 'bg-orange-500/20 text-orange-400 border-orange-400 pulse-orange',
    dotClass: 'status-dot warning'
  },
  standby: {
    label: 'STANDBY',
    className: 'bg-slate-500/20 text-slate-400 border-slate-400',
    dotClass: 'status-dot'
  }
};

function MissionBadge({ status = 'nominal', showDot = true, className }) {
  const config = statusConfig[status.toLowerCase()] || statusConfig.nominal;
  
  return (
    <Badge 
      className={cn(
        'font-mission font-bold uppercase tracking-wider border-2 px-3 py-1 transition-glow',
        config.className,
        className
      )}
    >
      {showDot && <span className={config.dotClass} />}
      {config.label}
    </Badge>
  );
}

export default MissionBadge;
