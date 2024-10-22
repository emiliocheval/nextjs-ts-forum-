import { useState } from "react";
import { getThreadsFromLocalStorage, saveThreadsToLocalStorage } from "@/utils/localStorage";

interface TagManagementProps {
  thread: Thread;
}

const TagManagement: React.FC<TagManagementProps> = ({ thread }) => {
  const [newTagName, setNewTagName] = useState("");
  const [tags, setTags] = useState<ThreadTag[]>(thread.tags || []);

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      alert("Tag name cannot be empty.");
      return;
    }

    const newTag: ThreadTag = {
      id: Date.now(),
      name: newTagName.trim(),
    };

    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    setNewTagName("");

    // Update thread tags in local storage
    const storedThreads = getThreadsFromLocalStorage();
    const updatedThreads = storedThreads.map(t => 
      t.id === thread.id ? { ...t, tags: updatedTags } : t
    );
    saveThreadsToLocalStorage(updatedThreads);
  };

  const handleRemoveTag = (tagId: number) => {
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    setTags(updatedTags);

    // Update thread tags in local storage
    const storedThreads = getThreadsFromLocalStorage();
    const updatedThreads = storedThreads.map(t => 
      t.id === thread.id ? { ...t, tags: updatedTags } : t
    );
    saveThreadsToLocalStorage(updatedThreads);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Manage Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag.id} className="flex items-center space-x-2">
            <span>{tag.name}</span>
            <button
              onClick={() => handleRemoveTag(tag.id)}
              className="text-red-500 underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Enter new tag name"
          className="border rounded px-2 py-1 text-black"
        />
        <button
          onClick={handleAddTag}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagManagement;
