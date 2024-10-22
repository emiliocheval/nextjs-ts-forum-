// pages/admin.tsx
"use client";

import React from 'react';
import { getCurrentUser } from '@/utils/localStorage'; // Adjust the import path as necessary
import AdminPanel from '@/components/moderator/adminPanel';

const AdminPage: React.FC = () => {
  const currentUser = getCurrentUser();

  // Check if the user is an admin
  if (!currentUser || !currentUser.isModerator) {
    return <p>Access denied. You do not have permission to view this page.</p>;
  }

  return (
    <div>
      
      <AdminPanel />
    </div>
  );
};

export default AdminPage;
