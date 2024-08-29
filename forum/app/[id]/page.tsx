'use client'
import { getCommentsFromLocalStorage, getThreadsFromLocalStorage, saveCommentToLocalStorage } from "@/utils/localStorage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ThreadPage = () => {
  const { id } = useParams()

  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<ThreadComment[]>([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (id) {
      const storedThreads = getThreadsFromLocalStorage();
      const selectedThread = storedThreads.find(t => t.id === Number(id));
      setThread(selectedThread || null);

      const threadComments = getCommentsFromLocalStorage(Number(id));
      setComments(threadComments);
    }
  }, [id]);

  const handleAddComment = () => {
    const newComment: ThreadComment = {
      id: Date.now(),
      thread: Number(id),
      content: commentContent,
      creator: { userName: "guest", password: "password" }, // Placeholder user
    };
  
    saveCommentToLocalStorage(newComment);
    setComments([...comments, newComment]);
    setCommentContent("");
  };

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{thread.title}</h1>
      <p>{thread.description}</p>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content} by {comment.creator.userName}</li>
        ))}
      </ul>
      <textarea
        placeholder="Add a comment"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default ThreadPage;