
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FilterGroup = ({ title, options, selected, onChange, type = 'checkbox' }) => {
  const handleSelectAll = () => {
    onChange(options.map(o => o.id));
  };
  const handleUnselectAll = () => {
    onChange([]);
  };

  const toggleOption = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const setSingleOption = (id) => {
      onChange([id]);
  }

  return (
    <div className="bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col h-full">
      <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
         {title}
         <span className="h-px flex-1 bg-[var(--border-color)]" />
      </h4>
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
         {options.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
               {type === 'checkbox' ? (
                   <Checkbox 
                      id={`filter-${opt.id}`} 
                      checked={selected.includes(opt.id)}
                      onCheckedChange={() => toggleOption(opt.id)}
                   />
               ) : (
                   <div 
                      onClick={() => setSingleOption(opt.id)}
                      className={cn(
                          "w-4 h-4 rounded-full border cursor-pointer flex items-center justify-center",
                          selected.includes(opt.id) ? "border-[var(--accent-blue)]" : "border-[var(--text-secondary)]"
                      )}
                   >
                       {selected.includes(opt.id) && <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)]" />}
                   </div>
               )}
               <label 
                  htmlFor={`filter-${opt.id}`} 
                  className="text-sm text-[var(--text-primary)] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
               >
                  {opt.label}
               </label>
            </div>
         ))}
      </div>

      {type === 'checkbox' && (
          <div className="mt-auto pt-2 flex gap-2">
             <Button variant="outline" size="sm" onClick={handleSelectAll} className="h-6 text-[10px] px-2 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border-transparent hover:bg-[var(--accent-blue)]/20">
                SELECT ALL
             </Button>
             <Button variant="outline" size="sm" onClick={handleUnselectAll} className="h-6 text-[10px] px-2 rounded bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] border-transparent hover:bg-[var(--text-secondary)]/20">
                UNSELECT
             </Button>
          </div>
      )}
    </div>
  );
};

const CheckboxFilters = () => {
  const [filters, setFilters] = useState({
     mediaType: ['call_center', 'non_call_center'],
     offerType: ['int_shared', 'int_warm', 'ext_shared'],
     campaignType: ['host_post', 'portal', 'api'],
     estimatedScrub: ['no'],
     graphBreakdown: ['daily']
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
       <FilterGroup 
          title="Media Type"
          options={[
             { id: 'call_center', label: 'Call Center' },
             { id: 'non_call_center', label: 'Non Call Center' }
          ]}
          selected={filters.mediaType}
          onChange={(val) => setFilters(f => ({...f, mediaType: val}))}
       />
       
       <FilterGroup 
          title="Offer Type"
          options={[
             { id: 'int_shared', label: 'Internal Shared' },
             { id: 'int_warm', label: 'Internal Warm Transfer' },
             { id: 'ext_shared', label: 'External Shared' },
             { id: 'ext_warm', label: 'External Warm Transfer' },
             { id: 'int_excl', label: 'Internal Exclusive' },
             { id: 'ext_excl', label: 'External Exclusive' }
          ]}
          selected={filters.offerType}
          onChange={(val) => setFilters(f => ({...f, offerType: val}))}
       />

       <FilterGroup 
          title="Campaign Type"
          options={[
             { id: 'host_post', label: 'Host & Post' },
             { id: 'portal', label: 'Call Center Portal' },
             { id: 'api', label: 'API' }
          ]}
          selected={filters.campaignType}
          onChange={(val) => setFilters(f => ({...f, campaignType: val}))}
       />

       <FilterGroup 
          title="Estimated Scrub"
          type="radio"
          options={[
             { id: 'yes', label: 'Yes' },
             { id: 'no', label: 'No' }
          ]}
          selected={filters.estimatedScrub}
          onChange={(val) => setFilters(f => ({...f, estimatedScrub: val}))}
       />

       <FilterGroup 
          title="Graph Breakdown"
          type="radio"
          options={[
             { id: 'daily', label: 'Daily' },
             { id: 'hourly', label: 'Hourly' }
          ]}
          selected={filters.graphBreakdown}
          onChange={(val) => setFilters(f => ({...f, graphBreakdown: val}))}
       />
    </div>
  );
};

export default CheckboxFilters;
