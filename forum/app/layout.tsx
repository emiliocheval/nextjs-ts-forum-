"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ThemeToggle from "@/components/themeToggle"; // Import the ThemeToggle component
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false); // Start in light mode

  const toggleTheme = () => {
    const newTheme = !isDarkMode; // Determine new theme state
    setIsDarkMode(newTheme);
    const root = document.documentElement;
    
    if (newTheme) { // If dark mode
      root.style.setProperty('--foreground-rgb', '255, 255, 255');
      root.style.setProperty('--background-light-rgb', '20, 20, 20'); // Dark mode colors
    } else { // If light mode
      root.style.setProperty('--foreground-rgb', '0, 0, 0');
      root.style.setProperty('--background-light-rgb', '240, 240, 240'); // Light mode colors
    }
  };

  useEffect(() => {
    // Check the user's preference on initial load
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: light)').matches; // Use 'light' for matching
    
    if (prefersDarkScheme) {
      setIsDarkMode(true); // Set dark mode if the preference is dark
      const root = document.documentElement;
      root.style.setProperty('--foreground-rgb', '255, 255, 255');
      root.style.setProperty('--background-light-rgb', '20, 20, 20'); // Dark mode colors
    } else {
      setIsDarkMode(false); // Ensure light mode if preference is not dark
      const root = document.documentElement;
      root.style.setProperty('--foreground-rgb', '0, 0, 0');
      root.style.setProperty('--background-light-rgb', '240, 240, 240'); // Light mode colors
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header isDarkMode={isDarkMode} onSearch={function (filteredThreads: Thread[]): void {
          throw new Error("Function not implemented.");
        }} /> {/* Pass the theme state */}
        {children}
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </body>
    </html>
  );
}
