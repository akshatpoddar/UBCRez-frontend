import { User } from './User';

export interface Message {
    _id: string;
    sender: User;
    receiver: User;
    content: string;
    timestamp: string;
    postId: string;
  }