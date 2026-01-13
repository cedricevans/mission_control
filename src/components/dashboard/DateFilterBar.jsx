
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Filter, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CONTENT_PROVIDERS, PUBLISHERS } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';

const DateFilterBar = ({ onSearch, initialFilters = {}, embedded = false }) => {
  const [filters, setFilters] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    lockDates: false,
    filterStatus: 'active',
    division: 'all',
    advertiser: [],
    offerName: '',
    publisher: [],
    ...initialFilters
  });
  
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // State for expanded/collapsed view
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboardFilterExpanded');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem('dashboardFilterExpanded', JSON.stringify(newState));
  };

  const formatDateDisplay = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${s.toLocaleDateString('en-US', options)} - ${e.toLocaleDateString('en-US', options)}`;
  };

  const handlePreset = (type) => {
    const end = new Date();
    const start = new Date();

    switch (type) {
      case 'TODAY': break;
      case 'YEST':
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        break;
      case 'WEEK':
        start.setDate(start.getDate() - 7);
        break;
      case 'MTD':
        start.setDate(1);
        break;
      case 'LM': 
        start.setMonth(start.getMonth() - 1);
        start.setDate(1);
        end.setDate(0); 
        break;
      case 'YEAR':
         start.setMonth(0);
         start.setDate(1);
         break;
      default: break;
    }

    const newFilters = {
      ...filters,
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
    
    setFilters(newFilters);
    if (onSearch && !isMobileModalOpen) onSearch(newFilters); // Only auto-search on desktop
  };

  const handleSearchClick = () => {
    if (onSearch) onSearch(filters);
    setIsMobileModalOpen(false);
  };

  const MultiSelectMock = ({ placeholder, options, value = [], onChange }) => {
      const handleChange = (val) => {
          if (val === 'all') {
              onChange([]);
              return;
          }
          if (value.includes(val)) {
              onChange(value.filter(v => v !== val));
          } else {
              onChange([...value, val]);
          }
      };

      return (
        <Select value={value.length ? value[0] : ''} onValueChange={handleChange}>
            <SelectTrigger className="h-9 text-xs bg-[var(--input-bg)] border-[var(--border-color)]">
                <span className="truncate">
                    {value.length === 0 ? `× ${placeholder}` : `${value.length} selected`}
                </span>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {options.map(opt => (
                    <SelectItem key={opt} value={opt} className={cn(value.includes(opt) && "text-[var(--accent-gold)]")}>
                        {opt}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
      );
  };

  return (
    <>
      <div 
        className={cn(
            embedded
              ? "relative bg-[var(--card-bg)] backdrop-blur-md shadow-sm border-b border-[var(--border-color)] transition-all duration-300 w-full md:mt-4"
              : "relative md:sticky md:top-16 md:z-40 bg-[var(--card-bg)] backdrop-blur-md shadow-sm border-b border-[var(--border-color)] transition-all duration-300",
            embedded ? "px-4 md:px-6" : "-mx-6 px-6 w-[calc(100%+3rem)]",
            isExpanded ? "p-4 pt-2" : "py-2 px-4 pt-2"
        )}
      >
        
        {/* Toggle Button */}
        <div className="absolute top-2 right-2 md:top-3 md:right-4 z-50 hidden md:block">
             <button
               onClick={toggleExpand}
               className="group flex items-center justify-center w-8 h-8 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[#00D9FF] hover:bg-[#D4AF37] transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] hover:scale-110 active:scale-95"
               title={isExpanded ? "Collapse Filters" : "Expand Filters"}
               aria-label={isExpanded ? "Collapse Filters" : "Expand Filters"}
             >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-black transition-colors" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-black transition-colors" />
                )}
             </button>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsMobileModalOpen(true)}
              className="inline-flex items-center gap-2 text-[var(--accent-gold)] font-semibold hover:text-[#b8962e] transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter Menu
            </button>
          </div>
        </div>

        {/* Desktop View (>= 768px) */}
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="hidden md:block overflow-hidden"
                >
                    <div className="flex flex-col xl:flex-row gap-6 pb-4 border-b border-[var(--border-color)]/20 mb-4 pt-2">
                        {/* Date Controls */}
                        <div className="flex flex-col gap-2 min-w-[320px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Lock Dates</label>
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="radio" checked={filters.lockDates} onChange={() => setFilters({...filters, lockDates: true})} className="accent-[var(--accent-blue)]" />
                                        <span className="text-[10px] text-[var(--text-secondary)]">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="radio" checked={!filters.lockDates} onChange={() => setFilters({...filters, lockDates: false})} className="accent-[var(--accent-blue)]" />
                                        <span className="text-[10px] text-[var(--text-secondary)]">No</span>
                                    </label>
                                </div>
                                </div>
                            </div>

                            <div className="flex gap-2 items-center">
                                <div className="relative flex-1">
                                <Input 
                                    type="date" 
                                    value={filters.startDate}
                                    onChange={(e) => setFilters(f => ({...f, startDate: e.target.value}))}
                                    className="h-9 text-xs bg-[var(--input-bg)] text-[var(--text-primary)] font-medium border-[var(--border-color)] rounded-md" 
                                    disabled={filters.lockDates}
                                />
                                </div>
                                <div className="relative flex-1">
                                <Input 
                                    type="date" 
                                    value={filters.endDate}
                                    onChange={(e) => setFilters(f => ({...f, endDate: e.target.value}))}
                                    className="h-9 text-xs bg-[var(--input-bg)] text-[var(--text-primary)] font-medium border-[var(--border-color)] rounded-md" 
                                    disabled={filters.lockDates}
                                />
                                </div>
                            </div>
                            
                            {/* Presets */}
                            <div className="flex gap-1 mt-1">
                                {['TODAY', 'WEEK', 'MONTH', 'YEAR'].map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => handlePreset(preset)}
                                    className="flex-1 px-1 py-1 text-[10px] font-bold rounded bg-[var(--input-bg)] text-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-white transition-colors border border-[var(--border-color)] shadow-sm"
                                >
                                    {preset}
                                </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Divider */}
                        <div className="w-[1px] bg-[var(--border-color)] hidden xl:block mx-2" />

                        {/* Filters Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 flex-1 items-end">
                            <div className="flex flex-col gap-1 min-w-[120px]">
                                <label className="text-[10px] font-bold text-[var(--text-secondary)]">Filter Status</label>
                                <Select value={filters.filterStatus} onValueChange={(v) => setFilters({...filters, filterStatus: v})}>
                                        <SelectTrigger className="h-9 text-xs bg-[var(--input-bg)] border-[var(--border-color)]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-[var(--text-secondary)]">Division</label>
                                <Select value={filters.division} onValueChange={(v) => setFilters({...filters, division: v})}>
                                    <SelectTrigger className="h-9 text-xs bg-[var(--input-bg)] border-[var(--border-color)]"><SelectValue placeholder="All Divisions" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Divisions</SelectItem>
                                        <SelectItem value="edu">Education</SelectItem>
                                        <SelectItem value="fin">Finance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-[var(--text-secondary)]">Advertiser</label>
                                <MultiSelectMock 
                                    placeholder="All" 
                                    options={CONTENT_PROVIDERS} 
                                    value={filters.advertiser}
                                    onChange={(v) => setFilters({...filters, advertiser: v})}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-[var(--text-secondary)]">Offer Name</label>
                                <Input 
                                    placeholder="Search" 
                                    value={filters.offerName}
                                    onChange={(e) => setFilters({...filters, offerName: e.target.value})}
                                    className="h-9 text-xs bg-[var(--input-bg)] border-[var(--border-color)]"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-[var(--text-secondary)]">Publisher</label>
                                <MultiSelectMock 
                                    placeholder="All" 
                                    options={PUBLISHERS} 
                                    value={filters.publisher}
                                    onChange={(v) => setFilters({...filters, publisher: v})}
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end min-w-[100px]">
                            <Button 
                                onClick={handleSearchClick}
                                className="w-full h-9 bg-[var(--accent-gold)] hover:bg-[#b8962e] text-black font-bold text-xs uppercase tracking-wide rounded shadow-md transition-all"
                            >
                                SEARCH
                            </Button>
                        </div>
                    </div>
                    
                    {/* Desktop Info */}
                    <div className="flex items-center gap-2">
                        <div className="bg-[#333] text-white text-[10px] px-1.5 py-0.5 rounded flex items-center justify-center font-mono">
                            28
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] italic">
                            Showing data for: <span className="font-bold text-[var(--text-primary)]">{formatDateDisplay(filters.startDate, filters.endDate)}</span>
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Collapsed State Placeholder (Desktop) */}
        {!isExpanded && (
            <div className="hidden md:flex h-8 items-center">
                 {/* Only toggle button is strictly required by prompt, but adding minimal status indicator for better UX */}
                 <span className="text-xs text-[var(--text-secondary)] italic opacity-70">
                     Filters collapsed
                 </span>
            </div>
        )}

      </div>

      {/* Mobile Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileModalOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileModalOpen(false)}
                className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[90] bg-[var(--card-bg)] rounded-t-2xl shadow-2xl border-t border-[var(--border-color)] flex flex-col max-h-[90vh] overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileModalOpen(false)}>
                    <X className="w-5 h-5 text-[var(--text-secondary)]" />
                  </Button>
                </div>
                
                <div className="p-4 overflow-y-auto flex-1 space-y-6">
                  {/* Date Controls */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Date Range</label>
                    <div className="flex gap-2">
                      <Input 
                        type="date" 
                        value={filters.startDate}
                        onChange={(e) => setFilters(f => ({...f, startDate: e.target.value}))}
                        className="bg-[var(--input-bg)]"
                      />
                      <Input 
                        type="date" 
                        value={filters.endDate}
                        onChange={(e) => setFilters(f => ({...f, endDate: e.target.value}))}
                        className="bg-[var(--input-bg)]"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['TODAY', 'WEEK', 'MONTH', 'YEAR'].map((preset) => (
                         <button
                            key={preset}
                            onClick={() => handlePreset(preset)}
                            className="px-2 py-2 text-[10px] font-bold rounded bg-[var(--input-bg)] text-[var(--accent-blue)] border border-[var(--border-color)]"
                         >
                            {preset}
                         </button>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Status</label>
                     <Select value={filters.filterStatus} onValueChange={(v) => setFilters({...filters, filterStatus: v})}>
                          <SelectTrigger className="bg-[var(--input-bg)] border-[var(--border-color)]">
                              <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                    </Select>
                  </div>

                  {/* Advanced Collapsible */}
                  <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                     <button 
                        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        className="w-full flex items-center justify-between p-3 bg-[var(--secondary-bg)] hover:bg-[var(--hover-bg)] transition-colors"
                     >
                        <span className="text-xs font-bold text-[var(--text-primary)]">Advanced Filters</span>
                        {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                     </button>
                     
                     <AnimatePresence>
                       {isAdvancedOpen && (
                         <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                         >
                           <div className="p-3 space-y-4 bg-[var(--card-bg)] border-t border-[var(--border-color)]">
                              <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-[var(--text-secondary)]">Division</label>
                                  <Select value={filters.division} onValueChange={(v) => setFilters({...filters, division: v})}>
                                      <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="All" /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="all">All Divisions</SelectItem>
                                          <SelectItem value="edu">Education</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                              <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-[var(--text-secondary)]">Advertiser</label>
                                  <MultiSelectMock placeholder="All" options={CONTENT_PROVIDERS} value={filters.advertiser} onChange={(v) => setFilters({...filters, advertiser: v})} />
                              </div>
                              <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-[var(--text-secondary)]">Publisher</label>
                                  <MultiSelectMock placeholder="All" options={PUBLISHERS} value={filters.publisher} onChange={(v) => setFilters({...filters, publisher: v})} />
                              </div>
                              <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-[var(--text-secondary)]">Offer Name</label>
                                  <Input value={filters.offerName} onChange={(e) => setFilters({...filters, offerName: e.target.value})} className="h-9 text-xs" placeholder="Search..." />
                              </div>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </div>
                </div>
                
                <div className="p-4 border-t border-[var(--border-color)] bg-[var(--secondary-bg)]">
                   <Button onClick={handleSearchClick} className="w-full bg-[var(--accent-gold)] text-black font-bold h-11">
                      APPLY FILTERS
                   </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default DateFilterBar;
