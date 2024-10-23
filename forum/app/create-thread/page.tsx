"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getThreadsFromLocalStorage,
  saveThreadsToLocalStorage,
  addAdToLocalStorage,
} from "@/utils/localStorage";

const CreateThread = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ThreadCategory>("THREAD");
  const [description, setDescription] = useState("");
  const [adLink, setAdLink] = useState(""); // State for ad link
  const [tags, setTags] = useState<ThreadTag[]>([]); // State to hold tags
  const [tagInput, setTagInput] = useState<string>(""); // Input for new tag
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleAddTag = () => {
    if (tagInput) {
      const newTag: ThreadTag = { id: Date.now(), name: tagInput };
      setTags((prevTags) => [...prevTags, newTag]); // Add new tag to the list
      setTagInput(""); // Clear input field
    }
  };

  const handleRemoveTag = (id: number) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id)); // Remove tag by ID
  };

  const handleSubmit = () => {
    if (!title || !description) {
      setError("Fields cannot be empty");
      return;
    }

    if (category === "AD" && !adLink) {
      setError("Ad link cannot be empty");
      return;
    }

    if (category === "AD") {
      // Create new ad
      const newAd: Advertisement = {
        id: Date.now(),
        title,
        category, // Should be "AD"
        creationDate: new Date().toISOString(),
        description,
        link: adLink, // Link to the advertisement
        creator: { userName: "guest", password: "password", isModerator: false },
        commentCount: 0,
        isLocked: false, // Default value
        tags, // Include tags
        isModerator: false, // Default value
        comments: [], // Initialize with an empty array
        answerCommentId: 0, // Default value
      };

      addAdToLocalStorage(newAd); // Save the ad to local storage
      setAdLink(""); // Reset ad link
    } else {
      // Create new thread
      const threads = getThreadsFromLocalStorage();
      const newThread: Thread = {
        id: Date.now(),
        title,
        category,
        creationDate: new Date().toISOString(),
        description,
        creator: { userName: "guest", password: "password", isModerator: false },
        commentCount: 0,
        isLocked: false,
        tags, // Include tags
        isModerator: false,
        comments: [],
        answerCommentId: 0,
      };

      threads.push(newThread);
      saveThreadsToLocalStorage(threads);
    }

    // Reset form fields
    setTitle("");
    setCategory("THREAD");
    setDescription("");
    setAdLink(""); // Reset ad link
    setTags([]); // Reset tags
    setError(null);

    router.push("/"); // Redirect to homepage or wherever appropriate
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          Create New {category === "AD" ? "Ad" : "Thread"}
        </h1>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value as ThreadCategory)}
          >
            <option value="THREAD">THREAD</option>
            <option value="QNA">QNA</option>
            <option value="AD">AD</option> {/* Added option for ads */}
          </select>
        </div>

        {category === "AD" && ( // Show ad link input only if category is "AD"
          <div className="mb-6">
            <label
              htmlFor="adLink"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ad Link
            </label>
            <input
              id="adLink"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
              placeholder="Enter the ad link"
              value={adLink}
              onChange={(e) => setAdLink(e.target.value)}
            />
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
            placeholder="Enter the description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <div className="flex">
            <input
              id="tags"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
              placeholder="Enter a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2">
            {tags.map((tag) => (
              <span key={tag.id} className="mr-2 bg-gray-200 rounded-full px-2 py-1">
                {tag.name}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  &times; {/* Button to remove tag */}
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Display error message if exists */}
        {error && <p className="text-red-500 mb-6 font-semibold">{error}</p>}

        <button
          className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-[#333] focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          onClick={handleSubmit}
        >
          Create {category === "AD" ? "Ad" : "Thread"}
        </button>
      </div>
    </div>
  );
};

export default CreateThread;
