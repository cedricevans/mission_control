
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { getLeads, updateLead, addActivity } from '@/lib/storage';
import { Phone, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

function CallQueue() {
  const [queue, setQueue] = useState([]);
  const [activeCall, setActiveCall] = useState(null);
  const [callStartTime, setCallStartTime] = useState(null);
  const [checkedOut, setCheckedOut] = useState([]);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = () => {
    const allLeads = getLeads();
    const callableLeads = allLeads.filter(lead => 
      lead.status === 'new' || lead.status === 'contacted'
    ).sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 2;
      const bPriority = priorityOrder[b.priority] || 2;
      if (aPriority !== bPriority) return bPriority - aPriority;
      return (b.score || 0) - (a.score || 0);
    });
    setQueue(callableLeads);
  };

  const handleCheckOut = (lead) => {
    setActiveCall(lead);
    setCallStartTime(new Date());
    setCheckedOut([...checkedOut, lead.id]);
    toast({
      title: "Lead Checked Out",
      description: `You are now calling ${lead.firstName} ${lead.lastName}`,
      className: "bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--accent-blue)]"
    });
  };

  const handleCallComplete = (outcome) => {
    if (!activeCall) return;

    const duration = Math.floor((new Date() - callStartTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    updateLead(activeCall.id, {
      ...activeCall,
      status: outcome === 'qualified' ? 'qualified' : 'contacted',
      lastCalled: new Date().toISOString()
    });

    addActivity(activeCall.id, 'call', `Call completed - ${outcome} (${minutes}m ${seconds}s)`);

    toast({
      title: "Call Logged",
      description: `Call marked as ${outcome}. Duration: ${minutes}m ${seconds}s`,
      className: "bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--accent-green)]"
    });

    setActiveCall(null);
    setCallStartTime(null);
    loadQueue();
  };

  const handleSkip = () => {
    if (!activeCall) return;
    addActivity(activeCall.id, 'call', 'Call skipped');
    setActiveCall(null);
    setCallStartTime(null);
    toast({
      title: "Lead Skipped",
      description: "Lead returned to queue",
      className: "bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--accent-red)]"
    });
  };

  const getCallDuration = () => {
    if (!callStartTime) return '0:00';
    const duration = Math.floor((new Date() - callStartTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const availableLeads = queue.filter(lead => !checkedOut.includes(lead.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Call Queue</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[var(--text-secondary)] font-medium">
            Available: <span className="font-bold text-[var(--text-primary)]">{availableLeads.length}</span>
          </div>
          <div className="text-sm text-[var(--text-secondary)] font-medium">
            In Progress: <span className="font-bold text-[var(--accent-gold)]">{activeCall ? 1 : 0}</span>
          </div>
        </div>
      </div>

      {activeCall && (
        <Card className="p-6 border-2 border-[var(--accent-blue)] bg-[var(--card-bg)] shadow-[0_0_20px_var(--accent-blue-dim)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-[var(--accent-blue)] animate-pulse" />
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Active Call</h3>
              </div>
              <div className="text-sm text-[var(--accent-blue)] font-mono font-bold tracking-wider">Duration: {getCallDuration()}</div>
            </div>
            <Badge className="bg-[var(--accent-blue-dim)] text-[var(--accent-blue)] border border-[var(--accent-blue)]/50 animate-pulse">In Progress</Badge>
          </div>

          <div className="bg-[var(--primary-bg)] p-4 rounded-lg mb-4 border border-[var(--border-color)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-wider mb-1">Contact</div>
                <div className="font-bold text-[var(--text-primary)] text-lg">
                  {activeCall.firstName} {activeCall.lastName}
                </div>
                <div className="text-sm text-[var(--text-secondary)] mt-1">{activeCall.email}</div>
                <div className="text-sm text-[var(--accent-blue)] font-semibold">{activeCall.phone}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-wider mb-1">Details</div>
                {activeCall.company && (
                  <div className="text-sm text-[var(--text-primary)] font-medium">{activeCall.company}</div>
                )}
                {activeCall.jobTitle && (
                  <div className="text-sm text-[var(--text-secondary)]">{activeCall.jobTitle}</div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="border-[var(--accent-gold)] text-[var(--accent-gold)]">Score: {activeCall.score}</Badge>
                  {activeCall.source && (
                    <Badge variant="outline" className="border-[var(--border-color)] text-[var(--text-secondary)]">{activeCall.source}</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={() => handleCallComplete('qualified')}
              className="flex items-center justify-center gap-2 bg-[var(--accent-green)] text-[var(--text-inverse)] font-bold hover:bg-[var(--accent-green)]/90 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Qualified
            </Button>
            <Button
              onClick={() => handleCallComplete('not-interested')}
              variant="outline"
              className="flex items-center justify-center gap-2 border-[var(--accent-red)] text-[var(--accent-red)] hover:bg-[var(--accent-red-dim)]"
            >
              <XCircle className="w-4 h-4" />
              Not Interested
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="flex items-center justify-center gap-2 border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--hover-bg)]"
            >
              <ArrowRight className="w-4 h-4" />
              Skip
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)]">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Available Leads</h3>
        <div className="space-y-3">
          {availableLeads.slice(0, 20).map(lead => (
            <div
              key={lead.id}
              className="flex items-center justify-between p-4 bg-[var(--primary-bg)] rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-gold)]/50 transition-all group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {lead.firstName} {lead.lastName}
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">{lead.email}</div>
                    {lead.phone && (
                      <div className="text-sm text-[var(--accent-blue)] font-medium">{lead.phone}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-[var(--accent-gold)] text-[var(--accent-gold)]">
                      Score: {lead.score}
                    </Badge>
                    {lead.priority && (
                      <Badge className={
                        lead.priority === 'high' ? 'bg-[var(--accent-red-dim)] text-[var(--accent-red)] border border-[var(--accent-red)]/50' :
                        lead.priority === 'medium' ? 'bg-[var(--accent-gold-dim)] text-[var(--accent-gold)] border border-[var(--accent-gold)]/50' :
                        'bg-[var(--hover-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                      }>
                        {lead.priority}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleCheckOut(lead)}
                disabled={!!activeCall}
                className="ml-4 flex items-center gap-2 bg-transparent border border-[var(--accent-blue)] text-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-[var(--text-inverse)] font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                Call
              </Button>
            </div>
          ))}
          {availableLeads.length === 0 && (
            <div className="text-center py-12 text-[var(--text-secondary)] font-medium border border-dashed border-[var(--border-color)] rounded-lg">
              No leads available in queue
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default CallQueue;
