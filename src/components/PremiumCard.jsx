
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

function PremiumCard({ children, className, glow = false, delay = 0, onClick, ...props }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} 
      className={cn(
        'rounded-2xl p-6 relative group overflow-hidden transition-all duration-300',
        'bg-[var(--card-bg)] border border-[var(--border-color)]',
        // Light mode shadow vs Dark mode glow
        theme === 'dark' ? 'glass-panel' : 'shadow-md hover:shadow-lg',
        glow && theme === 'dark' && 'hover:shadow-[0_0_20px_var(--accent-gold-glow)] hover:border-[var(--accent-gold)]/50',
        glow && theme === 'light' && 'hover:border-[var(--accent-gold)]',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Subtle Gradient Overlay only visible in Dark Mode usually, but kept for texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-bg)]/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default PremiumCard;
