export interface User {
  userId: string;
  username: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

export interface DataItem {
  [key: string]: unknown;
  _id: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearErrors: () => void;
}

export interface DataContextType {
  data: DataItem[];
  loading: boolean;
  error: string | null;
  uploadCSV: (file: File) => Promise<void>;
  fetchData: () => Promise<void>;
}
