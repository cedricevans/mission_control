
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, Lock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HBCU_SCHOOLS, CONTENT_PROVIDERS, PUBLISHERS } from '@/lib/storage';
import PremiumCard from '@/components/PremiumCard';

const FilterSection = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-09',
    lockDates: false,
    status: 'active',
    division: 'all',
    schoolPartner: 'all',
    contentProvider: 'all',
    publisher: 'all',
    offerName: ''
  });

  const handlePreset = (days) => {
    // Mock date logic for prototype
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    setFilters(prev => ({
        ...prev,
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0]
    }));
  };

  const handleSearch = () => {
    if (onSearch) onSearch(filters);
  };

  // Mock Multi-select style trigger component
  const MultiSelectTrigger = ({ placeholder, count = 0 }) => (
    <div className="flex h-10 w-full items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-primary)] cursor-pointer hover:border-[var(--accent-gold)] transition-colors">
       <span className={count > 0 ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>
          {count > 0 ? `${count} Selected` : placeholder}
       </span>
       <span className="text-[10px] opacity-50">▼</span>
    </div>
  );

  return (
    <PremiumCard className="p-4 md:p-6 mb-6 bg-[var(--card-bg)] shadow-lg rounded-2xl border-[var(--border-color)]">
      {/* Top Row: Date Controls */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6 pb-6 border-b border-[var(--border-color)]">
        
        {/* Date Inputs */}
        <div className="flex flex-col gap-2 min-w-[300px]">
           <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Date Range</label>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-[var(--text-secondary)]">Lock Dates</span>
                 <Switch 
                    checked={filters.lockDates} 
                    onCheckedChange={(c) => setFilters(f => ({...f, lockDates: c}))} 
                    className="scale-75"
                 />
              </div>
           </div>
           <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                 <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
                 <Input 
                    type="date" 
                    value={filters.startDate}
                    onChange={(e) => setFilters(f => ({...f, startDate: e.target.value}))}
                    className="pl-9 rounded-xl border-[var(--border-color)]" 
                 />
              </div>
              <span className="text-[var(--text-secondary)]">-</span>
              <div className="relative flex-1">
                 <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
                 <Input 
                    type="date" 
                    value={filters.endDate}
                    onChange={(e) => setFilters(f => ({...f, endDate: e.target.value}))}
                    className="pl-9 rounded-xl border-[var(--border-color)]" 
                 />
              </div>
           </div>
           
           {/* Presets */}
           <div className="flex gap-1 mt-2 overflow-x-auto pb-1 custom-scrollbar">
              {['TODAY', 'YEST', 'WEEK', 'MTD', 'LM'].map((preset) => (
                 <button
                    key={preset}
                    onClick={() => handlePreset(preset === 'TODAY' ? 0 : preset === 'YEST' ? 1 : 7)}
                    className="px-3 py-1 text-[10px] font-bold rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--accent-gold)] hover:text-black transition-colors whitespace-nowrap"
                 >
                    {preset}
                 </button>
              ))}
           </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
           {/* Status */}
           <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Filter Status</label>
              <Select value={filters.status} onValueChange={(v) => setFilters(f => ({...f, status: v}))}>
                 <SelectTrigger className="rounded-xl"><SelectValue placeholder="Status" /></SelectTrigger>
                 <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                 </SelectContent>
              </Select>
           </div>

           {/* Division */}
           <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Division</label>
              <Select value={filters.division} onValueChange={(v) => setFilters(f => ({...f, division: v}))}>
                 <SelectTrigger className="rounded-xl"><SelectValue placeholder="All Divisions" /></SelectTrigger>
                 <SelectContent>
                    <SelectItem value="all">All Divisions</SelectItem>
                    <SelectItem value="edu">Education</SelectItem>
                    <SelectItem value="fin">Finance</SelectItem>
                 </SelectContent>
              </Select>
           </div>
           
           {/* Schools (Mock Multi) */}
           <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--accent-red)]">Schools</label>
              <Select value={filters.schoolPartner} onValueChange={(v) => setFilters(f => ({...f, schoolPartner: v}))}>
                 <SelectTrigger className="rounded-xl"><SelectValue placeholder="All Schools" /></SelectTrigger>
                 <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    {HBCU_SCHOOLS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                 </SelectContent>
              </Select>
           </div>

           {/* Advertiser/Offer Name */}
           <div className="space-y-1">
               <label className="text-xs font-semibold text-[var(--text-secondary)]">Offer Name (Internal)</label>
               <div className="relative">
                  <Input 
                     placeholder="× All Offers" 
                     className="rounded-xl pr-8" 
                     value={filters.offerName}
                     onChange={(e) => setFilters(f => ({...f, offerName: e.target.value}))}
                  />
                  {filters.offerName && (
                     <button onClick={() => setFilters(f => ({...f, offerName: ''}))} className="absolute right-3 top-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                        <X className="w-4 h-4" />
                     </button>
                  )}
               </div>
           </div>
           
           {/* Content Provider */}
           <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--accent-red)]">Content Provider</label>
              <Select value={filters.contentProvider} onValueChange={(v) => setFilters(f => ({...f, contentProvider: v}))}>
                 <SelectTrigger className="rounded-xl"><SelectValue placeholder="All Providers" /></SelectTrigger>
                 <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    {CONTENT_PROVIDERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                 </SelectContent>
              </Select>
           </div>

           {/* Publisher */}
           <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--accent-red)]">Publisher</label>
              <Select value={filters.publisher} onValueChange={(v) => setFilters(f => ({...f, publisher: v}))}>
                 <SelectTrigger className="rounded-xl"><SelectValue placeholder="All Publishers" /></SelectTrigger>
                 <SelectContent>
                    <SelectItem value="all">All Publishers</SelectItem>
                    {PUBLISHERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                 </SelectContent>
              </Select>
           </div>

           {/* Search Button */}
           <div className="space-y-1 flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full rounded-xl bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90 shadow-[0_4px_10px_rgba(0,217,255,0.3)] font-bold tracking-wide"
              >
                 <Search className="w-4 h-4 mr-2" />
                 SEARCH
              </Button>
           </div>
        </div>
      </div>
    </PremiumCard>
  );
};

export default FilterSection;
