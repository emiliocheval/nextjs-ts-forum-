import React, { useState, useEffect } from 'react';
import { getThreadsFromLocalStorage, saveThreadsToLocalStorage, getCurrentUser } from '../../utils/localStorage';

type EditThreadProps = {
  threadId: number;
};

const EditThread: React.FC<EditThreadProps> = ({ threadId }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const threads = getThreadsFromLocalStorage();
    const currentThread = threads.find(thread => thread.id === threadId);
    if (currentThread) {
      setTitle(currentThread.title);
      setDescription(currentThread.description);
    }
  }, [threadId]);

  const handleSave = () => {
    const threads = getThreadsFromLocalStorage();
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        thread.title = title;
        thread.description = description;
      }
      return thread;
    });
    saveThreadsToLocalStorage(updatedThreads);
    alert('Thread updated successfully.');
  };

  return (
    <div>
      <h2>Edit Thread</h2>
      <input 
        type="text" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        className="w-full border p-2 rounded mt-2"
        placeholder="Edit Title"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border p-2 rounded mt-4"
        placeholder="Edit Description"
      />
      <button 
        onClick={handleSave} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditThread;
