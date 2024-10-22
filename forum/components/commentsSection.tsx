"use client";

import React, { useState, useEffect } from "react";
import CommentCard from "@/components/commentCard"; // Adjust import if necessary

type CommentsSectionProps = {
  threadId: number;
  initialComments: ThreadComment[];
  onAddComment: (content: string) => void;
  isLocked: boolean;
  onMarkAsAnswer: (commentId: number, markAsAnswer: boolean) => void;
  thread: Thread;
  currentUser: User | null;
};

const CommentsSection: React.FC<CommentsSectionProps> = ({
  threadId,
  initialComments,
  onAddComment,
  isLocked,
  onMarkAsAnswer,
  thread,
  currentUser
}) => {
  const [comments, setComments] = useState<ThreadComment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleAddComment = () => {
    if (newComment.trim() !== "" && !isLocked) {
      onAddComment(newComment.trim());
      setNewComment(""); // Clear the text area after submission
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Comments</h2>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          thread={thread}
          currentUser={currentUser}
          onMarkAsAnswer={onMarkAsAnswer}
        />
      ))}
      <div className="mt-4 text-black">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          disabled={isLocked}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleAddComment}
          disabled={isLocked}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
