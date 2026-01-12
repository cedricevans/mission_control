
import React, { useState } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, BookOpen, Clock, Users, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const initialPrograms = [
  { id: 1, name: 'Computer Science BS', school: 'Howard University', duration: 48, enrolled: 320, status: 'Active' },
  { id: 2, name: 'Business Administration MBA', school: 'Morehouse College', duration: 24, enrolled: 150, status: 'Active' },
  { id: 3, name: 'Nursing BSN', school: 'Hampton University', duration: 48, enrolled: 280, status: 'Active' },
  { id: 4, name: 'Electrical Engineering', school: 'North Carolina A&T', duration: 48, enrolled: 210, status: 'Active' },
  { id: 5, name: 'Psychology BA', school: 'Spelman College', duration: 48, enrolled: 190, status: 'Active' },
  { id: 6, name: 'Data Science MS', school: 'Howard University', duration: 18, enrolled: 85, status: 'Inactive' },
  { id: 7, name: 'Education M.Ed', school: 'Clark Atlanta University', duration: 24, enrolled: 120, status: 'Active' },
  { id: 8, name: 'Journalism BA', school: 'Florida A&M University', duration: 48, enrolled: 160, status: 'Active' }
];

function ProgramManagement() {
  const [programs, setPrograms] = useState(initialPrograms);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredPrograms = programs.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.school.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Program Management</h1>
          <p className="text-[var(--text-secondary)]">Academic programs and enrollment tracking</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Program</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Program</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2"><Label>Program Name</Label><Input placeholder="e.g. Biology BS" /></div>
              <div className="space-y-2"><Label>School</Label><Input placeholder="Select School" /></div>
              <div className="space-y-2"><Label>Duration (Months)</Label><Input type="number" placeholder="48" /></div>
              <Button className="w-full" onClick={() => setIsAddOpen(false)}>Save Program</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <PremiumCard className="p-4">
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
            <Input 
              placeholder="Search programs..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrograms.map(program => (
            <PremiumCard key={program.id} className="group hover:border-[var(--accent-gold)] transition-colors p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-6 w-6"><Edit className="w-3 h-3" /></Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6 text-[var(--accent-red)]"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--accent-blue)]/10 rounded-lg text-[var(--accent-blue)]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Badge variant={program.status === 'Active' ? 'default' : 'secondary'}>{program.status}</Badge>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{program.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{program.school}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Clock className="w-4 h-4" /> {program.duration} Mo.
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Users className="w-4 h-4" /> {program.enrolled} Students
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}

export default ProgramManagement;
