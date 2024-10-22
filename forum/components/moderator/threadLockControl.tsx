import React, { useState, useEffect } from 'react';
import { getThreadsFromLocalStorage, saveThreadsToLocalStorage } from '../../utils/localStorage'; 

type ThreadLockControlProps = {
  threadId: number;
  onLockStatusChange: (locked: boolean) => void; // Add the prop
};

const ThreadLockControl: React.FC<ThreadLockControlProps> = ({ threadId, onLockStatusChange }) => {
  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    const threads = getThreadsFromLocalStorage();
    const currentThread = threads.find(thread => thread.id === threadId);
    if (currentThread) {
      setIsLocked(currentThread.isLocked);
    }
  }, [threadId]);

  const toggleLock = () => {
    const newLockedStatus = !isLocked;
    setIsLocked(newLockedStatus);
    onLockStatusChange(newLockedStatus); // Notify parent component

    const threads = getThreadsFromLocalStorage();
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        thread.isLocked = newLockedStatus; // Toggle lock status
      }
      return thread;
    });
    saveThreadsToLocalStorage(updatedThreads);
  };

  return (
    <div className="relative">
    <p className="text-gray-700 text-sm mb-2">Thread is currently {isLocked ? "Locked" : "Unlocked"}</p>
    <button
      onClick={toggleLock}
      className=" right-2 bottom-2 px-2 py-1 border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      {isLocked ? "Unlock Thread" : "Lock Thread"}
    </button>
  </div>
  

  );
};

export default ThreadLockControl;
