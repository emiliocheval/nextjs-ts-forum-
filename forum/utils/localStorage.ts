const THREADS_KEY = 'forum_threads';
const COMMENTS_KEY = 'forum_comments';

export const getThreadsFromLocalStorage = (): Thread[] => {
  if (typeof window !== 'undefined') {
    const threads = localStorage.getItem(THREADS_KEY);
    return threads ? JSON.parse(threads) : [];
  }
  return [];
};

export const saveThreadsToLocalStorage = (threads: Thread[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
  }
};

export const getCommentsFromLocalStorage = (threadId: number): ThreadComment[] => {
  if (typeof window !== 'undefined') {
    const comments = localStorage.getItem(COMMENTS_KEY);
    const allComments = comments ? JSON.parse(comments) : [];
    return allComments.filter((comment: ThreadComment) => comment.thread === threadId);
  }
  return [];
};

export const saveCommentToLocalStorage = (comment: ThreadComment): void => {
  if (typeof window !== 'undefined') {
    const comments = localStorage.getItem(COMMENTS_KEY);
    const allComments = comments ? JSON.parse(comments) : [];
    allComments.push(comment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  }
};