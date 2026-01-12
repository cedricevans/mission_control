
import React, { useState, useEffect, useMemo } from 'react';
import { getEnrolledStudents, SCHOOL_PARTNERS, PROGRAMS } from '@/lib/storage';
import PremiumCard from '@/components/PremiumCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Download, Filter, ChevronLeft, ChevronRight, 
  MoreHorizontal, Eye, Edit, Trash2, Home, CheckCircle2, 
  X, Calendar, SlidersHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

function StudentManagement() {
  // State
  const [allStudents, setAllStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 50;

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    school: 'all',
    program: 'all',
    status: 'all',
    stage: 'all'
  });

  // Load Data
  useEffect(() => {
    const data = getEnrolledStudents();
    // Add some mock status/stage data if missing from storage to ensure UI works fully
    const enhancedData = data.map(s => ({
      ...s,
      status: s.status || 'Active', // Active, Graduated, Paused
      stage: 'Enrolled' 
    }));
    setAllStudents(enhancedData);
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return allStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                          student.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesSchool = filters.school === 'all' || student.schoolPartner === filters.school;
      const matchesProgram = filters.program === 'all' || student.program === filters.program;
      const matchesStatus = filters.status === 'all' || student.status === filters.status;
      
      return matchesSearch && matchesSchool && matchesProgram && matchesStatus;
    });
  }, [allStudents, filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for Milestones Timeline
  const MilestoneTimeline = ({ milestones }) => {
    const steps = ['Application', 'Interview', 'Deposit', 'Enrolled'];
    // Mock logic to determine progress based on existing milestones
    const currentStepIndex = 3; // Enrolled students are at step 4 (index 3)

    return (
      <div className="flex items-center w-full max-w-[140px] gap-1">
        {steps.map((step, idx) => (
          <div key={step} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div 
              className={cn(
                "w-full h-1.5 rounded-full transition-all duration-300",
                idx <= currentStepIndex ? "bg-[var(--accent-green)]" : "bg-[var(--border-color)]"
              )}
            />
             {/* Tooltip */}
             <div className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-black text-white text-[10px] px-2 py-1 rounded z-10">
                {step} {idx <= currentStepIndex ? '✓' : ''}
             </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link to="/" className="hover:text-[var(--accent-gold)] flex items-center gap-1">
          <Home className="w-3 h-3" /> Dashboard
        </Link>
        <span className="opacity-50">/</span>
        <span className="text-[var(--text-primary)]">Students</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">Student Roster</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage {filteredData.length} enrolled students and track their progress</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "rounded-xl border-[var(--border-color)] hover:bg-[var(--hover-bg)]",
              isFilterOpen && "bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)] border-[var(--accent-gold)]"
            )}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl bg-[var(--accent-blue)] text-[var(--text-inverse)] hover:bg-[var(--accent-blue)]/90 flex-1 md:flex-none">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar (Collapsible) */}
      <div className={cn(
        "grid gap-4 transition-all duration-300 ease-in-out overflow-hidden",
        isFilterOpen ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0 mb-0"
      )}>
        <PremiumCard className="p-5 min-h-0 bg-[var(--secondary-bg)]/50 backdrop-blur-sm border-[var(--border-color)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {/* Search */}
             <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-secondary)]" />
                <Input 
                  placeholder="Search student name or email..." 
                  className="pl-9 bg-[var(--card-bg)] border-[var(--border-color)] rounded-xl"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                />
             </div>
             
             {/* School Filter */}
             <Select value={filters.school} onValueChange={(val) => setFilters(prev => ({...prev, school: val}))}>
                <SelectTrigger className="bg-[var(--card-bg)] border-[var(--border-color)] rounded-xl">
                  <SelectValue placeholder="School Partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  {SCHOOL_PARTNERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
             </Select>

             {/* Program Filter */}
             <Select value={filters.program} onValueChange={(val) => setFilters(prev => ({...prev, program: val}))}>
                <SelectTrigger className="bg-[var(--card-bg)] border-[var(--border-color)] rounded-xl">
                  <SelectValue placeholder="Academic Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {PROGRAMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
             </Select>

             {/* Status Filter */}
             <Select value={filters.status} onValueChange={(val) => setFilters(prev => ({...prev, status: val}))}>
                <SelectTrigger className="bg-[var(--card-bg)] border-[var(--border-color)] rounded-xl">
                  <SelectValue placeholder="Current Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Graduated">Graduated</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
             </Select>
          </div>
          <div className="flex justify-end mt-4 pt-4 border-t border-[var(--border-color)]">
             <Button 
               variant="ghost" 
               size="sm" 
               className="text-[var(--text-secondary)] hover:text-[var(--accent-red)]"
               onClick={() => setFilters({ search: '', school: 'all', program: 'all', status: 'all', stage: 'all' })}
             >
               <X className="w-3 h-3 mr-1" /> Clear Filters
             </Button>
          </div>
        </PremiumCard>
      </div>

      {/* Main Table Card */}
      <PremiumCard className="overflow-hidden border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl rounded-2xl">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--secondary-bg)]/50">
                <th className="p-4 pl-6 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap sticky left-0 z-10 bg-[var(--secondary-bg)]/95 backdrop-blur-md">Student Name</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">Program Info</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">Enrollment Date</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">Progress</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="p-4 pr-6 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {currentData.length > 0 ? (
                currentData.map((student) => (
                  <tr key={student.id} className="group hover:bg-[var(--hover-bg)] transition-colors">
                    {/* Name Column */}
                    <td className="p-4 pl-6 sticky left-0 z-10 bg-[var(--card-bg)] group-hover:bg-[var(--hover-bg)] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 to-[var(--accent-gold)]/5 flex items-center justify-center text-[var(--accent-gold)] font-bold text-sm border border-[var(--accent-gold)]/20 shadow-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--text-primary)]">{student.name}</div>
                          <div className="text-xs text-[var(--text-secondary)]">{student.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Program Info */}
                    <td className="p-4 whitespace-nowrap">
                       <div className="font-medium text-[var(--text-primary)]">{student.program}</div>
                       <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]"></span>
                          {student.schoolPartner}
                       </div>
                    </td>

                    {/* Date */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-[var(--text-primary)]">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-[var(--text-secondary)]" />
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="p-4">
                      <MilestoneTimeline milestones={student.enrollmentMilestones} />
                    </td>

                    {/* Status */}
                    <td className="p-4 whitespace-nowrap">
                      <Badge variant="outline" className={cn(
                        "rounded-md px-2.5 py-0.5 border-transparent bg-opacity-10",
                        student.status === 'Active' ? "bg-green-500 text-green-500" :
                        student.status === 'Paused' ? "bg-yellow-500 text-yellow-500" :
                        "bg-gray-500 text-gray-400"
                      )}>
                        {student.status}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[var(--accent-blue)]/10 hover:text-[var(--accent-blue)]">
                            <Eye className="w-4 h-4" />
                         </Button>
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[var(--accent-gold)]/10 hover:text-[var(--accent-gold)]">
                            <Edit className="w-4 h-4" />
                         </Button>
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[var(--accent-red)]/10 hover:text-[var(--accent-red)]">
                            <Trash2 className="w-4 h-4" />
                         </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-[var(--text-secondary)]">
                    <div className="flex flex-col items-center justify-center">
                       <div className="w-16 h-16 rounded-full bg-[var(--secondary-bg)] flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 opacity-20" />
                       </div>
                       <p className="font-medium">No students found matching your filters.</p>
                       <Button 
                          variant="link" 
                          className="text-[var(--accent-gold)] mt-2"
                          onClick={() => setFilters({ search: '', school: 'all', program: 'all', status: 'all', stage: 'all' })}
                       >
                          Clear all filters
                       </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--secondary-bg)]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="text-xs text-[var(--text-secondary)]">
              Showing <span className="font-medium text-[var(--text-primary)]">{filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-[var(--text-primary)]">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-medium text-[var(--text-primary)]">{filteredData.length}</span> students
           </div>
           
           <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg h-8 w-8 p-0 border-[var(--border-color)] hover:bg-[var(--hover-bg)] disabled:opacity-30"
              >
                 <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1 text-sm font-medium">
                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    // Logic to show ranges for many pages can be added here
                    return (
                       <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={cn(
                             "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                             currentPage === pageNum 
                                ? "bg-[var(--accent-gold)] text-[var(--text-inverse)] shadow-sm" 
                                : "hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
                          )}
                       >
                          {pageNum}
                       </button>
                    )
                 })}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="rounded-lg h-8 w-8 p-0 border-[var(--border-color)] hover:bg-[var(--hover-bg)] disabled:opacity-30"
              >
                 <ChevronRight className="w-4 h-4" />
              </Button>
           </div>
        </div>
      </PremiumCard>
    </div>
  );
}

export default StudentManagement;
