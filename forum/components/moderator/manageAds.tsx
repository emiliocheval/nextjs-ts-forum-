import React, { useState, useEffect } from 'react';
import { getThreadsFromLocalStorage, saveThreadsToLocalStorage } from '@/utils/localStorage';

const ManageAds: React.FC = () => {
  // Provide default values that align with the Advertisement type
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [newAd, setNewAd] = useState<Omit<Advertisement, 'id' | 'category'>>({
    title: '',
    description: '',
    link: '',
    creationDate: new Date().toISOString(),
    creator: { userName: '', password: '', isModerator: false }, // Provide a default creator object
    commentCount: 0,
    isLocked: false,
    tags: [],
    comments: [] // Include the comments property with a default empty array
  });

  // Fetch existing ads
  useEffect(() => {
    const threads: Thread[] = getThreadsFromLocalStorage();
    const adThreads = threads.filter((thread: Thread): thread is Advertisement => thread.category === 'AD');
    setAds(adThreads);
  }, []);

  const handleAddAd = () => {
    const threads: Thread[] = getThreadsFromLocalStorage();
    const newAdThread: Advertisement = {
      ...newAd,
      id: Date.now(),
      category: 'AD',
    };
    threads.push(newAdThread);
    saveThreadsToLocalStorage(threads);
    setAds([...ads, newAdThread]);
  };

  return (
    <div>
      <h2>Manage Advertisements</h2>
      <div>
        <input
          type="text"
          value={newAd.title}
          onChange={e => setNewAd({ ...newAd, title: e.target.value })}
          placeholder="Ad Title"
          className="w-full border p-2 rounded mt-2"
        />
        <textarea
          value={newAd.description}
          onChange={e => setNewAd({ ...newAd, description: e.target.value })}
          placeholder="Ad Description"
          className="w-full border p-2 rounded mt-4"
        />
        <input
          type="url"
          value={newAd.link}
          onChange={e => setNewAd({ ...newAd, link: e.target.value })}
          placeholder="Ad Link"
          className="w-full border p-2 rounded mt-2"
        />
        <button onClick={handleAddAd} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add Ad
        </button>
      </div>
    </div>
  );
};

export default ManageAds;
