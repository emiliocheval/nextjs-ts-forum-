"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiUser } from 'react-icons/fi';
import { getCurrentUser, clearCurrentUser, getThreadsFromLocalStorage } from "../utils/localStorage"; // Ensure this import includes the threads

// Define the props interface
interface HeaderProps {
  isDarkMode: boolean;
  onSearch: (filteredThreads: Thread[]) => void; // Add onSearch prop to handle search results
}

const Header = ({ isDarkMode, onSearch }: HeaderProps) => {
  const [user, setUser] = useState<{ userName: string; isModerator: boolean } | null>(null);
  const [searchInput, setSearchInput] = useState(""); // State for the search input

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleSignOut = () => {
    clearCurrentUser();
    setUser(null);
    window.location.href = '/'; // Redirect to home page after sign out
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    // Fetch all threads from local storage
    const threads = getThreadsFromLocalStorage();

    // Filter threads based on tags
    const filteredThreads = threads.filter(thread =>
      thread.tags.some(tag => tag.name.toLowerCase().includes(query))
    );

    // Pass filtered threads to the parent component
    onSearch(filteredThreads);
  };

  return (
    <header
      className="px-4 py-4 flex justify-between items-center w-full"
      style={{ boxShadow: '0px 1px 0px rgba(229, 231, 235, 0.5)' }}
    >
      <div className="flex-1">
        <Link href="/">
          <div className="cursor-pointer">
            <h1 className="text-2xl font-bold">FORUM</h1>
          </div>
        </Link>
      </div>
      
      <div className="flex-1 text-right">
        {user ? (
          <>
            {user.isModerator ? (
              <Link href="/admin">
                <FiUser className={`h-6 w-6 inline-block mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              </Link>
            ) : (
              <Link href="/profile">
                <FiUser className={`h-6 w-6 inline-block mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white rounded-full hover:bg-red-700 px-2 py-1 text-sm"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-red-500 text-white rounded-full hover:bg-red-700 px-2 py-1 text-sm">
              Log in/Register
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
