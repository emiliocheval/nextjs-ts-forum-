"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiUser } from 'react-icons/fi'; // Import the user icon
import Image from "next/image";
import { getCurrentUser, clearCurrentUser } from "../utils/localStorage"; // Make sure to import these functions

// Define the props interface
interface HeaderProps {
  isDarkMode: boolean; // Add the isDarkMode prop
}

const Header = ({ isDarkMode }: HeaderProps) => { // Use the props interface
  const [user, setUser] = useState<{ userName: string; isModerator: boolean } | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleSignOut = () => {
    clearCurrentUser();
    setUser(null);
    window.location.href = '/'; // Redirect to home page after sign out
  };

  return (
    <header
      className="px-4 py-4 flex justify-between items-center w-full"
      style={{ boxShadow: '0px 1px 0px rgba(229, 231, 235, 0.5)' }} // Simulating a 0.5px border with shadow
    >
      <div className="flex-1">
        <Link href="/">
          <div className="cursor-pointer">
            <h1 className="text-2xl font-bold">FORUM</h1>
          </div>
        </Link>
      </div>
      <div className="flex-1 text-center">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className={`border rounded-full pl-10 pr-3 py-2 w-full text-sm ${isDarkMode ? 'text-black bg-white' : 'text-white bg-gray-800'}`}
          />
        </div>
      </div>
      <div className="flex-1 text-right">
        {user ? (
          <>
            {/* User icon linked to admin page for admins */}
            {user.isModerator ? (
              <Link href="/admin">
                <FiUser className={`h-6 w-6 inline-block mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`} /> {/* Admin icon */}
              </Link>
            ) : (
              // User icon linked to profile page for non-admin users
              <Link href="/profile">
                <FiUser className={`h-6 w-6 inline-block mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`} /> {/* Regular user icon */}
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
