
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const users = [
   { id: 1, name: 'Cedric Evans', email: 'cedric@focusquest.com', role: 'Admin', status: 'Active' },
   { id: 2, name: 'Sarah Admin', email: 'sarah@focusquest.com', role: 'Manager', status: 'Active' },
   { id: 3, name: 'John Doe', email: 'john@focusquest.com', role: 'User', status: 'Inactive' },
];

function UserManagement() {
  const { toast } = useToast();

  const handleAction = (title, description) => {
    toast({ title, description, duration: 2500 });
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <h1 className="text-3xl font-display font-bold">User Management</h1>
          <Button onClick={() => handleAction('User Added', 'New user invitation sent.')}>Add User</Button>
       </div>
       
       <PremiumCard className="p-0 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
                <tr>
                   <th className="p-4">Name</th>
                   <th className="p-4">Email</th>
                   <th className="p-4">Role</th>
                   <th className="p-4">Status</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody>
                {users.map(u => (
                   <tr key={u.id} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                      <td className="p-4 font-bold">{u.name}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{u.email}</td>
                      <td className="p-4"><Badge variant="outline">{u.role}</Badge></td>
                      <td className="p-4"><Badge variant={u.status === 'Active' ? 'default' : 'secondary'}>{u.status}</Badge></td>
                      <td className="p-4 text-right">
                         <Button variant="link" size="sm" onClick={() => handleAction('User Updated', `${u.name} profile opened.`)}>Edit</Button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </PremiumCard>
    </div>
  );
}

export default UserManagement;
