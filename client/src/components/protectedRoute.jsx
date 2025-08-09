import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  // If no user data in Redux, not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is provided but user role not included
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
