
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PremiumCard from '@/components/PremiumCard';
import { getTopCampaigns } from '@/lib/storage';

const TopCampaignsChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        setData(getTopCampaigns(filters));
        setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const maxRevenue = data.length > 0 ? Math.max(...data.map(d => d.revenue)) : 0;
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

  if (loading) {
      return (
          <PremiumCard className="h-full min-h-[400px] flex items-center justify-center" glow>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-gold)]"></div>
          </PremiumCard>
      );
  }

  return (
    <PremiumCard className="h-full min-h-[400px] flex flex-col p-8" glow>
       <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">Top Campaigns</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Revenue performance by program</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20">
             <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" /> 
             <span className="text-xs font-medium text-[var(--accent-gold)]">Live Data</span>
          </div>
       </div>

       <div className="flex-1 flex flex-col justify-center gap-6">
          {data.length === 0 ? (
             <p className="text-center text-[var(--text-secondary)]">No campaign data for this period.</p>
          ) : (
            data.map((item, i) => (
               <div key={i} className="group relative">
                  <div className="flex justify-between text-xs mb-2 px-1">
                     <span className="font-medium text-[var(--text-primary)]">{item.campaign}</span>
                     <span className="font-mono text-[var(--accent-gold)] font-bold">{formatCurrency(item.revenue)}</span>
                  </div>
                  
                  <div className="w-full h-2.5 bg-[var(--secondary-bg)] rounded-full overflow-hidden shadow-inner border border-[var(--border-color)]">
                     <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0}%` }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full relative"
                        style={{ 
                          background: 'linear-gradient(90deg, #D4AF37 0%, #F5D76E 100%)',
                          boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                        }}
                     >
                       <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50" />
                     </motion.div>
                  </div>
                  
                  {/* Hover overlay highlight */}
                  <div className="absolute -inset-2 bg-[var(--hover-bg)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
               </div>
            ))
          )}
       </div>
    </PremiumCard>
  );
};

export default TopCampaignsChart;
