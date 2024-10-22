"use client";

import React, { useState, useEffect } from "react";
import { getThreadsFromLocalStorage, saveThreadsToLocalStorage } from "../../utils/localStorage";
import { FaCheckCircle } from "react-icons/fa";

type MarkAsAnswerProps = {
  threadId: number;
  threadCreator: User;
  currentUser: User;
};

const MarkAsAnswer: React.FC<MarkAsAnswerProps> = ({ threadId, threadCreator, currentUser }) => {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    const threads = getThreadsFromLocalStorage();
    const currentThread = threads.find(thread => thread.id === threadId && thread.category === 'QNA');
    setIsAnswered(currentThread?.isAnswered ?? false);
  }, [threadId]);

  const handleMarkAsAnswer = () => {
    const threads = getThreadsFromLocalStorage();
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId && thread.category === 'QNA') {
        const newIsAnswered = !isAnswered;
        thread.isAnswered = newIsAnswered;
        setIsAnswered(newIsAnswered);
      }
      return thread;
    });
    saveThreadsToLocalStorage(updatedThreads);
  };

  return (
    <div>
      {isAnswered ? (
        <div className="flex items-center space-x-2">
          <p className="text-black text-sm">This thread already has an accepted answer</p>
          <FaCheckCircle className="text-blue-500 text-md" title="Answered" />
          {currentUser.isModerator && (
            <button 
              onClick={handleMarkAsAnswer} 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Undo
            </button>
          )}
        </div>
      ) : (
        currentUser.isModerator && (
          <button 
            onClick={handleMarkAsAnswer} 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Mark as Answer
          </button>
        )
      )}
    </div>
  );
};

export default MarkAsAnswer;
