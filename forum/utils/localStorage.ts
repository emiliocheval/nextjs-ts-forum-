const THREADS_KEY = 'forum_threads';
const COMMENTS_KEY = 'forum_comments';
const USERS_KEY = 'users'; // Key to store users
const CURRENT_USER_KEY = 'currentUser'; // Key to store currently logged-in user

// Define Thread and ThreadComment interfaces
interface Thread {
  id: number;
  title: string;
  content: string;
  isLocked?: boolean; // Optional property to lock threads
}

interface ThreadComment {
  id: number;
  thread: number; // Thread ID
  content: string;
}

// Define User interface
interface User {
  userName: string;
  password: string;
  isModerator: boolean;
  aboutMe?: string; // Optional property
  profilePic?: string; // Optional property
}

// Retrieve threads from local storage
export const getThreadsFromLocalStorage = (): Thread[] => {
  if (typeof window !== 'undefined') {
    const threads = localStorage.getItem(THREADS_KEY);
    const parsedThreads: Thread[] = threads ? JSON.parse(threads) : [];

    // Calculate comment counts for each thread
    const comments = localStorage.getItem(COMMENTS_KEY);
    const allComments: ThreadComment[] = comments ? JSON.parse(comments) : [];

    return parsedThreads.map(thread => {
      const commentCount = allComments.filter(comment => comment.thread === thread.id).length;
      return { ...thread, commentCount }; // Add commentCount to each thread
    });
  }
  return [];
};

// Save threads to local storage
export const saveThreadsToLocalStorage = (threads: Thread[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
  }
};

// Retrieve comments for a specific thread
export const getCommentsFromLocalStorage = (threadId: number): ThreadComment[] => {
  if (typeof window !== 'undefined') {
    const comments = localStorage.getItem(COMMENTS_KEY);
    const allComments = comments ? JSON.parse(comments) : [];
    return allComments.filter((comment: ThreadComment) => comment.thread === threadId);
  }
  return [];
};

// Save a new comment to local storage
export const saveCommentToLocalStorage = (comment: ThreadComment): void => {
  if (typeof window !== 'undefined') {
    const comments = localStorage.getItem(COMMENTS_KEY);
    const allComments = comments ? JSON.parse(comments) : [];
    allComments.push(comment);
    
    // Update comment count for each thread
    const threads = getThreadsFromLocalStorage();
    const updatedThreads = threads.map(thread => {
      if (thread.id === comment.thread) {
        return {
          ...thread,
          commentCount: allComments.filter((c: { thread: number; }) => c.thread === thread.id).length
        };
      }
      return thread;
    });
    
    saveThreadsToLocalStorage(updatedThreads);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  }
};

// Retrieve users from local storage
export const getUsersFromLocalStorage = (): User[] => {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }
  return [];
};

// Save users to local storage
export const saveUsersToLocalStorage = (users: User[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

// Register a new user
export const registerUser = (userName: string, password: string, aboutMe?: string, profilePic?: string) => {
  const users = getUsersFromLocalStorage();
  
  if (users.some(user => user.userName === userName)) {
    return false; // Username already exists
  }

  users.push({
    userName,
    password,
    isModerator: false,
    aboutMe: aboutMe || "", // Set default to empty string if undefined
    profilePic: profilePic || "" // Set default to empty string if undefined
  });
  saveUsersToLocalStorage(users);
  return true; // Registration successful
};

// Login user
export const loginUser = (userName: string, password: string): boolean => {
  const users = getUsersFromLocalStorage();
  const user = users.find(user => user.userName === userName && user.password === password);

  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return true; // Login successful
  }
  return false; // Invalid credentials
};

// Get the currently logged-in user
export const getCurrentUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (user) {
      const parsedUser = JSON.parse(user);
      return {
        userName: parsedUser.userName,
        password: parsedUser.password,
        isModerator: parsedUser.isModerator,
        aboutMe: parsedUser.aboutMe || "", // Fallback to empty string
        profilePic: parsedUser.profilePic || "", // Fallback to empty string
      } as User; // Cast as User to ensure the type matches
    }
  }
  return null; // Return null if no user is found
};






// Clear the current user from local storage
export const clearCurrentUserFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Example: Get current user with type guard
export const getCurrentUser = (): User | null => {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
  return user && typeof user.userName === 'string' && typeof user.password === 'string' && typeof user.isModerator === 'boolean'
    ? user
    : null;
};

// Clear current user
export const clearCurrentUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Lock a thread
export const lockThread = (threadId: number): void => {
  const threads = getThreadsFromLocalStorage();
  const thread = threads.find(t => t.id === threadId);

  if (thread) {
    thread.isLocked = true;
    saveThreadsToLocalStorage(threads);
  }
};

// Unlock a thread
export const unlockThread = (threadId: number): void => {
  const threads = getThreadsFromLocalStorage();
  const thread = threads.find(t => t.id === threadId);

  if (thread) {
    thread.isLocked = false;
    saveThreadsToLocalStorage(threads);
  }
};

// Promote user to moderator
export const promoteToModerator = (userName: string): boolean => {
  const users = getUsersFromLocalStorage();
  const user = users.find((u: { userName: string }) => u.userName === userName);

  if (user) {
    user.isModerator = true; // Promote to moderator
    saveUsersToLocalStorage(users); // Save updated users back to localStorage
    return true; // Successfully promoted
  }

  return false; // User not found
};

// Demote user from moderator
export const demoteFromModerator = (userName: string): boolean => {
  const users = getUsersFromLocalStorage();
  const user = users.find((u: { userName: string }) => u.userName === userName);

  if (user) {
    user.isModerator = false; // Demote from moderator
    saveUsersToLocalStorage(users); // Save updated users back to localStorage
    return true; // Successfully demoted
  }

  return false; // User not found
};
