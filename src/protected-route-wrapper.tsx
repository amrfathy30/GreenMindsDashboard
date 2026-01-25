import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const adminToken = localStorage.getItem("GMadminToken");

  if (!adminToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};