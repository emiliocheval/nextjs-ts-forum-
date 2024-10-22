
import React from 'react';

type ThemeToggleProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
      title="Toggle Theme"
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
