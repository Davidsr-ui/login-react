import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// role opcional: si se indica, el usuario debe tenerlo
export default function ProtectedRoute({ role, children }) {
  const { user, hasRole } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && !hasRole(role)) return <Navigate to="/" replace />;
  return children;
}
