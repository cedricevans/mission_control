
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Users, Zap, DollarSign, Database, AlertTriangle } from 'lucide-react';

function Settings() {
  const [assignmentMethod, setAssignmentMethod] = useState('round-robin');
  const [apiKey, setApiKey] = useState('');
  const [payoutRate, setPayoutRate] = useState('10');
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleSaveSettings = () => {
    localStorage.setItem('lms_settings', JSON.stringify({
      assignmentMethod,
      apiKey,
      payoutRate
    }));

    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
      className: "bg-[var(--card-bg)] border-[var(--accent-green)] text-[var(--text-primary)]"
    });
  };

  const handleTestApi = () => {
    toast({
      title: "Connection Test",
      description: "Testing API connectivity...",
      className: "bg-[var(--card-bg)] border-[var(--accent-blue)] text-[var(--text-primary)]"
    });
  };

  const handleClearData = () => {
    localStorage.removeItem('lms_leads');
    setShowClearDialog(false);
    toast({
      title: "Data Cleared",
      description: "All leads have been removed from localStorage.",
      className: "bg-[var(--card-bg)] border-[var(--accent-red)] text-[var(--text-primary)]"
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[var(--accent-blue)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Lead Distribution</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="assignmentMethod" className="text-[var(--text-primary)] font-semibold">Assignment Method</Label>
              <Select value={assignmentMethod} onValueChange={setAssignmentMethod}>
                <SelectTrigger id="assignmentMethod" className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-primary)]">
                  <SelectItem value="round-robin">Round Robin</SelectItem>
                  <SelectItem value="priority">Priority Based</SelectItem>
                  <SelectItem value="manual">Manual Assignment</SelectItem>
                  <SelectItem value="score">Score Based</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                How leads should be distributed among team members
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">LeadHoop API</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey" className="text-[var(--text-primary)] font-semibold">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your LeadHoop API key"
                className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] mt-2"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                Connect to LeadHoop for real-time lead sync
              </p>
            </div>
            <Button onClick={handleTestApi} variant="outline" className="w-full bg-transparent border-[var(--accent-blue)] text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10">
              Test Connection
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-[var(--accent-green)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Affiliate Tracking</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="payoutRate" className="text-[var(--text-primary)] font-semibold">Payout Rate ($)</Label>
              <Input
                id="payoutRate"
                type="number"
                value={payoutRate}
                onChange={(e) => setPayoutRate(e.target.value)}
                placeholder="10.00"
                className="bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-primary)] mt-2"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                Commission per qualified lead
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-[var(--accent-red)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Data Management</h3>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]" onClick={() => {
              toast({ title: "Import feature coming soon" });
            }}>
              Import Leads (CSV)
            </Button>
            <Button variant="outline" className="w-full justify-start text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]" onClick={() => {
              toast({ title: "Backup feature coming soon" });
            }}>
              Backup Data
            </Button>
            
            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-[var(--accent-red)] border-[var(--accent-red)]/50 hover:bg-[var(--accent-red)]/10 hover:text-[var(--accent-red)]">
                  Clear All Data
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[var(--card-bg)] border-[var(--accent-red)] text-[var(--text-primary)]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-[var(--accent-red)]">
                    <AlertTriangle className="w-5 h-5" />
                    Clear All Data
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)]">
                    Are you sure you want to clear all leads? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={() => setShowClearDialog(false)} className="border-[var(--text-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleClearData}
                      className="bg-[var(--accent-red)] hover:bg-[var(--accent-red)]/90 text-[var(--text-inverse)] border-none"
                    >
                      Clear Data
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-8 bg-[var(--accent-gold)] text-[var(--text-inverse)] font-bold hover:bg-[var(--accent-gold)]/90 shadow-lg shadow-[var(--accent-gold-dim)]">
          Save All Settings
        </Button>
      </div>
    </div>
  );
}

export default Settings;
