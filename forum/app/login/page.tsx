"use client";

import { useState } from 'react';
import { loginUser } from '../../utils/localStorage'; // Adjust the import path as necessary

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleLogin = () => {
    const success = loginUser(userName, password);

    if (success) {
      window.location.href = '/'; // Redirect to home page after login
    } else {
      setErrorMessage('Invalid credentials'); // Set error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full md:w-1/3 bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block mb-4 text-black bg-white py-2 px-4 rounded-lg hover:bg-[#c2c2c2] transition-colors"
            >
              Login
            </button>
          </div>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p> // Display error message
        )}
        <p className="text-center mt-4 text-black">
          Don't have an account? <a href="/register" className="text-blue-500 underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
