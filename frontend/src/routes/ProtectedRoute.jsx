import { Navigate } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or loader

  if (!user) {
    return <Navigate to={`/${role}/login`} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/home`} replace />;
  }

  return children;
}
