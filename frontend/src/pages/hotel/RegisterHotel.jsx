import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const RegisterHotel = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    password: "",
  })

  const [hotelAvatar, setHotelAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value)
    })

    if (!hotelAvatar) {
      setError("Hotel image is required")
      return
    }

    formData.append("hotelAvatar", hotelAvatar)

    try {
      setLoading(true)
      await axios.post("/api/v1/hotel/register-hotel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      navigate("/hotel/login")
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT – Orange Hotel Panel */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-orange-500 to-orange-700 text-white">
          <h2 className="text-3xl font-extrabold">Grow Your Restaurant</h2>
          <p className="mt-4 text-sm text-orange-100">
            Join our platform and reach thousands of hungry customers.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-orange-100">
            <li>• Instant online presence</li>
            <li>• Real-time order management</li>
            <li>• Increased daily revenue</li>
          </ul>

          <div className="mt-8 text-xs text-orange-200">
            Trusted by local restaurants & cloud kitchens
          </div>
        </div>

        {/* RIGHT – Form */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Hotel Registration
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Enter your restaurant’s business details
          </p>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              name="name"
              placeholder="Hotel / Restaurant Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="latitude"
                placeholder="Latitude"
                value={form.latitude}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
              <input
                name="longitude"
                placeholder="Longitude"
                value={form.longitude}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>

            <input
              name="phone"
              placeholder="Phone Number"
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
              type="email"
              name="email"
              placeholder="Business Email"
              value={form.email}
              onChange={handleChange}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hotel Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHotelAvatar(e.target.files[0])}
                className="w-full text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register Hotel"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already registered?{" "}
            <Link to="/hotel/login" className="text-orange-500 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterHotel
