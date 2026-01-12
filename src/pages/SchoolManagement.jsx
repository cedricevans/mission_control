
import React, { useState } from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MapPin, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const initialSchools = [
  { id: 1, name: 'Howard University', location: 'Washington, D.C.', contact: 'Dr. James Wilson', phone: '(202) 806-6100', email: 'admissions@howard.edu', students: 1240, status: 'Active' },
  { id: 2, name: 'Spelman College', location: 'Atlanta, GA', contact: 'Sarah Jenkins', phone: '(404) 681-3643', email: 'admissions@spelman.edu', students: 850, status: 'Active' },
  { id: 3, name: 'Morehouse College', location: 'Atlanta, GA', contact: 'Michael Ross', phone: '(404) 681-2800', email: 'admissions@morehouse.edu', students: 920, status: 'Active' },
  { id: 4, name: 'Hampton University', location: 'Hampton, VA', contact: 'Jennifer Wu', phone: '(757) 727-5000', email: 'admissions@hamptonu.edu', students: 780, status: 'Active' },
  { id: 5, name: 'Tuskegee University', location: 'Tuskegee, AL', contact: 'David Clark', phone: '(334) 727-8000', email: 'admissions@tuskegee.edu', students: 650, status: 'Inactive' },
  { id: 6, name: 'Florida A&M University', location: 'Tallahassee, FL', contact: 'Robert Johnson', phone: '(850) 599-3000', email: 'admissions@famu.edu', students: 1100, status: 'Active' },
  { id: 7, name: 'North Carolina A&T', location: 'Greensboro, NC', contact: 'Patricia Miller', phone: '(336) 334-7500', email: 'admissions@ncat.edu', students: 1350, status: 'Active' },
  { id: 8, name: 'Xavier University of LA', location: 'New Orleans, LA', contact: 'Thomas Anderson', phone: '(504) 486-7411', email: 'admissions@xula.edu', students: 580, status: 'Inactive' },
  { id: 9, name: 'Morgan State University', location: 'Baltimore, MD', contact: 'Linda Martinez', phone: '(443) 885-3333', email: 'admissions@morgan.edu', students: 890, status: 'Active' },
  { id: 10, name: 'Clark Atlanta University', location: 'Atlanta, GA', contact: 'William Taylor', phone: '(404) 880-8000', email: 'admissions@cau.edu', students: 720, status: 'Active' }
];

function SchoolManagement() {
  const [schools, setSchools] = useState(initialSchools);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(search.toLowerCase()) || 
                          school.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || school.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      setSchools(schools.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">School Management</h1>
          <p className="text-[var(--text-secondary)]">Manage partner institutions and their details</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add School
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New School</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>School Name</Label>
                <Input placeholder="e.g. Fisk University" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="City, State" />
              </div>
              <div className="space-y-2">
                <Label>Contact Person</Label>
                <Input placeholder="Full Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="(555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="email@school.edu" />
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsAddOpen(false)}>Save School</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <PremiumCard className="p-4">
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
            <Input 
              placeholder="Search schools..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Active', 'Inactive'].map(status => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                onClick={() => setStatusFilter(status)}
                className="min-w-[80px]"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-left">
                <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">School Name</th>
                <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Location</th>
                <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Contact</th>
                <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Stats</th>
                <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Status</th>
                <th className="p-4 text-sm font-semibold text-[var(--text-secondary)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.map(school => (
                <tr key={school.id} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)] transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-[var(--text-primary)]">{school.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{school.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <MapPin className="w-3 h-3" /> {school.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium">{school.contact}</div>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-1">
                      <Phone className="w-3 h-3" /> {school.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className="bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/20">
                      {school.students} Students
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={school.status === 'Active' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'}>
                      {school.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--accent-gold)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-[var(--accent-red)]"
                        onClick={() => handleDelete(school.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
}

export default SchoolManagement;
