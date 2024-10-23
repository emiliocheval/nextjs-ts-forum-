const THREADS_KEY = 'forum_threads';
const COMMENTS_KEY = 'forum_comments';
const USERS_KEY = 'users'; 
const CURRENT_USER_KEY = 'currentUser'; 
const ADS_KEY = 'forum_ads'; // Add this constant


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
      return { ...thread, commentCount };
    });
  }
  return [];
};

// Save comments to local storage
export const saveCommentsToLocalStorage = (comments: ThreadComment[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  }
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
    const allComments: ThreadComment[] = comments ? JSON.parse(comments) : [];
    return allComments.filter(comment => comment.thread === threadId);
  }
  return [];
};

// Save a new comment to local storage
export const saveCommentToLocalStorage = (comment: ThreadComment): void => {
  if (typeof window !== 'undefined') {
    const comments = localStorage.getItem(COMMENTS_KEY);
    const allComments: ThreadComment[] = comments ? JSON.parse(comments) : [];
    allComments.push(comment);
    saveCommentsToLocalStorage(allComments);

    // Update comment count for each thread
    const threads = getThreadsFromLocalStorage();
    const updatedThreads = threads.map(thread => {
      if (thread.id === comment.thread) {
        return {
          ...thread,
          commentCount: allComments.filter(c => c.thread === thread.id).length
        };
      }
      return thread;
    });

    saveThreadsToLocalStorage(updatedThreads);
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
export const registerUser = (userName: string, password: string, aboutMe?: string, profilePic?: string): boolean => {
  const users = getUsersFromLocalStorage();
  
  if (users.some(user => user.userName === userName)) {
    return false; // Username already exists
  }

  users.push({
    userName,
    password,
    isModerator: false,
    aboutMe: aboutMe || "", 
    profilePic: profilePic || "" 
  });
  saveUsersToLocalStorage(users);
  return true; 
};

// Login user
export const loginUser = (userName: string, password: string): boolean => {
  const users = getUsersFromLocalStorage();
  const user = users.find(user => user.userName === userName && user.password === password);

  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return true; 
  }
  return false; 
};

// Get the currently logged-in user
export const getCurrentUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (user) {
      const parsedUser: User = JSON.parse(user);
      return {
        userName: parsedUser.userName,
        password: parsedUser.password,
        isModerator: parsedUser.isModerator,
        aboutMe: parsedUser.aboutMe || "", 
        profilePic: parsedUser.profilePic || "", 
      };
    }
  }
  return null; 
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
  const user = users.find((u: User) => u.userName === userName);

  if (user) {
    user.isModerator = true; 
    saveUsersToLocalStorage(users); 
    return true; 
  }

  return false; 
};

// Demote user from moderator
export const demoteFromModerator = (userName: string): boolean => {
  const users = getUsersFromLocalStorage();
  const user = users.find((u: User) => u.userName === userName);

  if (user) {
    user.isModerator = false; 
    saveUsersToLocalStorage(users); 
    return true; 
  }

  return false; 
};

// Retrieve advertisements from local storage
// In your localStorage.ts file
export const getAdsFromLocalStorage = (): Advertisement[] => {
  if (typeof window !== 'undefined') {
    const ads = localStorage.getItem(ADS_KEY);
    return ads ? JSON.parse(ads) : [];
  }
  return [];
};


// Save advertisements to local storage
export const saveAdsToLocalStorage = (ads: Advertisement[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADS_KEY, JSON.stringify(ads));
  }
};

// Example of how to add a new ad
export const addAdToLocalStorage = (ad: Advertisement): void => {
  if (typeof window !== 'undefined') {
    const ads = getAdsFromLocalStorage();
    ads.push(ad);
    saveAdsToLocalStorage(ads);
  }
};

