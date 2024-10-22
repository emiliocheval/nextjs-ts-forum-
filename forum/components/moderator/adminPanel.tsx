import React, { useEffect, useState } from 'react';
import { getUsersFromLocalStorage, promoteToModerator, demoteFromModerator } from '@/utils/localStorage'; // Update with the correct import path
import { FiStar, FiStar as FiStarOutline } from 'react-icons/fi'; // Import filled and outline star icons

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<{ userName: string; isModerator: boolean }[]>([]);
  const [message, setMessage] = useState<string | null>(null); // State for message display

  useEffect(() => {
    const storedUsers = getUsersFromLocalStorage();

    // Check if there are any users in local storage
    if (storedUsers.length > 0) {
      // Automatically promote the first user to admin if they are not already
      const firstUser = storedUsers[0];
      if (!firstUser.isModerator) {
        promoteToModerator(firstUser.userName);
        setMessage(`${firstUser.userName} has been promoted to admin.`);
      }
    }

    setUsers(getUsersFromLocalStorage()); // Update the state with the latest users
  }, []);

  const toggleAdminStatus = (userName: string, isModerator: boolean) => {
    if (isModerator) {
      demoteFromModerator(userName);
      setMessage(`${userName} has been demoted from admin.`);
    } else {
      promoteToModerator(userName);
      setMessage(`${userName} has been promoted to admin.`);
    }
    setUsers(getUsersFromLocalStorage());
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-8 mt-6">Admin Panel</h1> {/* Title at the top of the page */}
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold text-center mb-4 mt-4">Users</h2> {/* Users title */}
        {users.map((user) => (
          <div key={user.userName} className="flex justify-between items-center text-black bg-white shadow-md rounded-lg p-4 mb-2">
            <span>{user.userName}</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleAdminStatus(user.userName, user.isModerator)}
                className="bg-transparent border-none cursor-pointer"
              >
                {user.isModerator ? (
                  <FiStar className="text-yellow-500" /> // Filled star icon for admins
                ) : (
                  <FiStarOutline className="text-gray-400" /> // Outline star icon for non-admins
                )}
              </button>
            </div>
          </div>
        ))}
        {message && (
          <div className="mt-4 text-center text-lg text-white">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
