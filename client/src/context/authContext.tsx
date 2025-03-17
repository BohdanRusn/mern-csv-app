import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { AuthState, AuthContextType } from "../types";
import setAuthToken from "../utils/setAuthToken";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: string }
  | { type: "LOGIN_FAIL"; payload: string }
  | { type: "USER_LOADED"; payload: any }
  | { type: "AUTH_ERROR" }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERRORS" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAIL":
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error:
          action.type === "LOGIN_FAIL"
            ? action.payload
            : "Authentication error",
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get("/api/auth/user");
        dispatch({ type: "USER_LOADED", payload: res.data });
      } catch (err) {
        dispatch({ type: "AUTH_ERROR" });
      }
    } else {
      setAuthToken(null);
      dispatch({ type: "AUTH_ERROR" });
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      const token = res.data.token;
      setAuthToken(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: token });

      const userRes = await axios.get("/api/auth/user");
      dispatch({ type: "USER_LOADED", payload: userRes.data });

      return true;
    } catch (err: any) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response?.data?.message || "Login failed",
      });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      authState,
      login,
      logout,
      clearErrors,
    }),
    [authState, login, logout, clearErrors],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
