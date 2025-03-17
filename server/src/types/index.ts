export interface User {
  userId: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface DataItem {
  [key: string]: any;
}

export interface AuthPayload {
  user: {
    userId: string;
    username: string;
  };
}
