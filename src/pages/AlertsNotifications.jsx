
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function AlertsNotifications() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-display font-bold">Alerts & Notifications</h1>
       
       <PremiumCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
          <div className="space-y-4 max-w-md">
             <div className="flex items-center justify-between">
                <Label>Email Alerts</Label>
                <Switch />
             </div>
             <div className="flex items-center justify-between">
                <Label>In-App Notifications</Label>
                <Switch defaultChecked />
             </div>
             <div className="flex items-center justify-between">
                <Label>Weekly Digest</Label>
                <Switch defaultChecked />
             </div>
          </div>
       </PremiumCard>
       
       <PremiumCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Recent Alerts</h3>
          <p className="text-[var(--text-secondary)]">No recent alerts found.</p>
       </PremiumCard>
    </div>
  );
}

export default AlertsNotifications;
