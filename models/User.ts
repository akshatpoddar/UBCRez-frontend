// models/User.ts
export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    major?: string;
    year?: Number;
    bio?: string;
  }
  