
import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getPublisherPerformance, getContentProviderPerformance, getContentLibrary } from '@/lib/storage';

// Sub-components for tabs
const PublishersTab = ({ publishers, onAction }) => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold">Publisher Partners</h3>
        <p className="text-[var(--text-secondary)]">Manage relationships with lead generation publishers.</p>
      </div>
      <Button onClick={() => onAction('Publisher Added', 'A new publisher profile has been created.')}>Add Publisher</Button>
    </div>
    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
          <tr>
            <th className="p-4">Publisher</th>
            <th className="p-4">Leads</th>
            <th className="p-4">Conversion</th>
            <th className="p-4">Avg Quality</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher) => (
            <tr key={publisher.name} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
              <td className="p-4 font-semibold">{publisher.name}</td>
              <td className="p-4">{publisher.leads}</td>
              <td className="p-4">{publisher.conversionRate.toFixed(1)}%</td>
              <td className="p-4">{publisher.avgQuality}</td>
              <td className="p-4">
                <Badge variant={publisher.status === 'Active' ? 'default' : 'secondary'}>{publisher.status}</Badge>
              </td>
              <td className="p-4 text-right space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onAction('Publisher Synced', `${publisher.name} data refreshed.`)}>Sync</Button>
                <Button size="sm" variant="ghost" onClick={() => onAction('Publisher Profile', `${publisher.name} profile opened.`)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProvidersTab = ({ providers, onAction }) => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold">Content Providers</h3>
        <p className="text-[var(--text-secondary)]">Manage external content creators and providers.</p>
      </div>
      <Button onClick={() => onAction('Provider Added', 'A new content provider has been onboarded.')}>Add Provider</Button>
    </div>
    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
          <tr>
            <th className="p-4">Provider</th>
            <th className="p-4">Leads</th>
            <th className="p-4">Conversion</th>
            <th className="p-4">Avg Quality</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.name} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
              <td className="p-4 font-semibold">{provider.name}</td>
              <td className="p-4">{provider.leads}</td>
              <td className="p-4">{provider.conversionRate.toFixed(1)}%</td>
              <td className="p-4">{provider.avgQuality}</td>
              <td className="p-4">
                <Badge variant={provider.status === 'Active' ? 'default' : 'secondary'}>{provider.status}</Badge>
              </td>
              <td className="p-4 text-right space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onAction('Provider Synced', `${provider.name} performance updated.`)}>Sync</Button>
                <Button size="sm" variant="ghost" onClick={() => onAction('Provider Profile', `${provider.name} profile opened.`)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ContentTab = ({ contentItems, onAction }) => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold">Content Library</h3>
        <p className="text-[var(--text-secondary)]">Manage articles, videos, and resources.</p>
      </div>
      <Button onClick={() => onAction('Content Added', 'New content draft created.')}>New Content</Button>
    </div>
    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Type</th>
            <th className="p-4">Owner</th>
            <th className="p-4">Leads</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contentItems.map((item) => (
            <tr key={item.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)]">
              <td className="p-4 font-semibold">{item.title}</td>
              <td className="p-4">{item.type}</td>
              <td className="p-4">{item.owner}</td>
              <td className="p-4">{item.leads}</td>
              <td className="p-4">
                <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>{item.status}</Badge>
              </td>
              <td className="p-4 text-right space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onAction('Content Preview', `${item.title} preview opened.`)}>Preview</Button>
                <Button size="sm" variant="ghost" onClick={() => onAction('Content Updated', `${item.title} moved to ${item.status}.`)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

function SourceManagement() {
  const { toast } = useToast();
  const publishers = getPublisherPerformance();
  const providers = getContentProviderPerformance();
  const contentItems = getContentLibrary();

  const handleAction = (title, description) => {
    toast({ title, description, duration: 2500 });
  };

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Source Management</h1>
          <p className="text-[var(--text-secondary)]">Manage all lead and content sources</p>
       </div>

       <PremiumCard className="overflow-hidden p-0 min-h-[500px]">
          <div className="border-b border-[var(--border-color)]">
             <nav className="flex">
                {[
                   { path: 'publishers', label: 'Publishers' },
                   { path: 'providers', label: 'Providers' },
                   { path: 'content', label: 'Content' }
                ].map(tab => (
                   <NavLink 
                      key={tab.path}
                      to={tab.path}
                      className={({ isActive }) => cn(
                         "px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                         isActive 
                            ? "border-[var(--accent-gold)] text-[var(--accent-gold)] bg-[var(--accent-gold)]/5" 
                            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                   >
                      {tab.label}
                   </NavLink>
                ))}
             </nav>
          </div>
          
          <Routes>
             <Route path="/" element={<Navigate to="publishers" replace />} />
             <Route path="publishers" element={<PublishersTab publishers={publishers} onAction={handleAction} />} />
             <Route path="providers" element={<ProvidersTab providers={providers} onAction={handleAction} />} />
             <Route path="content" element={<ContentTab contentItems={contentItems} onAction={handleAction} />} />
          </Routes>
       </PremiumCard>
    </div>
  );
}

export default SourceManagement;
