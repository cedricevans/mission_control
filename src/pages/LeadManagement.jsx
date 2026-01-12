import React, { useState, useEffect } from 'react';
import { getFilteredLeads, SCHOOL_PARTNERS, PROGRAMS, LEAD_SOURCES, VALIDITY_STATUSES, CONVERSION_STAGES, CONTENT_PROVIDERS, PUBLISHERS } from '@/lib/storage';
import PremiumCard from '@/components/PremiumCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, Eye, Edit } from 'lucide-react';
import LeadDetailModal from '@/components/LeadDetailModal';

function LeadManagement() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    schoolPartner: 'all',
    program: 'all',
    leadSource: 'all',
    validityStatus: 'all',
    conversionStage: 'all',
    dateRange: { from: null, to: null }
  });

  useEffect(() => {
    // Simulate fetch
    const data = getFilteredLeads(filters);
    setLeads(data);
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-[var(--text-primary)]">Lead Management</h2>
           <p className="text-sm text-[var(--text-secondary)]">Process student inquiries and applications</p>
        </div>
        <Button className="bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)]/90">
           <Download className="w-4 h-4 mr-2" /> Export Data
        </Button>
      </div>

      {/* Filters */}
      <PremiumCard className="p-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
               <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
               <Input 
                 placeholder="Search student..." 
                 className="pl-9 premium-input"
                 value={filters.search}
                 onChange={e => setFilters({...filters, search: e.target.value})}
               />
            </div>
            
            <Select value={filters.schoolPartner} onValueChange={v => setFilters({...filters, schoolPartner: v})}>
               <SelectTrigger className="premium-input"><SelectValue placeholder="School Partner" /></SelectTrigger>
               <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                  <SelectItem value="all">All Schools</SelectItem>
                  {SCHOOL_PARTNERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
               </SelectContent>
            </Select>

            <Select value={filters.program} onValueChange={v => setFilters({...filters, program: v})}>
               <SelectTrigger className="premium-input"><SelectValue placeholder="Program" /></SelectTrigger>
               <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                  <SelectItem value="all">All Programs</SelectItem>
                  {PROGRAMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
               </SelectContent>
            </Select>

            <Select value={filters.validityStatus} onValueChange={v => setFilters({...filters, validityStatus: v})}>
               <SelectTrigger className="premium-input"><SelectValue placeholder="Status" /></SelectTrigger>
               <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                  <SelectItem value="all">All Statuses</SelectItem>
                  {VALIDITY_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
               </SelectContent>
            </Select>
         </div>
      </PremiumCard>

      {/* Table */}
      <PremiumCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
              <thead className="bg-[var(--primary-bg)] text-[var(--text-secondary)] font-medium uppercase text-xs">
                 <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">School & Program</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Validity</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                 {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-[var(--hover-bg)] transition-colors">
                       <td className="p-4">
                          <div className="font-bold text-[var(--text-primary)]">{lead.name}</div>
                          <div className="text-[10px] text-[var(--text-secondary)]">{lead.email}</div>
                       </td>
                       <td className="p-4">
                          <div className="text-[var(--text-primary)]">{lead.schoolPartner}</div>
                          <div className="text-[10px] text-[var(--text-secondary)]">{lead.program}</div>
                       </td>
                       <td className="p-4">
                          <Badge variant="outline" className="border-[var(--border-color)] text-[var(--text-secondary)] capitalize">
                             {lead.leadSource}
                          </Badge>
                       </td>
                       <td className="p-4">
                          <Badge className={
                             lead.validityStatus === 'Valid' ? 'bg-green-500/20 text-green-500' : 
                             lead.validityStatus === 'Accepted' ? 'bg-blue-500/20 text-blue-500' :
                             'bg-red-500/20 text-red-500'
                          }>
                             {lead.validityStatus}
                          </Badge>
                       </td>
                       <td className="p-4 text-[var(--text-primary)]">
                          {lead.conversionStage}
                       </td>
                       <td className="p-4 text-right">
                          <Button 
                             size="icon" variant="ghost" 
                             onClick={() => setSelectedLead(lead)}
                             className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)]"
                          >
                             <Edit className="w-4 h-4" />
                          </Button>
                       </td>
                    </tr>
                 ))}
                 {leads.length === 0 && (
                    <tr>
                       <td colSpan={6} className="p-8 text-center text-[var(--text-secondary)]">No leads found matching criteria.</td>
                    </tr>
                 )}
              </tbody>
           </table>
        </div>
      </PremiumCard>
      
      {selectedLead && (
         <LeadDetailModal lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
}

export default LeadManagement;