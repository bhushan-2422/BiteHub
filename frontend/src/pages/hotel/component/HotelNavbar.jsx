import { Link, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthProvider" 

const HotelNavbar = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return null

  // Safety: if somehow navbar renders without hotel auth
  if (!user || user.role !== "hotel") {
    return <Navigate to="/hotel/login" replace />
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-extrabold">
          <span className="text-orange-600">Foodly</span>
          <span className="text-gray-800">Partner</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link to="/hotel/home" className="hover:text-orange-600">
            Home
          </Link>
          <Link to="/hotel/add-menu" className="hover:text-orange-600">
            Add Menu
          </Link>
          <Link to="/hotel/dashboard" className="hover:text-orange-600">
            Dashboard
          </Link>
          <Link to="/hotel/sales" className="hover:text-orange-600">
            View Sales
          </Link>
          <Link to="/hotel/profile" className="hover:text-orange-600">
            Profile
          </Link>
        </div>

        {/* User / Logout */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-gray-600">
            {user.name}
          </span>

          <button
            onClick={() => {
              // later replace with proper logout API
              window.location.href = "/hotel/login"
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default HotelNavbar
