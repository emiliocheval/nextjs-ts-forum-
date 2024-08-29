'use client'
import { useEffect, useState } from "react";
import { getThreadsFromLocalStorage } from "../utils/localStorage";
import Link from "next/link";

const Home = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const storedThreads = getThreadsFromLocalStorage();
    setThreads(storedThreads);
  }, []);

  return (
    <div>
      <h1>Forum Threads</h1>
      <Link href="/create-thread">Create a New Thread</Link>
      <ul>
        {threads.map(thread => (
          <li key={thread.id}>
            <Link href={`/${thread.id}`}>
              {thread.title} - {thread.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;