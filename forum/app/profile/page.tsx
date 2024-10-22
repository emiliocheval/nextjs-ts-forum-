"use client"
import React, { useEffect, useState } from 'react';

// Assuming you have defined the User type in types.d.ts
type User = {
  userName: string;
  password: string;
  isModerator: boolean;
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [accountName, setAccountName] = useState("");

  // Get the currently logged-in user
  const getCurrentUserFromLocalStorage = (): User | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  };

  useEffect(() => {
    const currentUser = getCurrentUserFromLocalStorage();
    if (currentUser) {
      setUser(currentUser);
      setAccountName(currentUser.userName);
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    if (user) {
      // Update user account name in local storage
      const updatedUser = { ...user, userName: accountName };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    setEditMode(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', display: 'inline-block' }}>
        <h2>Profile</h2>
        <div style={{ marginBottom: '15px' }}>
          <div>
            <strong>Account Name:</strong>
          </div>
          {editMode ? (
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              style={{ marginTop: '10px' }}
            />
          ) : (
            <div>{user?.userName}</div>
          )}
        </div>
        <button onClick={editMode ? handleSave : handleEditToggle}>
          {editMode ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
