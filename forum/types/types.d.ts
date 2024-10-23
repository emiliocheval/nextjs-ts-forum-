// Updated types.ts

type ThreadCategory = "THREAD" | "QNA" | "AD"; // Updated to include "AD"

type User = {
  userName: string;
  password: string;
  isModerator: boolean; // Moderator status
  profilePic?: string;  // Optional profile picture URL
  aboutMe?: string;     // Optional "About Me" description
};

type ThreadTag = {
  id: number;
  name: string;
};

type ThreadComment = {
  isAnswered: boolean;
  id: number;
  thread: number;
  content: string;
  creator: User;
  creationDate: string;
  parentCommentId?: number; // Optional for nested comments
  replies?: ThreadComment[];  // Optional replies
};

type Thread = {
  answerCommentId: number;
  comments: ThreadComment[];
  id: number;
  title: string;
  category: ThreadCategory; // Should accept "AD"
  creationDate: string;
  description: string;
  creator: User;
  commentCount: number;
  isLocked: boolean; // Indicates if the thread is locked
  tags: ThreadTag[]; // Tags for the thread
  isAnswered?: boolean; // Optional for QNA threads
  commentAnswerId?: number; // ID of the answer for QNA threads
  isModerator: boolean; // Indicates if the thread creator is a moderator
};

// Define properties for page components
type ThreadDetailPageProps = {
  params: {
    id: string; // Dynamic route parameter
  };
};

// Define types for QNA threads
type QNAThread = Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: number; // Optional: ID of the comment marked as the answer
};

// Additional props types
type TagManagementProps = {
  thread: Thread;
};

type ThreadLockControlProps = {
  thread: Thread;
};

type MarkAsAnswerProps = {
  threadId: number;
  threadCreator: User;
  currentUser: User;
};

type AdvertisementClickthroughProps = {
  advertisementId: number; // ID of the advertisement clicked
  userId?: number; // Optional: User ID if logged in
};

type Advertisement = Thread & { // Extend Thread for Advertisement
  category: "AD"; // Must be "AD"
  link: string; // Link to the advertisement
};

type AdvertisementClickthrough = {
  advertisement: number; // ID of the clicked advertisement
  user?: number; // Optional user ID if logged in
};


