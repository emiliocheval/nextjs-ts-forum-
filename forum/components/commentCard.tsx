"use client";

import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaCheckCircle } from "react-icons/fa";

type CommentCardProps = {
  comment: ThreadComment;
  thread: Thread | null;
  currentUser: User | null;
  onMarkAsAnswer: (commentId: number, markAsAnswer: boolean) => void;
};

const CommentCard: React.FC<CommentCardProps> = ({ comment, thread, currentUser, onMarkAsAnswer }) => {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    if (thread && thread.commentAnswerId === comment.id) {
      setIsAnswered(true);
    } else {
      setIsAnswered(false);
    }
  }, [thread, comment.id]);

  const handleClick = () => {
    if (currentUser?.isModerator && thread?.category === "QNA") {
      const markAsAnswer = !isAnswered;
      setIsAnswered(markAsAnswer);
      onMarkAsAnswer(comment.id, markAsAnswer);
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 p-3 rounded-lg mb-2">
      <div className="flex items-center text-xs text-gray-500 mb-1">
        <span>u/{comment.creator.userName}</span>
        <span className="mx-1">•</span>
        <span>{formatDistanceToNow(new Date(comment.creationDate))} ago</span>
      </div>
      <p className="text-sm text-gray-800">{comment.content}</p>

      {thread && thread.category === "QNA" && currentUser?.isModerator && (
        <button
          onClick={handleClick}
          className={`mt-2 px-4 py-2 rounded text-sm ${isAnswered ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} hover:bg-opacity-75`}
        >
          {isAnswered ? "Unmark as Answer" : "Mark as Answer"}
        </button>
      )}

      {isAnswered && (
        <div className="flex items-center space-x-2 text-sm text-black mt-2">
          <FaCheckCircle className="text-blue-500" title="Answered" />
          <span>This comment is marked as the answer</span>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
