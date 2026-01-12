
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function UserSettings() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-display font-bold">My Profile</h1>
       
       <PremiumCard className="p-6 max-w-2xl">
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label>First Name</Label>
                   <Input defaultValue="Cedric" />
                </div>
                <div className="space-y-2">
                   <Label>Last Name</Label>
                   <Input defaultValue="Evans" />
                </div>
             </div>
             <div className="space-y-2">
                <Label>Email Address</Label>
                <Input defaultValue="cedric@focusquest.com" readOnly className="opacity-70" />
             </div>
             
             <div className="pt-4 border-t border-[var(--border-color)]">
                <Button>Save Changes</Button>
             </div>
          </div>
       </PremiumCard>
    </div>
  );
}

export default UserSettings;
