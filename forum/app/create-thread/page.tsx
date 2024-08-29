'use client'
import { useState } from "react";
import { getThreadsFromLocalStorage, saveThreadsToLocalStorage } from "@/utils/localStorage";
const CreateThread = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ThreadCategory>("THREAD");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const threads = getThreadsFromLocalStorage();
    const newThread: Thread = {
      id: Date.now(),
      title,
      category,
      creationDate: new Date().toISOString(),
      description,
      creator: { userName: "guest", password: "password" }, // Placeholder user
    };

    threads.push(newThread);
    saveThreadsToLocalStorage(threads);
  };

  return (
    <div>
      <h1>Create New Thread</h1>
      <input 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value as ThreadCategory)}
      >
        <option value="THREAD">THREAD</option>
        <option value="QNA">QNA</option>
      </select>
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateThread;