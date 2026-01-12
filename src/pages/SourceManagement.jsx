
import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import { cn } from '@/lib/utils';

// Sub-components for tabs
const PublishersTab = () => (
  <div className="p-4 space-y-4">
    <h3 className="text-xl font-bold">Publisher Partners</h3>
    <p className="text-[var(--text-secondary)]">Manage relationships with lead generation publishers.</p>
    {/* Placeholder Table */}
    <div className="border border-[var(--border-color)] rounded-lg p-8 text-center text-[var(--text-secondary)]">
       Publisher Management Table Placeholder
    </div>
  </div>
);

const ProvidersTab = () => (
  <div className="p-4 space-y-4">
    <h3 className="text-xl font-bold">Content Providers</h3>
    <p className="text-[var(--text-secondary)]">Manage external content creators and providers.</p>
    <div className="border border-[var(--border-color)] rounded-lg p-8 text-center text-[var(--text-secondary)]">
       Provider Management Table Placeholder
    </div>
  </div>
);

const ContentTab = () => (
  <div className="p-4 space-y-4">
    <h3 className="text-xl font-bold">Content Library</h3>
    <p className="text-[var(--text-secondary)]">Manage articles, videos, and resources.</p>
    <div className="border border-[var(--border-color)] rounded-lg p-8 text-center text-[var(--text-secondary)]">
       Content Management Table Placeholder
    </div>
  </div>
);

function SourceManagement() {
  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Source Management</h1>
          <p className="text-[var(--text-secondary)]">Manage all lead and content sources</p>
       </div>

       <PremiumCard className="overflow-hidden p-0 min-h-[500px]">
          <div className="border-b border-[var(--border-color)]">
             <nav className="flex">
                {[
                   { path: 'publishers', label: 'Publishers' },
                   { path: 'providers', label: 'Providers' },
                   { path: 'content', label: 'Content' }
                ].map(tab => (
                   <NavLink 
                      key={tab.path}
                      to={tab.path}
                      className={({ isActive }) => cn(
                         "px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                         isActive 
                            ? "border-[var(--accent-gold)] text-[var(--accent-gold)] bg-[var(--accent-gold)]/5" 
                            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                   >
                      {tab.label}
                   </NavLink>
                ))}
             </nav>
          </div>
          
          <Routes>
             <Route path="/" element={<Navigate to="publishers" replace />} />
             <Route path="publishers" element={<PublishersTab />} />
             <Route path="providers" element={<ProvidersTab />} />
             <Route path="content" element={<ContentTab />} />
          </Routes>
       </PremiumCard>
    </div>
  );
}

export default SourceManagement;
