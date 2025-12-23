import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../../context/AuthProvider"

const UserNavbar = ({ onChooseCity }) => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/user/log-out-user")
      setUser(null)
    } catch (err) {
      console.error("Logout error", err)
    } finally {
      setUser(null)
      navigate("/user/login")
    }
  }

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT — Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-extrabold">
            F
          </div>
          <span className="text-xl font-extrabold text-gray-900">
            FoodApp
          </span>
        </div>

        {/* CENTER — City */}
        {user?.city && (
          <button
            onClick={onChooseCity}
            className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-orange-500"
          >
            <span className="capitalize">{user.city}</span>
            <span className="text-xs">▼</span>
          </button>
        )}

        {/* RIGHT — User | Cart | Logout */}
        <div className="flex items-center gap-6">

          {/* User name */}
          <div className="text-sm text-gray-700 font-medium">
            {user?.fullname || "User"}
          </div>

          {/* Cart */}
          <Link
            to="/user/cart"
            className="relative text-sm font-medium text-gray-600 hover:text-orange-500"
          >
            Cart
            {/* Cart count badge (wire later) */}
            <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default UserNavbar
