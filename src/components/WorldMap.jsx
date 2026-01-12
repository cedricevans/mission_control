
import React from 'react';
import { motion } from 'framer-motion';

// A stylized dot map representation
function WorldMap() {
  // Simplified coordinates for a "dot" world map representation
  // This is purely decorative and schematic
  const dots = [
    // North America
    {x: 15, y: 25}, {x: 18, y: 22}, {x: 22, y: 25}, {x: 25, y: 28}, {x: 20, y: 30},
    {x: 12, y: 20}, {x: 28, y: 32}, {x: 22, y: 35}, {x: 18, y: 38},
    
    // South America
    {x: 30, y: 55}, {x: 32, y: 60}, {x: 35, y: 65}, {x: 28, y: 50}, {x: 32, y: 75},
    
    // Europe
    {x: 48, y: 22}, {x: 52, y: 20}, {x: 50, y: 25}, {x: 55, y: 24}, {x: 46, y: 28},
    
    // Africa
    {x: 50, y: 40}, {x: 55, y: 45}, {x: 48, y: 50}, {x: 52, y: 55}, {x: 58, y: 60},
    {x: 60, y: 42}, {x: 52, y: 65},
    
    // Asia
    {x: 70, y: 25}, {x: 75, y: 22}, {x: 80, y: 28}, {x: 65, y: 30}, {x: 85, y: 30},
    {x: 72, y: 35}, {x: 78, y: 38}, {x: 82, y: 20}, {x: 90, y: 25},
    
    // Australia
    {x: 85, y: 70}, {x: 88, y: 75}, {x: 82, y: 72}
  ];

  return (
    <div className="w-full h-full relative bg-[#1A1F2E]/50 rounded-lg overflow-hidden border border-white/5">
       <div className="absolute inset-0 flex items-center justify-center opacity-20">
         {/* Subtle grid background */}
         <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
       </div>

       {dots.map((dot, i) => (
         <motion.div
           key={i}
           className="absolute w-2 h-2 rounded-full"
           style={{ left: `${dot.x}%`, top: `${dot.y}%`, backgroundColor: Math.random() > 0.7 ? '#D4AF37' : '#374151' }}
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1, opacity: Math.random() * 0.5 + 0.3 }}
           transition={{ delay: i * 0.05, duration: 0.5 }}
           whileHover={{ scale: 2, backgroundColor: '#F4D03F', opacity: 1 }}
         />
       ))}

       {/* Active Pulse Markers */}
       <motion.div 
         className="absolute w-3 h-3 rounded-full bg-gold border-2 border-white/20 shadow-[0_0_15px_#D4AF37]"
         style={{ left: '22%', top: '35%', backgroundColor: '#D4AF37' }}
         animate={{ boxShadow: ['0 0 0 0 rgba(212,175,55,0.7)', '0 0 0 10px rgba(212,175,55,0)'] }}
         transition={{ duration: 2, repeat: Infinity }}
       />
       <motion.div 
         className="absolute w-3 h-3 rounded-full bg-gold border-2 border-white/20 shadow-[0_0_15px_#D4AF37]"
         style={{ left: '50%', top: '25%', backgroundColor: '#D4AF37' }}
         animate={{ boxShadow: ['0 0 0 0 rgba(212,175,55,0.7)', '0 0 0 10px rgba(212,175,55,0)'] }}
         transition={{ duration: 2, repeat: Infinity, delay: 1 }}
       />
    </div>
  );
}

export default WorldMap;
