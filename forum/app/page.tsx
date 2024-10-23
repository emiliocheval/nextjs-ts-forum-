"use client";

import { useEffect, useState } from "react";
import { getThreadsFromLocalStorage, getCurrentUserFromLocalStorage, getAdsFromLocalStorage } from "@/utils/localStorage"; // Ensure this imports your local storage functions
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ThreadCard from "@/components/threadCard";
import AdList from "@/components/adList"; // Import the AdList component

const Home = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [user, setUser] = useState<{ userName: string; password: string } | null>(null);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]); // State for advertisements
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]); // State for filtered threads
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const router = useRouter();

  useEffect(() => {
    // Fetch threads from local storage
    const storedThreads = getThreadsFromLocalStorage();

    // Update threads to include the comment count
    const threadsWithComments = storedThreads.map(thread => ({
      ...thread,
      commentCount: thread.comments.length,
    }));
    
    setThreads(threadsWithComments);
    setFilteredThreads(threadsWithComments); // Set initial filtered threads

    // Fetch current user
    const currentUser = getCurrentUserFromLocalStorage();
    setUser(currentUser);

    // Fetch advertisements from local storage
    const storedAds = getAdsFromLocalStorage(); // Fetch ads
    setAdvertisements(storedAds); // Update state with advertisements
  }, []);

  // Handle thread click
  const handleThreadClick = (threadId: number) => {
    if (!user) {
      router.push('/login'); // Redirect to login if user is not logged in
    } else {
      router.push(`/${threadId}`); // Redirect to the thread page
    }
  };

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    // Filter threads based on search input
    const filtered = threads.filter(thread =>
      thread.title.toLowerCase().includes(query) || // Match by title
      thread.tags.some(tag => tag.name.toLowerCase().includes(query)) // Match by tags
    );

    setFilteredThreads(filtered); // Update filtered threads
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search threads..."
          className="border rounded-full pl-4 pr-3 py-2 w-full text-sm"
          value={searchInput}
          onChange={handleSearch}
        />
      </div>

      {user && (
        <div className="flex justify-center mb-4"> {/* Center the button using flex */}
          <Link 
            href="/create-thread" 
            className="text-black bg-white py-2 px-4 rounded-lg hover:bg-[#c2c2c2] transition-colors"
          >
            Create a New Thread
          </Link>
        </div>
      )}

      <ul className="space-y-4">
        {filteredThreads.length === 0 ? (
          <li>No threads available.</li> // Display a message if no threads are available
        ) : (
          filteredThreads
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()) // Sort threads by creation date
            .map(thread => (
              <li key={thread.id} className="cursor-pointer" onClick={() => handleThreadClick(thread.id)}>
                <ThreadCard thread={thread} />
              </li>
            ))
        )}
      </ul>

      {advertisements.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Advertisements</h2>
          <AdList ads={advertisements} />
        </div>
      )}
    </div>
  );
};

export default Home;
