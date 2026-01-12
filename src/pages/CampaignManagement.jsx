
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar, Target, TrendingUp, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialCampaigns = [
  { id: 1, name: 'Fall Recruitment 2026', status: 'Active', start: '2026-08-01', end: '2026-11-30', leads: 450, conversions: 85, roi: 240 },
  { id: 2, name: 'STEM Scholarship Push', status: 'Active', start: '2026-09-15', end: '2026-12-15', leads: 320, conversions: 45, roi: 180 },
  { id: 3, name: 'Spring Transfer Drive', status: 'Paused', start: '2026-01-10', end: '2026-04-30', leads: 150, conversions: 22, roi: 120 },
  { id: 4, name: 'HBCU Pride Social', status: 'Completed', start: '2025-05-01', end: '2025-08-30', leads: 890, conversions: 110, roi: 310 },
  { id: 5, name: 'Nursing Program Outreach', status: 'Active', start: '2026-10-01', end: '2027-01-31', leads: 210, conversions: 38, roi: 210 }
];

function CampaignManagement() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = campaigns.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) && 
    (filter === 'All' || c.status === filter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Campaign Management</h1>
          <p className="text-[var(--text-secondary)]">Track marketing campaigns and performance</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> New Campaign</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Active', value: '3', icon: Target, color: 'text-blue-500' },
          { label: 'Total Leads', value: '2,020', icon: Users, color: 'text-purple-500' },
          { label: 'Avg. ROI', value: '212%', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Total Spend', value: '$45.2k', icon: DollarSign, color: 'text-amber-500' },
        ].map((stat, i) => (
           <PremiumCard key={i} className="flex items-center gap-4 p-4">
              <div className={cn("p-3 rounded-xl bg-opacity-10", stat.color.replace('text-', 'bg-'))}>
                 <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                 <div className="text-2xl font-bold">{stat.value}</div>
                 <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
              </div>
           </PremiumCard>
        ))}
      </div>

      <PremiumCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
            <Input 
              placeholder="Search campaigns..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Active', 'Paused', 'Completed'].map(f => (
              <Button 
                key={f} 
                variant={filter === f ? 'default' : 'outline'}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(campaign => (
            <div key={campaign.id} className="flex flex-col md:flex-row items-center p-4 border border-[var(--border-color)] rounded-xl hover:bg-[var(--hover-bg)] transition-all gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                   <h3 className="font-bold text-lg">{campaign.name}</h3>
                   <Badge className={
                      campaign.status === 'Active' ? 'bg-green-500 text-white' :
                      campaign.status === 'Paused' ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'
                   }>{campaign.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                   <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {campaign.start} — {campaign.end}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-8 text-center w-full md:w-auto">
                 <div>
                    <div className="text-xl font-bold">{campaign.leads}</div>
                    <div className="text-xs text-[var(--text-secondary)]">Leads</div>
                 </div>
                 <div>
                    <div className="text-xl font-bold">{campaign.conversions}</div>
                    <div className="text-xs text-[var(--text-secondary)]">Conversions</div>
                 </div>
                 <div>
                    <div className="text-xl font-bold text-[var(--accent-green)]">{campaign.roi}%</div>
                    <div className="text-xs text-[var(--text-secondary)]">ROI</div>
                 </div>
              </div>

              <div className="flex gap-2">
                 <Button variant="outline" size="sm">Edit</Button>
                 <Button variant="outline" size="sm" className="text-[var(--text-secondary)]">Report</Button>
              </div>
            </div>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}

export default CampaignManagement;
