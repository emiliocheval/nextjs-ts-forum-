'use client';

import { useEffect, useState } from "react";
import { getThreadsFromLocalStorage, getCurrentUserFromLocalStorage } from "../utils/localStorage";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ThreadCard from "@/components/threadCard";

const Home = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [user, setUser] = useState<{ userName: string; password: string } | null>(null);
  const router = useRouter();

  // Fetch threads and user on mount
  useEffect(() => {
    // Fetch threads and set state
    const storedThreads = getThreadsFromLocalStorage();
    setThreads(storedThreads);

    // Fetch current user and set state
    const currentUser = getCurrentUserFromLocalStorage();
    setUser(currentUser);
  }, []);

  // Handle thread click
  const handleThreadClick = (threadId: number) => {
    if (!user) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
    } else {
      // Redirect to the thread details page
      router.push(`/${threadId}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {user && (
        <Link 
          href="/create-thread" 
          className="inline-block mb-4 text-white bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create a New Thread
        </Link>
      )}
      <ul className="space-y-4">
        {threads.length === 0 ? (
          <li>No threads available.</li>
        ) : (
          threads
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
            .map(thread => (
              <li key={thread.id} className="cursor-pointer">
                <ThreadCard thread={thread} />
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default Home;
