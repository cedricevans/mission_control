
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLeads } from '@/lib/storage';
import { Users, TrendingUp, CheckCircle2, XCircle } from 'lucide-react';

const STATUSES = [
  { id: 'new', label: 'New', icon: Users, color: 'text-[var(--accent-blue)]', borderColor: 'border-[var(--accent-blue)]' },
  { id: 'contacted', label: 'Contacted', icon: TrendingUp, color: 'text-[var(--accent-gold)]', borderColor: 'border-[var(--accent-gold)]' },
  { id: 'qualified', label: 'Qualified', icon: CheckCircle2, color: 'text-[var(--accent-green)]', borderColor: 'border-[var(--accent-green)]' },
  { id: 'closed', label: 'Closed', icon: XCircle, color: 'text-[var(--accent-red)]', borderColor: 'border-[var(--accent-red)]' }
];

function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [pipelineData, setPipelineData] = useState({});

  useEffect(() => {
    const allLeads = getLeads();
    setLeads(allLeads);
    
    const grouped = {};
    STATUSES.forEach(status => {
      grouped[status.id] = allLeads.filter(lead => lead.status === status.id);
    });
    setPipelineData(grouped);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Sales Pipeline</h2>
        <div className="text-sm text-[var(--text-secondary)] font-medium">
          Total Leads: <span className="font-bold text-[var(--text-primary)]">{leads.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUSES.map(status => {
          const StatusIcon = status.icon;
          const statusLeads = pipelineData[status.id] || [];
          const totalValue = statusLeads.reduce((sum, lead) => sum + (lead.score || 0), 0);
          
          return (
            <Card key={status.id} className={`p-4 bg-[var(--card-bg)] border-t-4 ${status.borderColor} border-x border-b border-[var(--border-color)] shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-[var(--primary-bg)] border border-[var(--border-color)]`}>
                  <StatusIcon className={`w-5 h-5 ${status.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)]">{status.label}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)] font-bold text-[10px] px-1.5 py-0 h-5">
                      {statusLeads.length}
                    </Badge>
                    <span className="text-xs text-[var(--text-secondary)]">leads</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                {statusLeads.map(lead => (
                  <div key={lead.id} className="p-3 bg-[var(--primary-bg)] rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-blue)] transition-all group cursor-pointer shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] truncate transition-colors">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] truncate mt-0.5">{lead.email}</div>
                        {lead.company && (
                          <div className="text-xs text-[var(--text-secondary)] mt-1 italic">{lead.company}</div>
                        )}
                      </div>
                      <div className={`text-xs font-bold ${lead.score >= 50 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-gold)]'}`}>
                        {lead.score}
                      </div>
                    </div>
                    {lead.tags && lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {lead.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded text-[var(--text-secondary)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {statusLeads.length === 0 && (
                  <div className="text-center py-8 text-[var(--text-secondary)] text-sm font-medium italic border border-dashed border-[var(--border-color)] rounded-lg">
                    No leads in this stage
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)] flex justify-between">
                  <span>Total Score Impact:</span>
                  <span className="font-bold text-[var(--accent-gold)]">{totalValue}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Pipeline;
