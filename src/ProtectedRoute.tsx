import React from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useAuth } from "./contexts/authContext";

interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string; // You can pass the path here manually
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const { user } = useAuth();

  if (!user) {
    const token = sessionStorage.getItem("accessToken");
    console.log(token);
    if (!token) return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
