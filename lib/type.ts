export interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  barId: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
}
