"use client";

import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaCheckCircle } from "react-icons/fa";

type CommentCardProps = {
  comment: ThreadComment;
  thread: Thread | null;
  currentUser: User | null;
  onMarkAsAnswer: (commentId: number, markAsAnswer: boolean) => void;
  onAddReply: (content: string, parentCommentId: number) => void;
  replies: ThreadComment[]; // Pass replies as props
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  thread,
  currentUser,
  onMarkAsAnswer,
  onAddReply,
  replies, // Get replies from props
}) => {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>(""); 
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

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

  const handleReply = () => {
    if (replyContent.trim() !== "") {
      onAddReply(replyContent.trim(), comment.id);
      setReplyContent(""); 
      setShowReplyInput(false); 
    }
  };

  const isReply = comment.parentCommentId !== undefined; 

  return (
    <div className="relative bg-gray-100 border border-gray-300 p-3 rounded-lg mb-2">
      {isAnswered && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 text-sm text-black">
          <span>This comment is marked as the answer</span>
          <FaCheckCircle className="text-blue-500" title="Answered" />
        </div>
      )}

      <div className="flex items-center text-xs text-gray-500 mb-1">
        <span>u/{comment.creator.userName}</span>
        <span className="mx-1">•</span>
        <span>{formatDistanceToNow(new Date(comment.creationDate))} ago</span>
      </div>
      <p className="text-sm text-gray-800">{comment.content}</p>

      <div className="flex justify-end space-x-2 mt-4">
        {thread && thread.category === "QNA" && currentUser?.isModerator && (
          <button
            onClick={handleClick}
            className="px-3 py-1 rounded-full text-sm text-black bg-transparent hover:bg-[#333] hover:text-white transition duration-300"
          >
            {isAnswered ? "Unmark as Answer" : "Mark as Answer"}
          </button>
        )}

        {!isReply && currentUser && ( // Check if user is logged in
          <button
            onClick={() => setShowReplyInput((prev) => !prev)}
            className="bg-transparent text-black px-3 py-1 rounded-full text-sm hover:bg-[#333] hover:text-white transition duration-300"
          >
            {showReplyInput ? "Cancel Reply" : "Reply"}
          </button>
        )}
      </div>

      {showReplyInput && !isReply && (
        <div className="mt-2">
          {currentUser ? ( // Check if user is logged in
            <>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="border p-2 w-full rounded text-black"
              />
              <button
                onClick={handleReply}
                className="bg-transparent text-black mt-2 px-3 py-1 rounded-full text-sm hover:bg-[#333] hover:text-white transition duration-300"
              >
                Add Reply
              </button>
            </>
          ) : (
            <div className="text-gray-500">
              Please log in to reply.
            </div>
          )}
        </div>
      )}

      {/* Render replies */}
      {replies.map((reply) => (
        <div key={reply.id} className="ml-4">
          <CommentCard 
            comment={reply}
            thread={thread}
            currentUser={currentUser}
            onMarkAsAnswer={onMarkAsAnswer}
            onAddReply={onAddReply}
            replies={[]} // Pass empty replies to avoid nesting infinitely
          />
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
