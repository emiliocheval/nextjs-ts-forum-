// Updated types.ts

type ThreadCategory = "THREAD" | "QNA" | "AD";

type User = {
  userName: string;
  password: string;
  isModerator: boolean; // Updated to include moderator status
};


type ThreadTag = {
  id: number;
  name: string;
};

type Thread = {
  answerCommentId: number;
  comments: ThreadComment[];
  id: number;
  title: string;
  category: ThreadCategory;
  creationDate: string;
  description: string;
  creator: User;
  commentCount: number;
  isLocked: boolean;  // New property to indicate if the thread is locked
  tags: ThreadTag[];  // New property to include tags for the thread
  isAnswered?: boolean;  // Optional property for QNA threads
  commentAnswerId?: number;  // Optional: ID of the comment marked as the answer for QNA threads
  isModerator: boolean;
};



type QNAThread = Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: number;
};

type Advertisement = Thread & {
  category: "AD";
  link: string;
};

type AdvertisementClickthrough = {
  advertisement: number;
  user?: number;  // Optional: stores user info if logged in
};

type ThreadComment = {
  isAnswered: boolean;
  id: number;
  thread: number;
  content: string;
  creator: User;
  creationDate: string;
  parentCommentId?: number;  // Optional: stores ID of the parent comment for nested comments
};

// For managing tags in threads
type TagManagementProps = {
  thread: Thread;
};

// For thread lock control by moderators
type ThreadLockControlProps = {
  thread: Thread;
};

// For marking comments as answers in QNA threads
type MarkAsAnswerProps = {
  threadId: number;
  threadCreator: User;
  currentUser: User;
};

// For handling advertisement clicks
type AdvertisementClickthroughProps = {
  advertisementId: number;
  userId?: number;  // Optional: stores user ID if logged in
};


