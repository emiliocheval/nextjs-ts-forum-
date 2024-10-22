'use client';

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FaRegCommentAlt, FaLock, FaUnlock, FaCheckCircle } from "react-icons/fa";

// Define the type for thread
interface Thread {
  id: number;
  category: string;
  creator: { userName: string };
  creationDate: string;
  title: string;
  description: string;
  commentCount: number;
  isLocked: boolean;
  isAnswered?: boolean; // Optional, since not all threads might have this field
}

interface ThreadCardProps {
  thread: Thread;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  return (
    <li className="relative"> {/* Make the list item relative */}
      <Link 
        href={`/${thread.id}`} 
        className="block bg-white border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-300 transition duration-200 ease-in-out"
      >
        <p className="text-xs font-bold text-gray-600 mb-1">r/{thread.category}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span>u/{thread.creator.userName}</span>
          <span className="mx-1">•</span>
          <span>{formatDistanceToNow(new Date(thread.creationDate))} ago</span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 transition-colors">
          {thread.title}
        </h2>
        <p className="text-sm text-gray-700 line-clamp-3">{thread.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <div className="flex items-center justify-center bg-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-400 transition-colors">
            <FaRegCommentAlt className="text-lg mr-1.5 text-gray-700" />
            <span className="text-sm font-semibold text-gray-700">{thread.commentCount}</span>
          </div>
        </div>

        {/* Lock status display */}
        <div className="absolute top-2 right-2 flex items-center">
          {thread.isLocked ? (
            <FaLock className="text-red-500 text-lg" title="Locked" />
          ) : (
            <FaUnlock className="text-green-500 text-lg" title="Unlocked" />
          )}
        </div>

        {/* Answered status display */}
        {thread.category === "QNA" && thread.isAnswered && (
          <div className="absolute bottom-2 right-2 flex items-center space-x-2">
            <p className="text-black text-sm">This thread already has an accepted answer</p>
            <FaCheckCircle className="text-blue-500 text-md" title="Answered" />
          </div>
        )}
      </Link>
    </li>
  );
};

export default ThreadCard;
