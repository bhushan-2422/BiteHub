import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext)

  // ⏳ Wait until auth is fully resolved
  if (loading) {
    return null // or spinner
  }

  // 🚫 Not logged in
  if (!user) {
    return <Navigate to={`/${role}/login`} replace />
  }

  // 🚫 Logged in but wrong role
  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/home`} replace />
  }

  // ✅ Authorized
  return children
}
