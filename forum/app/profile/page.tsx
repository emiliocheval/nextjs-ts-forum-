"use client";
import React, { useEffect, useState } from 'react';

// Assuming you have defined the User type in types.d.ts
type User = {
  userName: string;
  password: string;
  isModerator: boolean;
  profilePic?: string;
  aboutMe?: string;
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState<string | undefined>(""); // To store profile picture
  const [aboutMe, setAboutMe] = useState(""); // To store "About Me" text

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
      setProfilePic(currentUser.profilePic || "");
      setAboutMe(currentUser.aboutMe || "");
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    if (user) {
      // Update user data in local storage
      const updatedUser = { ...user, profilePic, aboutMe };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    setEditMode(false);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result as string); // Set the profile picture as base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center p-5">
      <div className="border border-gray-300 bg-white rounded-lg p-5 inline-block bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-black">Profile</h2>

        {/* Profile Picture */}
        <div className="mb-4 text-center">
          <strong className="text-black">Profile Picture</strong>
          <div className="flex justify-center mt-3">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center dark:bg-gray-600">
                No Image
              </div>
            )}
          </div>
          {editMode && (
            <div className="flex justify-center mt-3 text-black">
              <input type="file" onChange={handleProfilePicChange} />
            </div>
          )}
        </div>

        {/* Account Name (Non-Editable) */}
        <div className="mb-4">
          <div>
            <strong className="text-black">Account Name</strong>
          </div>
          <div className="text-black">{user?.userName}</div>
        </div>

        {/* About Me */}
        <div className="mb-4">
          <div>
            <strong className="text-black">About Me</strong>
          </div>
          {editMode ? (
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Tell us about yourself"
              className="w-full h-20 mt-3 p-2 border rounded-md border-gray-300  bg-white text-black"
            />
          ) : (
            <div className="text-black">{aboutMe || 'No description available.'}</div>
          )}
        </div>

        {/* Save/Edit Button */}
        <button
          className="bg-[#333] text-white px-4 py-2 rounded-md"
          onClick={editMode ? handleSave : handleEditToggle}
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
