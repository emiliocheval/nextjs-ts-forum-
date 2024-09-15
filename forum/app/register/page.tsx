"use client";

import { useState } from 'react';

type Props = {
  onRegister: (userName: string, password: string) => void;
};

const Register = ({ onRegister = () => {} }: Props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName || userName.length < 2) {
      alert('Username must be at least 2 characters long');
      return;
    }

    if (!password || password.length < 2) {
      alert('Password must be at least 2 characters long');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((user: { userName: string }) => user.userName === userName)) {
      alert('Username already exists');
      return;
    }

    // Include isModerator field (default to false)
    const newUser = { userName, password, isModerator: false }; // New User with isModerator: false
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Call onRegister if it's a function
    if (typeof onRegister === 'function') {
      onRegister(userName, password);
    } else {
      console.error('onRegister is not a function');
    }

    alert('Registration successful');
    window.location.href = '/login'; // Redirect to login page after registration
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full md:w-1/3 bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirm-password">
              Repeat Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
              placeholder="Repeat Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
