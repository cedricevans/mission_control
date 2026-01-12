
import React from 'react';
import PremiumCard from '@/components/PremiumCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getPublisherRatings } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

function PublisherRatingsPage() {
  const ratings = getPublisherRatings();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Source Mgmt', path: '/source-management' }, { label: 'Publisher Ratings', path: '/source-management/publisher-ratings' }]} />
      <h1 className="text-3xl font-display font-bold">Publisher Ratings</h1>
      
      <PremiumCard className="p-0 overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
               <tr>
                  <th className="p-4">Publisher</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Quality Score</th>
                  <th className="p-4">Status</th>
               </tr>
            </thead>
            <tbody>
               {ratings.map(r => (
                  <tr key={r.id} className="border-b border-[var(--border-color)] hover:bg-[var(--hover-bg)]">
                     <td className="p-4 font-bold">{r.name}</td>
                     <td className="p-4 flex items-center gap-1">
                        <Star className="w-4 h-4 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
                        {r.rating}
                     </td>
                     <td className="p-4">{r.qualityScore}/100</td>
                     <td className="p-4">
                        <Badge variant={r.status === 'Excellent' ? 'default' : 'secondary'}>{r.status}</Badge>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </PremiumCard>
    </div>
  );
}

export default PublisherRatingsPage;
