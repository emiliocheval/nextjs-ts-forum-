"use client"

// components/AdminInitializer.tsx
import React, { useEffect } from 'react';
import { promoteToModerator } from '@/utils/localStorage'; // Adjust the import path as necessary

const AdminInitializer: React.FC = () => {
  useEffect(() => {
    const userName = 'Hej';
    const success = promoteToModerator(userName);

    if (success) {
      console.log(`User '${userName}' has been successfully promoted to moderator.`);
    } else {
      console.log(`User '${userName}' not found or could not be promoted.`);
    }
  }, []);

  return <div>Initializing Moderator...</div>;
};

export default AdminInitializer;
