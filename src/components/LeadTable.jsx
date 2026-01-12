import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Search, Download, Eye, Trash2, ArrowUpDown } from 'lucide-react';
import { getLeads, deleteLead } from '@/lib/storage';
import LeadDetailModal from '@/components/LeadDetailModal';
import PremiumCard from '@/components/PremiumCard';

function LeadTable({ compact = false, limit = null }) {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterAndSortLeads();
  }, [searchTerm, statusFilter, tagFilter, leads, sortConfig]);

  const loadLeads = () => {
    const allLeads = getLeads();
    setLeads(allLeads);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filterAndSortLeads = () => {
    let result = [...leads];

    if (searchTerm) {
      result = result.filter(lead =>
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    if (tagFilter !== 'all') {
      result = result.filter(lead => lead.tags?.includes(tagFilter));
    }

    // Sorting
    result.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle null/undefined
      if (!aValue) aValue = '';
      if (!bValue) bValue = '';
      
      // Handle strings case-insensitive
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    if (limit) {
      result = result.slice(0, limit);
    }

    setFilteredLeads(result);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Company', 'Status', 'Score', 'Created Date'],
      ...filteredLeads.map(lead => [
        lead.id,
        `${lead.firstName} ${lead.lastName}`,
        lead.email,
        lead.company || '',
        lead.status,
        lead.score,
        new Date(lead.createdAt).toLocaleDateString()
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "leads_export.csv";
    link.click();

    toast({
      title: "Export Initiated",
      description: "Your CSV file is downloading."
    });
  };

  const handleDelete = (e, leadId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this lead?")) {
       deleteLead(leadId);
       loadLeads();
       toast({ title: "Lead Deleted", description: "Record removed from database.", variant: "destructive" });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-[var(--accent-blue-dim)] text-[var(--accent-blue)] border-[var(--accent-blue)]/30',
      contacted: 'bg-[var(--accent-gold-dim)] text-[var(--accent-gold)] border-[var(--accent-gold)]/30',
      qualified: 'bg-[var(--accent-green-dim)] text-[var(--accent-green)] border-[var(--accent-green)]/30',
      closed: 'bg-[var(--accent-red-dim)] text-[var(--accent-red)] border-[var(--accent-red)]/30'
    };
    return colors[status] || 'bg-[var(--hover-bg)] text-[var(--text-secondary)] border-[var(--border-color)]';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-[var(--accent-green)]';
    if (score >= 50) return 'text-[var(--accent-gold)]';
    return 'text-[var(--accent-red)]';
  };

  return (
    <PremiumCard className="p-0 overflow-hidden" glow={!compact}>
      <div className="p-6 border-b border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">
              {compact ? 'Recent Activity' : 'Lead Database'}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium">{filteredLeads.length} records found</p>
          </div>
          
          {!compact && (
            <Button onClick={handleExportCSV} variant="outline" className="bg-transparent border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[var(--text-inverse)] font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>

        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <Input
                placeholder="Search by name, email, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 premium-input"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="premium-input">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="premium-input">
                <SelectValue placeholder="Filter Tag" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--primary-bg)]/80 text-[var(--text-primary)] text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="p-4 cursor-pointer hover:text-[var(--accent-gold)] transition-colors" onClick={() => handleSort('firstName')}>
                <div className="flex items-center gap-1">Lead Info <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              {!compact && (
                <th className="p-4 cursor-pointer hover:text-[var(--accent-gold)] transition-colors" onClick={() => handleSort('company')}>
                  <div className="flex items-center gap-1">Company <ArrowUpDown className="w-3 h-3" /></div>
                </th>
              )}
              <th className="p-4 cursor-pointer hover:text-[var(--accent-gold)] transition-colors" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="p-4 cursor-pointer hover:text-[var(--accent-gold)] transition-colors" onClick={() => handleSort('score')}>
                <div className="flex items-center gap-1">Score <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              {!compact && (
                <th className="p-4 text-[var(--text-primary)]">Tags</th>
              )}
              <th className="p-4 text-right text-[var(--text-primary)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-[var(--hover-bg)] transition-colors cursor-pointer group"
                  onClick={() => {
                    setSelectedLead(lead);
                    setShowDetail(true);
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary-bg)] border border-[var(--accent-gold)] flex items-center justify-center text-xs font-bold text-[var(--accent-gold)]">
                        {lead.firstName[0]}{lead.lastName[0]}
                      </div>
                      <div>
                        <div className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">{lead.firstName} {lead.lastName}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  {!compact && (
                    <td className="p-4 text-sm text-[var(--text-secondary)]">
                      {lead.company || <span className="text-[var(--text-secondary)] italic">--</span>}
                    </td>
                  )}
                  <td className="p-4">
                    <Badge variant="outline" className={`capitalize font-bold border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <div className="w-full bg-[var(--primary-bg)] rounded-full h-1.5 w-16 overflow-hidden border border-[var(--border-color)]">
                          <div 
                            className={`h-full ${getScoreColor(lead.score).replace('text-', 'bg-')}`} 
                            style={{ width: `${lead.score}%` }}
                          />
                       </div>
                       <span className={`text-xs font-bold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                    </div>
                  </td>
                  {!compact && (
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags?.slice(0, 2).map((tag, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-[var(--primary-bg)] text-[10px] text-[var(--text-secondary)] border border-[var(--border-color)] font-medium">
                            {tag}
                          </span>
                        ))}
                        {lead.tags?.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded bg-[var(--primary-bg)] text-[10px] text-[var(--text-secondary)] font-medium">
                            +{lead.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  <td className="p-4 text-right">
                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--text-primary)] hover:text-[var(--accent-blue)] hover:bg-[var(--accent-blue-dim)]">
                           <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-[var(--text-primary)] hover:text-[var(--accent-red)] hover:bg-[var(--accent-red-dim)]"
                          onClick={(e) => handleDelete(e, lead.id)}
                        >
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={compact ? 4 : 6} className="p-8 text-center text-[var(--text-secondary)] font-medium">
                  No data found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      {!compact && filteredLeads.length > 0 && (
        <div className="p-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
           <span>Showing 1-{filteredLeads.length} of {filteredLeads.length}</span>
           <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled className="text-[var(--text-secondary)] hover:bg-transparent">Previous</Button>
              <Button variant="ghost" size="sm" disabled className="text-[var(--text-secondary)] hover:bg-transparent">Next</Button>
           </div>
        </div>
      )}

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          isOpen={showDetail}
          onClose={() => {
            setShowDetail(false);
            setSelectedLead(null);
            loadLeads();
          }}
        />
      )}
    </PremiumCard>
  );
}

export default LeadTable;