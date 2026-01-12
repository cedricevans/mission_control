
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function NeonCard({ 
  children, 
  className, 
  glowColor = 'cyan', 
  hoverable = true,
  glass = true,
  ...props 
}) {
  const glowClasses = {
    cyan: 'neon-border-cyan hover-glow-cyan',
    orange: 'neon-border-orange hover-glow-orange',
    none: 'border-slate-700'
  };
  
  return (
    <Card 
      className={cn(
        'transition-all-smooth',
        glass && 'glass-panel',
        hoverable && 'hover:scale-[1.02]',
        glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

export default NeonCard;
