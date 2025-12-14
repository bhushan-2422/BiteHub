import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../context/AuthProvider"
import HotelNavbar from "./component/HotelNavbar"
import HotelFooter from "./component/HotelFooter"

const CATEGORIES = [
  "rice",
  "breakfast",
  "soups",
  "south indian",
  "beverages",
  "breads",
  "other",
]

const AddMenu = () => {
  const { user, loading } = useContext(AuthContext)

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
  })

  const [itemAvatar, setItemAvatar] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  if (loading) return null
  if (!user || user.role !== "hotel") {
    return <Navigate to="/hotel/login" replace />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!itemAvatar) {
      setError("Item image is required")
      return
    }

    try {
      setSubmitting(true)

      const formData = new FormData()
      formData.append("title", form.title)
      formData.append("price", form.price)
      formData.append("category", form.category)
      formData.append("itemAvatar", itemAvatar)

      await axios.post("/api/v1/hotel/add-menu-items", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setSuccess("Menu item added successfully")
      setForm({ title: "", price: "", category: "" })
      setItemAvatar(null)
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add menu item")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">

      {/* Navbar */}
      <HotelNavbar />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Add Menu Item
            </h1>
            <p className="mt-2 text-gray-600">
              Create a new food item for your restaurant menu.
            </p>
          </div>

          {/* Card */}
          <div className="relative bg-[#fffaf5] rounded-3xl shadow-xl border border-orange-200 p-8">

            {/* Accent strip */}
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-orange-400 to-orange-600" />

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Paneer Butter Masala"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="250"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setItemAvatar(e.target.files[0])}
                  className="w-full text-sm text-gray-600
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-xl file:border-0
                             file:bg-orange-500 file:text-white
                             hover:file:bg-orange-600"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-60"
              >
                {submitting ? "Adding Item..." : "Add Menu Item"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <HotelFooter />
    </div>
  )
}

export default AddMenu
