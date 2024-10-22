"use client";

import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import CommentsSection from "../../components/commentsSection";
import { getThreadsFromLocalStorage, getCurrentUser, saveThreadsToLocalStorage } from "../../utils/localStorage";
import { FaCheckCircle, FaLock, FaUnlock } from "react-icons/fa";

type ThreadDetailPageProps = {
  params: {
    id: string; // Dynamic route parameter
  };
};

const ThreadDetailPage: React.FC<ThreadDetailPageProps> = ({ params }) => {
  const { id } = params;
  const threadId = parseInt(id, 10);

  const [thread, setThread] = useState<Thread | null>(null);
  const [isModerator, setIsModerator] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const threads = getThreadsFromLocalStorage();
    const selectedThread = threads.find((t) => t.id === threadId) ?? null;
    setThread(selectedThread);

    if (selectedThread) {
      setIsLocked(selectedThread.isLocked);
    }

    const user = getCurrentUser();
    if (user && isUser(user)) {
      setCurrentUser(user);
      setIsModerator(user.isModerator);
    } else {
      setCurrentUser(null);
      setIsModerator(false);
    }
  }, [id]);

  const handleLockStatusChange = (locked: boolean) => {
    if (thread) {
      const updatedThread = { ...thread, isLocked: locked };
      setThread(updatedThread);
      setIsLocked(locked);

      // Update in localStorage
      const threads = getThreadsFromLocalStorage();
      const updatedThreads = threads.map(t => t.id === threadId ? updatedThread : t);
      saveThreadsToLocalStorage(updatedThreads);
    }
  };

  const handleMarkAsAnswer = (commentId: number, markAsAnswer: boolean) => {
    if (thread && thread.category === "QNA") {
      const updatedThread = {
        ...thread,
        isAnswered: markAsAnswer,
        commentAnswerId: markAsAnswer ? commentId : undefined
      };
      setThread(updatedThread);

      // Update in localStorage
      const threads = getThreadsFromLocalStorage();
      const updatedThreads = threads.map(t => t.id === threadId ? updatedThread : t);
      saveThreadsToLocalStorage(updatedThreads);
    }
  };

  const handleAddComment = (content: string) => {
    if (thread && currentUser) {
      const newComment: ThreadComment = {
        id: Date.now(), // Generate a unique ID
        content,
        creationDate: new Date().toISOString(),
        creator: currentUser,
        thread: thread.id,
        isAnswered: false, // Default to false
        parentCommentId: undefined // Adjust if nested comments are supported
      };
  
      const updatedThread = {
        ...thread,
        comments: [...thread.comments, newComment],
        commentCount: (thread.commentCount || 0) + 1 // Update comment count
      };
      setThread(updatedThread);
  
      // Update in localStorage
      const threads = getThreadsFromLocalStorage();
      const updatedThreads = threads.map(t => t.id === threadId ? updatedThread : t);
      saveThreadsToLocalStorage(updatedThreads);
    }
  };

  if (!thread) {
    return <p>Thread not found</p>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Thread Details Card */}
        <div className="relative bg-white border rounded-lg p-6 shadow-lg mb-6">
          <h1 className="text-lg font-semibold text-gray-800 transition-colors">{thread.title}</h1>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="ml">u/{thread.creator.userName}</span>
            <span className="mx-1">•</span>
            <span>{formatDistanceToNow(new Date(thread.creationDate))} ago</span>
          </div>
          <p className="text-gray-700 mb-6">{thread.description}</p>

          {thread.isAnswered && thread.category === "QNA" && (
            <div className="flex items-center space-x-2 text-sm text-black">
              <FaCheckCircle className="text-blue-500" title="Answered" />
              <span>This thread has been marked as answered</span>
            </div>
          )}

          {/* Lock/Unlock Button */}
          {isModerator && (
            <div className="absolute bottom-2 right-2">
              <button 
                onClick={() => handleLockStatusChange(!isLocked)} 
                className="text-black text-xl p-2"
                title={isLocked ? "Unlock Thread" : "Lock Thread"}
              >
                {isLocked ? <FaUnlock /> : <FaLock />}
              </button>
            </div>
          )}
        </div>

        {/* Lock Status Message */}
        <div className="mb-2">
          {isLocked ? (
            <div className="flex items-center text-red-500">
              <span>This thread is currently locked</span>
            </div>
          ) : (
            <div className="flex items-center text-green-500">
              <span>This thread is currently unlocked</span>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <CommentsSection
          threadId={thread.id}
          initialComments={thread.comments}
          onAddComment={handleAddComment} // Pass the handler to CommentsSection
          isLocked={isLocked}
          onMarkAsAnswer={handleMarkAsAnswer}
          thread={thread}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.userName === "string" &&
    typeof obj.password === "string" &&
    typeof obj.isModerator === "boolean"
  );
}

export default ThreadDetailPage;
