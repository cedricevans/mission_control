
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Construction } from 'lucide-react';

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
       <PremiumCard className="p-12 text-center max-w-lg w-full flex flex-col items-center" glow>
          <div className="w-16 h-16 rounded-full bg-[var(--primary-bg)] border border-[var(--accent-gold)] flex items-center justify-center mb-6">
             <Construction className="w-8 h-8 text-[var(--accent-gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{title}</h2>
          <p className="text-[var(--text-secondary)] mb-8">
             This module is currently under development. Check back soon for updates or contact administration.
          </p>
          <div className="w-full h-1 bg-[var(--primary-bg)] rounded-full overflow-hidden">
             <div className="h-full bg-[var(--accent-gold)] w-1/3 animate-pulse" />
          </div>
       </PremiumCard>
    </div>
  );
}

export default PlaceholderPage;
