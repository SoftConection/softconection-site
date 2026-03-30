import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { hasSomeRole, type PlatformRole } from "@/lib/accessControl";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: PlatformRole | PlatformRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!hasSomeRole(user?.role, requiredRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
