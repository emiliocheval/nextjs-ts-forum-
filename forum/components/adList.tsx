'use client';

import React from 'react';
import AdvertisementCard from './advertisementCard'; // Import the AdvertisementCard component

interface AdListProps {
  ads: Advertisement[]; // Ensure this is defined globally in types.d.ts
}

const AdList: React.FC<AdListProps> = ({ ads }) => {
  return (
    <div className="ad-list space-y-4">
      {ads.length === 0 ? (
        <p>No advertisements available.</p>
      ) : (
        ads.map(ad => (
          <AdvertisementCard key={ad.id} advertisement={ad} />
        ))
      )}
    </div>
  );
};

export default AdList;
