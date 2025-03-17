import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Spinner from "../layout/Spinner";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authState } = useAuth();

  if (authState.loading) {
    return <Spinner />;
  }

  if (!authState.isAuthenticated || !authState.user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
