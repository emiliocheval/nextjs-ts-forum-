"use client"

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--foreground-rgb', '0, 0, 0');
      root.style.setProperty('--background-light-rgb', '240, 240, 240'); // Light mode colors
    } else {
      root.style.setProperty('--foreground-rgb', '255, 255, 255');
      root.style.setProperty('--background-light-rgb', '20, 20, 20'); // Dark mode colors
    }
  };

  useEffect(() => {
    // Check the user's preference on initial load
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkScheme);
    const root = document.documentElement;
    if (prefersDarkScheme) {
      root.style.setProperty('--foreground-rgb', '255, 255, 255');
      root.style.setProperty('--background-light-rgb', '20, 20, 20'); // Dark mode colors
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header isDarkMode={isDarkMode} /> {/* Pass the theme state */}
        {children}
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </body>
    </html>
  );
}
