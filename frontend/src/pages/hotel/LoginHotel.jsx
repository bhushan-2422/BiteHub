import { useState, useContext } from "react"
import axios from "axios"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"

const LoginHotel = () => {
  // ✅ ALL hooks at the top
  const navigate = useNavigate()
  const { user, loading: authLoading } = useContext(AuthContext)

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // ⏳ wait for auth check
  if (authLoading) return null

  // 🔐 already logged in → redirect based on role
  if (user) {
    return <Navigate to={`/${user.role}/home`} replace />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      setSubmitting(true)

      await axios.post("/api/v1/hotel/login-hotel", {
        email: form.email,
        phone: form.phone,
        password: form.password,
      })

      navigate("/hotel/home")
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT – Branding */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-orange-500 to-orange-700 text-white">
          <h2 className="text-3xl font-extrabold">Hotel Partner Login</h2>
          <p className="mt-4 text-sm text-orange-100">
            Manage orders, menus, and grow your restaurant.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-orange-100">
            <li>• Real-time orders</li>
            <li>• Menu management</li>
            <li>• Sales insights</li>
          </ul>
        </div>

        {/* RIGHT – Form */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Login to Your Hotel Account
          </h3>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />

            <input
              name="phone"
              placeholder="Registered Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/[^0-9]/g, ""),
                }))
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-60"
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            New restaurant partner?{" "}
            <Link to="/hotel/register" className="text-orange-500 font-medium">
              Register your hotel
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginHotel
