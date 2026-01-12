
import React, { useState, useMemo } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Receipt, Download, Send, Home, Filter, Plus, 
  CheckCircle, Clock, AlertCircle, MoreVertical, 
  FileText, ArrowUpRight, Search, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SCHOOL_PARTNERS } from '@/lib/storage';
import { cn } from '@/lib/utils';

// Mock Data Generator for Invoices
const generateMockInvoices = () => {
  const statuses = ['Paid', 'Pending', 'Draft', 'Overdue'];
  return Array.from({ length: 25 }, (_, i) => ({
    id: `INV-2026-${String(i + 1).padStart(3, '0')}`,
    partner: SCHOOL_PARTNERS[i % SCHOOL_PARTNERS.length],
    date: new Date(2026, 0, 5 - Math.floor(i / 3)).toLocaleDateString(),
    dueDate: new Date(2026, 1, 5 - Math.floor(i / 3)).toLocaleDateString(),
    leads: 10 + (i * 2),
    students: 1 + Math.floor(i / 4),
    amount: 1500 + (i * 250),
    status: statuses[i % 4],
    type: i % 2 === 0 ? 'Commission' : 'Service Fee'
  }));
};

function PartnerInvoices() {
  const [invoices, setInvoices] = useState(generateMockInvoices());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  
  const [filters, setFilters] = useState({
    search: '',
    partner: 'all',
    status: 'all',
    type: 'all'
  });

  // Calculate Summaries
  const summaries = useMemo(() => {
    return {
      totalInvoiced: invoices.reduce((acc, curr) => acc + curr.amount, 0),
      totalPaid: invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0),
      totalPending: invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((acc, curr) => acc + curr.amount, 0),
    };
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchSearch = inv.partner.toLowerCase().includes(filters.search.toLowerCase()) || 
                          inv.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchPartner = filters.partner === 'all' || inv.partner === filters.partner;
      const matchStatus = filters.status === 'all' || inv.status === filters.status;
      const matchType = filters.type === 'all' || inv.type === filters.type;
      return matchSearch && matchPartner && matchStatus && matchType;
    });
  }, [invoices, filters]);

  const toggleSelect = (id) => {
     if(selectedInvoices.includes(id)) {
        setSelectedInvoices(selectedInvoices.filter(i => i !== id));
     } else {
        setSelectedInvoices([...selectedInvoices, id]);
     }
  };

  const selectAll = () => {
     if (selectedInvoices.length === filteredInvoices.length) {
        setSelectedInvoices([]);
     } else {
        setSelectedInvoices(filteredInvoices.map(i => i.id));
     }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-6 min-h-screen pb-20">
       {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link to="/" className="hover:text-[var(--accent-gold)] flex items-center gap-1">
          <Home className="w-3 h-3" /> Dashboard
        </Link>
        <span className="opacity-50">/</span>
        <span className="text-[var(--text-primary)]">Invoices</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">Partner Invoices</h1>
            <p className="text-[var(--text-secondary)] mt-1">Manage billing, track payments, and generate statements</p>
         </div>
         <Button className="rounded-xl bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)]/90 shadow-[0_0_15px_var(--accent-gold-dim)]">
             <Plus className="w-4 h-4 mr-2" /> Create Invoice
         </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <PremiumCard className="p-6 relative overflow-hidden flex items-center justify-between group">
            <div>
               <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Total Invoiced</p>
               <h3 className="text-3xl font-bold text-[var(--text-primary)] mt-1">{formatCurrency(summaries.totalInvoiced)}</h3>
            </div>
            <div className="p-3 bg-[var(--accent-blue)]/10 rounded-xl text-[var(--accent-blue)]">
               <FileText className="w-6 h-6" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-blue)] to-transparent" />
         </PremiumCard>

         <PremiumCard className="p-6 relative overflow-hidden flex items-center justify-between group">
            <div>
               <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Total Paid</p>
               <h3 className="text-3xl font-bold text-[var(--text-primary)] mt-1">{formatCurrency(summaries.totalPaid)}</h3>
            </div>
            <div className="p-3 bg-[var(--accent-green)]/10 rounded-xl text-[var(--accent-green)]">
               <CheckCircle className="w-6 h-6" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-green)] to-transparent" />
         </PremiumCard>

         <PremiumCard className="p-6 relative overflow-hidden flex items-center justify-between group">
            <div>
               <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Outstanding</p>
               <h3 className="text-3xl font-bold text-[var(--accent-gold)] mt-1">{formatCurrency(summaries.totalPending)}</h3>
            </div>
            <div className="p-3 bg-[var(--accent-gold)]/10 rounded-xl text-[var(--accent-gold)]">
               <Clock className="w-6 h-6" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-gold)] to-transparent" />
         </PremiumCard>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4">
         <div className="flex justify-between items-center bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--border-color)] max-w-full overflow-x-auto">
             <div className="flex items-center p-1">
               <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
                  <input 
                     placeholder="Search invoices..." 
                     className="pl-9 pr-4 py-2 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none w-48 md:w-64"
                     value={filters.search}
                     onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                  />
               </div>
               <div className="h-6 w-px bg-[var(--border-color)] mx-2" />
               <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={cn("rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]", isFilterOpen && "bg-[var(--secondary-bg)] text-[var(--accent-gold)]")}
               >
                  <Filter className="w-4 h-4 mr-2" /> Filter
               </Button>
             </div>
             
             {/* Bulk Actions (Visible when selected) */}
             {selectedInvoices.length > 0 && (
                <div className="flex items-center gap-2 px-3 animate-in fade-in slide-in-from-right-4">
                   <span className="text-xs font-medium text-[var(--text-primary)] whitespace-nowrap">{selectedInvoices.length} selected</span>
                   <Button size="sm" variant="secondary" className="h-8 rounded-lg text-xs">Approve</Button>
                   <Button size="sm" variant="secondary" className="h-8 rounded-lg text-xs">Export</Button>
                </div>
             )}
         </div>

         {/* Collapsible Filters */}
         {isFilterOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[var(--secondary-bg)]/50 border border-[var(--border-color)] rounded-xl animate-in slide-in-from-top-2">
               <Select value={filters.partner} onValueChange={(v) => setFilters(prev => ({...prev, partner: v}))}>
                  <SelectTrigger className="bg-[var(--card-bg)] rounded-xl border-[var(--border-color)]"><SelectValue placeholder="Partner" /></SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Partners</SelectItem>
                     {SCHOOL_PARTNERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
               </Select>
               <Select value={filters.status} onValueChange={(v) => setFilters(prev => ({...prev, status: v}))}>
                  <SelectTrigger className="bg-[var(--card-bg)] rounded-xl border-[var(--border-color)]"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Statuses</SelectItem>
                     <SelectItem value="Paid">Paid</SelectItem>
                     <SelectItem value="Pending">Pending</SelectItem>
                     <SelectItem value="Overdue">Overdue</SelectItem>
                     <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
               </Select>
               <Select value={filters.type} onValueChange={(v) => setFilters(prev => ({...prev, type: v}))}>
                  <SelectTrigger className="bg-[var(--card-bg)] rounded-xl border-[var(--border-color)]"><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Types</SelectItem>
                     <SelectItem value="Commission">Commission</SelectItem>
                     <SelectItem value="Service Fee">Service Fee</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         )}
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
         {/* Table Header - Hidden on mobile, styled for desktop */}
         <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            <div className="w-5">
               <input type="checkbox" className="rounded border-[var(--border-color)] bg-transparent" onChange={selectAll} checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0} />
            </div>
            <div>Invoice Details</div>
            <div>Partner</div>
            <div>Amount</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
         </div>

         {filteredInvoices.length > 0 ? (
            filteredInvoices.map((inv) => (
               <div 
                  key={inv.id} 
                  className={cn(
                     "group relative flex flex-col md:grid md:grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-4 rounded-xl border transition-all duration-200",
                     selectedInvoices.includes(inv.id) 
                        ? "bg-[var(--accent-gold)]/5 border-[var(--accent-gold)]" 
                        : "bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[var(--border-strong)]"
                  )}
               >
                  {/* Checkbox */}
                  <div className="absolute top-4 left-4 md:static md:w-5" onClick={(e) => e.stopPropagation()}>
                     <input 
                        type="checkbox" 
                        checked={selectedInvoices.includes(inv.id)}
                        onChange={() => toggleSelect(inv.id)}
                        className="rounded border-[var(--border-color)] bg-[var(--input-bg)] accent-[var(--accent-gold)] h-4 w-4 cursor-pointer" 
                     />
                  </div>

                  {/* ID & Date */}
                  <div className="pl-8 md:pl-0 w-full">
                     <div className="font-mono font-bold text-[var(--text-primary)]">{inv.id}</div>
                     <div className="text-xs text-[var(--text-secondary)] mt-0.5">Issued: {inv.date}</div>
                  </div>

                  {/* Partner */}
                  <div className="pl-8 md:pl-0 w-full">
                     <div className="text-sm font-medium text-[var(--text-primary)]">{inv.partner}</div>
                     <div className="text-xs text-[var(--text-secondary)]">{inv.type}</div>
                  </div>

                  {/* Amount */}
                  <div className="pl-8 md:pl-0 w-full">
                     <div className="font-mono font-bold text-[var(--text-primary)]">{formatCurrency(inv.amount)}</div>
                     <div className="text-xs text-[var(--text-secondary)]">{inv.leads} leads included</div>
                  </div>

                  {/* Status */}
                  <div className="pl-8 md:pl-0 w-full">
                     <Badge variant="outline" className={cn(
                        "rounded-lg px-2.5 py-1 border-transparent",
                        inv.status === 'Paid' ? "bg-green-500/10 text-green-500" :
                        inv.status === 'Pending' ? "bg-blue-500/10 text-blue-500" :
                        inv.status === 'Overdue' ? "bg-red-500/10 text-red-500" :
                        "bg-gray-500/10 text-gray-500"
                     )}>
                        {inv.status}
                     </Badge>
                  </div>

                  {/* Actions */}
                  <div className="pl-8 md:pl-0 w-full md:w-auto flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                     <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[var(--secondary-bg)]">
                        <Download className="w-4 h-4 text-[var(--text-secondary)]" />
                     </Button>
                     <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[var(--secondary-bg)]">
                        <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)]" />
                     </Button>
                     <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[var(--secondary-bg)] md:hidden">
                        <MoreVertical className="w-4 h-4 text-[var(--text-secondary)]" />
                     </Button>
                  </div>
               </div>
            ))
         ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] border-dashed">
               <Receipt className="w-12 h-12 text-[var(--text-secondary)] mb-4 opacity-50" />
               <p className="text-[var(--text-primary)] font-medium">No invoices found</p>
               <p className="text-sm text-[var(--text-secondary)]">Try adjusting your filters</p>
               <Button 
                  variant="link" 
                  className="text-[var(--accent-gold)] mt-2"
                  onClick={() => setFilters({ search: '', partner: 'all', status: 'all', type: 'all' })}
               >
                  Clear all filters
               </Button>
            </div>
         )}
      </div>
    </div>
  );
}

export default PartnerInvoices;
