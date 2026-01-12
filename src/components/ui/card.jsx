
import React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] shadow-lg transition-colors duration-300',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export { Card };
