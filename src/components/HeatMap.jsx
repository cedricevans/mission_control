
import React from 'react';
import { motion } from 'framer-motion';

function HeatMap() {
  // 7 days x 12 hours approx
  const rows = 7;
  const cols = 16;
  
  const getOpacity = () => {
    // Random opacity to simulate heat
    return Math.random() * 0.8 + 0.1;
  };

  return (
    <div className="flex flex-col gap-1 w-full h-full">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-1 flex-1">
          {Array.from({ length: cols }).map((_, c) => {
            const opacity = getOpacity();
            const isHigh = opacity > 0.7;
            return (
              <motion.div
                key={c}
                className="flex-1 rounded-sm"
                style={{ 
                  backgroundColor: isHigh ? '#D4AF37' : '#374151',
                  opacity: isHigh ? opacity : 0.2
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (r * cols + c) * 0.01 }}
                whileHover={{ scale: 1.5, zIndex: 10, opacity: 1, backgroundColor: '#F4D03F' }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default HeatMap;
