
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { updateLead, addActivity, addNote } from '@/lib/storage';
import { Clock, Activity, Tag, Star, User, Save, X } from 'lucide-react';

function LeadDetailModal({ lead, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [editedLead, setEditedLead] = useState({ ...lead });
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleUpdate = () => {
    updateLead(editedLead.id, editedLead);
    addActivity(editedLead.id, 'updated', 'Lead record updated manually');
    toast({
      title: "Record Updated",
      description: "Changes saved to database.",
      className: "bg-[var(--card-bg)] border-[var(--accent-green)] text-[var(--text-primary)]"
    });
    onClose();
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addNote(editedLead.id, newNote);
    const updatedNotes = [{ text: newNote, timestamp: new Date().toISOString() }, ...(editedLead.notes || [])];
    setEditedLead({ ...editedLead, notes: updatedNotes });
    setNewNote('');
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (editedLead.tags?.includes(newTag)) return;
    const updatedTags = [...(editedLead.tags || []), newTag];
    setEditedLead({ ...editedLead, tags: updatedTags });
    setNewTag('');
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = editedLead.tags.filter(t => t !== tag);
    setEditedLead({ ...editedLead, tags: updatedTags });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
       month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden bg-[var(--primary-bg)] border border-[var(--border-color)] text-[var(--text-primary)] flex flex-col p-0 gap-0 shadow-2xl">
        
        {/* Header */}
        <DialogHeader className="p-6 border-b border-[var(--border-color)] bg-[var(--card-bg)] flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold-dim)] border border-[var(--accent-gold)]/50 flex items-center justify-center text-xl font-bold text-[var(--accent-gold)]">
                {editedLead.firstName[0]}{editedLead.lastName[0]}
              </div>
              <div>
                <DialogTitle className="text-2xl font-display font-bold text-[var(--text-primary)]">
                  {editedLead.firstName} {editedLead.lastName}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[var(--text-secondary)] text-sm font-medium">{editedLead.company}</span>
                  <span className="text-[var(--text-secondary)]">•</span>
                  <div className="flex items-center gap-1 text-[var(--accent-gold)] text-sm font-bold">
                     <Star className="w-3 h-3 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                     Score: {editedLead.score}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleUpdate} className="bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)]/90 font-bold">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[var(--primary-bg)] custom-scrollbar">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="bg-[var(--card-bg)] border border-[var(--border-color)] p-1 mb-6 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[var(--accent-gold)] data-[state=active]:text-[var(--text-inverse)] text-[var(--text-secondary)] font-semibold transition-all">Overview</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-[var(--accent-gold)] data-[state=active]:text-[var(--text-inverse)] text-[var(--text-secondary)] font-semibold transition-all">Activity Log</TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-[var(--accent-gold)] data-[state=active]:text-[var(--text-inverse)] text-[var(--text-secondary)] font-semibold transition-all">Intel / Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info Card */}
                <div className="bg-[var(--card-bg)] p-5 rounded-xl border border-[var(--border-color)]">
                  <h3 className="text-[var(--text-primary)] text-xs uppercase font-bold tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--accent-blue)]" /> Contact Information
                  </h3>
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <Label className="text-xs text-[var(--text-secondary)] font-medium">First Name</Label>
                          <Input value={editedLead.firstName} onChange={e => setEditedLead({...editedLead, firstName: e.target.value})} className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] h-9 text-sm focus:border-[var(--accent-gold)]" />
                       </div>
                       <div className="space-y-1">
                          <Label className="text-xs text-[var(--text-secondary)] font-medium">Last Name</Label>
                          <Input value={editedLead.lastName} onChange={e => setEditedLead({...editedLead, lastName: e.target.value})} className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] h-9 text-sm focus:border-[var(--accent-gold)]" />
                       </div>
                     </div>
                     <div className="space-y-1">
                        <Label className="text-xs text-[var(--text-secondary)] font-medium">Email Address</Label>
                        <Input value={editedLead.email} onChange={e => setEditedLead({...editedLead, email: e.target.value})} className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] h-9 text-sm focus:border-[var(--accent-gold)]" />
                     </div>
                     <div className="space-y-1">
                        <Label className="text-xs text-[var(--text-secondary)] font-medium">Phone</Label>
                        <Input value={editedLead.phone} onChange={e => setEditedLead({...editedLead, phone: e.target.value})} className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] h-9 text-sm focus:border-[var(--accent-gold)]" />
                     </div>
                  </div>
                </div>

                {/* Status & Tags Card */}
                <div className="bg-[var(--card-bg)] p-5 rounded-xl border border-[var(--border-color)]">
                  <h3 className="text-[var(--text-primary)] text-xs uppercase font-bold tracking-wider mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[var(--accent-green)]" /> Status & Segmentation
                  </h3>
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <Label className="text-xs text-[var(--text-secondary)] font-medium">Current Status</Label>
                           <Select value={editedLead.status} onValueChange={v => setEditedLead({...editedLead, status: v})}>
                              <SelectTrigger className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] h-9 focus:border-[var(--accent-blue)]">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                                 <SelectItem value="new">New</SelectItem>
                                 <SelectItem value="contacted">Contacted</SelectItem>
                                 <SelectItem value="qualified">Qualified</SelectItem>
                                 <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-1">
                           <Label className="text-xs text-[var(--text-secondary)] font-medium">Assigned Agent</Label>
                           <Select value={editedLead.assignedTo || "unassigned"} onValueChange={v => setEditedLead({...editedLead, assignedTo: v})}>
                              <SelectTrigger className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] h-9 focus:border-[var(--accent-blue)]">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                                 <SelectItem value="unassigned">Unassigned</SelectItem>
                                 <SelectItem value="agent1">Agent 1</SelectItem>
                                 <SelectItem value="agent2">Agent 2</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <Label className="text-xs text-[var(--text-secondary)] font-medium">Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                           {editedLead.tags?.map(tag => (
                              <Badge key={tag} variant="outline" className="border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] cursor-pointer group transition-colors" onClick={() => handleRemoveTag(tag)}>
                                 {tag} <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
                              </Badge>
                           ))}
                        </div>
                        <div className="flex gap-2">
                           <Input 
                             placeholder="Add tag..." 
                             value={newTag} 
                             onChange={e => setNewTag(e.target.value)} 
                             className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] h-8 text-sm focus:border-[var(--accent-blue)]"
                             onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                           />
                           <Button size="sm" variant="outline" onClick={handleAddTag} className="border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]">
                              <Tag className="w-3 h-3" />
                           </Button>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
               <div className="relative border-l border-[var(--border-color)] ml-3 pl-6 space-y-6">
                  {(editedLead.activities || []).map((activity, i) => (
                     <div key={i} className="relative">
                        <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[var(--primary-bg)] border-2 border-[var(--accent-blue)]" />
                        <div className="bg-[var(--card-bg)] p-3 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-blue)]/30 transition-colors">
                           <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-[var(--text-primary)] text-sm capitalize">{activity.type}</span>
                              <span className="text-xs text-[var(--accent-blue)] font-mono">{formatDate(activity.timestamp)}</span>
                           </div>
                           <p className="text-sm text-[var(--text-secondary)]">{activity.description}</p>
                        </div>
                     </div>
                  ))}
                  {(!editedLead.activities || editedLead.activities.length === 0) && (
                     <p className="text-[var(--text-secondary)] italic text-center p-4">No activity recorded yet.</p>
                  )}
               </div>
            </TabsContent>

            <TabsContent value="notes">
               <div className="space-y-4">
                  <div className="flex gap-2">
                     <Input 
                        placeholder="Add internal note..." 
                        value={newNote} 
                        onChange={e => setNewNote(e.target.value)} 
                        className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--accent-gold)]"
                        onKeyDown={e => e.key === 'Enter' && handleAddNote()}
                     />
                     <Button onClick={handleAddNote} className="bg-[var(--accent-gold)] text-[var(--text-inverse)] hover:bg-[var(--accent-gold)]/90 font-bold">Add</Button>
                  </div>
                  
                  <div className="space-y-3">
                     {(editedLead.notes || []).map((note, i) => (
                        <div key={i} className="bg-[var(--card-bg)] p-4 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-gold)]/30 transition-colors">
                           <p className="text-[var(--text-primary)] text-sm">{note.text}</p>
                           <div className="flex items-center gap-2 mt-2 text-xs text-[var(--text-secondary)]">
                              <Clock className="w-3 h-3" />
                              {formatDate(note.timestamp)}
                           </div>
                        </div>
                     ))}
                     {(!editedLead.notes || editedLead.notes.length === 0) && (
                        <p className="text-[var(--text-secondary)] italic text-center p-4">No notes added yet.</p>
                     )}
                  </div>
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LeadDetailModal;
