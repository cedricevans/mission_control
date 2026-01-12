
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getSystemLogs } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

function SystemLogsPage() {
  const logs = getSystemLogs();

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Settings', path: '/settings' }, { label: 'System Logs', path: '/settings/system-logs' }]} />
       <h1 className="text-3xl font-display font-bold">System Activity Logs</h1>
       
       <PremiumCard className="p-0 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
                <tr>
                   <th className="p-3">Timestamp</th>
                   <th className="p-3">Level</th>
                   <th className="p-3">Action</th>
                   <th className="p-3">User</th>
                   <th className="p-3">Status</th>
                </tr>
             </thead>
             <tbody>
                {logs.map(log => (
                   <tr key={log.id} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                      <td className="p-3 font-mono text-xs">{log.timestamp}</td>
                      <td className="p-3">
                         <span className={log.level === 'Error' ? 'text-red-500' : log.level === 'Warning' ? 'text-yellow-500' : 'text-blue-500'}>
                            {log.level}
                         </span>
                      </td>
                      <td className="p-3 font-medium">{log.action}</td>
                      <td className="p-3 text-[var(--text-secondary)]">{log.user}</td>
                      <td className="p-3"><Badge variant="outline">{log.status}</Badge></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </PremiumCard>
    </div>
  );
}

export default SystemLogsPage;
