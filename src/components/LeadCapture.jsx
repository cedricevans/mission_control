
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { GraduationCap, ArrowRight, BookOpen, User, Building, School } from 'lucide-react';
import { generateId, saveLead, SCHOOL_PARTNERS, PROGRAMS, LEAD_SOURCES, CONTENT_PROVIDERS, PUBLISHERS } from '@/lib/storage';
import PremiumCard from './PremiumCard';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'student', title: 'Student Info', icon: User },
  { id: 'academic', title: 'Academic Interest', icon: GraduationCap },
  { id: 'source', title: 'Source', icon: BookOpen }
];

function LeadCapture() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolPartner: '',
    program: '',
    leadSource: '',
    contentProvider: '',
    publisher: '',
    notes: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.name || !formData.email) {
         toast({ title: "Required", description: "Please enter name and email.", variant: "destructive" });
         return;
      }
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const lead = {
      id: generateId('lead'),
      ...formData,
      validityStatus: 'Gross',
      conversionStage: 'New Lead',
      qualityScore: 50, // default
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activities: [{ type: 'created', description: 'Manual entry via Lead Capture', timestamp: new Date().toISOString() }],
      costPerLead: 0, 
      enrollmentMilestones: []
    };

    saveLead(lead);

    toast({
      title: "Student Lead Captured",
      description: `Added ${formData.name} to the pipeline.`,
      className: "bg-[var(--card-bg)] border-[var(--accent-green)] text-[var(--text-primary)]"
    });

    setFormData({
      name: '', email: '', phone: '', schoolPartner: '', program: '', leadSource: '', contentProvider: '', publisher: '', notes: ''
    });
    setCurrentStep(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PremiumCard className="p-8 border-t-4 border-t-[var(--accent-gold)]" glow>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] flex items-center gap-3">
              <School className="w-6 h-6 text-[var(--accent-gold)]" />
              Student Intake
            </h2>
          </div>
          <div className="text-right">
             <span className="text-3xl font-bold text-[var(--accent-gold)]">0{currentStep + 1}</span>
             <span className="text-sm text-[var(--text-secondary)]">/03</span>
          </div>
        </div>

        {/* Simple Progress Bar */}
        <div className="h-1 bg-[var(--border-color)] w-full rounded-full mb-8 overflow-hidden">
           <div 
             className="h-full bg-[var(--accent-gold)] transition-all duration-300" 
             style={{ width: `${((currentStep + 1) / 3) * 100}%` }} 
           />
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[var(--text-primary)]">Full Name</Label>
                    <Input value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="premium-input" placeholder="e.g. Jordan Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--text-primary)]">Email Address</Label>
                    <Input value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="premium-input" placeholder="jordan@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--text-primary)]">Phone Number</Label>
                    <Input value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="premium-input" placeholder="(555) 123-4567" />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                   <div className="space-y-2">
                    <Label className="text-[var(--text-primary)]">Target University</Label>
                    <Select value={formData.schoolPartner} onValueChange={(v) => handleChange('schoolPartner', v)}>
                      <SelectTrigger className="premium-input"><SelectValue placeholder="Select HBCU" /></SelectTrigger>
                      <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                         {SCHOOL_PARTNERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--text-primary)]">Program of Interest</Label>
                    <Select value={formData.program} onValueChange={(v) => handleChange('program', v)}>
                      <SelectTrigger className="premium-input"><SelectValue placeholder="Select Program" /></SelectTrigger>
                      <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                         {PROGRAMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[var(--text-primary)]">Lead Source</Label>
                    <Select value={formData.leadSource} onValueChange={(v) => handleChange('leadSource', v)}>
                      <SelectTrigger className="premium-input"><SelectValue placeholder="Select Source" /></SelectTrigger>
                      <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                         {LEAD_SOURCES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.leadSource === 'content_provider' && (
                     <div className="space-y-2">
                       <Label className="text-[var(--text-primary)]">Content Provider</Label>
                       <Select value={formData.contentProvider} onValueChange={(v) => handleChange('contentProvider', v)}>
                         <SelectTrigger className="premium-input"><SelectValue placeholder="Select Provider" /></SelectTrigger>
                         <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                            {CONTENT_PROVIDERS.map(cp => <SelectItem key={cp} value={cp}>{cp}</SelectItem>)}
                         </SelectContent>
                       </Select>
                     </div>
                  )}

                  {formData.leadSource === 'publisher' && (
                     <div className="space-y-2">
                       <Label className="text-[var(--text-primary)]">Publisher</Label>
                       <Select value={formData.publisher} onValueChange={(v) => handleChange('publisher', v)}>
                         <SelectTrigger className="premium-input"><SelectValue placeholder="Select Publisher" /></SelectTrigger>
                         <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                            {PUBLISHERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                         </SelectContent>
                       </Select>
                     </div>
                  )}
                  
                  <div className="space-y-2">
                     <Label className="text-[var(--text-primary)]">Notes</Label>
                     <Input value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} className="premium-input" placeholder="Additional details..." />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border-color)]">
          <Button variant="ghost" onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} disabled={currentStep === 0}>Back</Button>
          <Button onClick={handleNext} className="bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)]/90">
             {currentStep === 2 ? 'Submit Student' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </PremiumCard>
    </div>
  );
}

export default LeadCapture;
