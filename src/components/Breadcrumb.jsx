
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-[var(--text-secondary)] mb-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
      <NavLink 
        to="/dashboard" 
        className="flex items-center hover:text-[var(--accent-gold)] transition-colors"
      >
        <Home className="w-4 h-4" />
      </NavLink>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 mx-2 text-[var(--border-color)] shrink-0" />
            {isLast ? (
              <span className="font-medium text-[var(--text-primary)] pointer-events-none">
                {item.label}
              </span>
            ) : (
              <NavLink 
                to={item.path}
                className="hover:text-[var(--accent-gold)] transition-colors"
              >
                {item.label}
              </NavLink>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
