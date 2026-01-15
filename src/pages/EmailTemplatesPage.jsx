
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getEmailTemplates } from '@/lib/storage';
import { Eye, Send, Pencil } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function EmailTemplatesPage() {
  const { toast } = useToast();
  const templates = getEmailTemplates();

  const handleAction = (title, description) => {
    toast({ title, description, duration: 2500 });
  };

  return (
    <div className="space-y-6">
       <Breadcrumb items={[{ label: 'Settings', path: '/settings' }, { label: 'Email Templates', path: '/settings/email-templates' }]} />
       <div className="flex flex-wrap items-center justify-between gap-4">
         <div>
           <h1 className="text-3xl font-display font-bold">Email Templates</h1>
           <p className="text-[var(--text-secondary)]">Design, test, and launch lifecycle messaging.</p>
         </div>
         <Button onClick={() => handleAction('Template Created', 'A new email template draft is ready.')}>Create Template</Button>
       </div>
       
       <PremiumCard className="p-0 overflow-hidden">
         <table className="w-full text-left">
           <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
             <tr>
               <th className="p-4">Template</th>
               <th className="p-4">Subject</th>
               <th className="p-4">Type</th>
               <th className="p-4">Open Rate</th>
               <th className="p-4">Last Updated</th>
               <th className="p-4">Status</th>
               <th className="p-4 text-right">Actions</th>
             </tr>
           </thead>
           <tbody>
             {templates.map((template) => (
               <tr key={template.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
                 <td className="p-4 font-semibold">{template.name}</td>
                 <td className="p-4">{template.subject}</td>
                 <td className="p-4">{template.type}</td>
                 <td className="p-4">{template.opens}%</td>
                 <td className="p-4">{template.lastUpdated}</td>
                 <td className="p-4">
                   <Badge variant={template.status === 'Active' ? 'default' : 'secondary'}>{template.status}</Badge>
                 </td>
                 <td className="p-4 text-right space-x-2">
                   <Button size="icon" variant="ghost" onClick={() => handleAction('Preview Ready', `${template.name} preview opened.`)}>
                     <Eye className="w-4 h-4" />
                   </Button>
                   <Button size="icon" variant="ghost" onClick={() => handleAction('Template Updated', `${template.name} opened for edits.`)}>
                     <Pencil className="w-4 h-4" />
                   </Button>
                   <Button size="icon" variant="ghost" onClick={() => handleAction('Test Sent', `Test email sent for ${template.name}.`)}>
                     <Send className="w-4 h-4" />
                   </Button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </PremiumCard>
    </div>
  );
}

export default EmailTemplatesPage;
