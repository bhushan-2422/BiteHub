import { useState } from "react"
import axios from "axios"

const CitySidebar = ({ open, onClose, onCitySaved }) => {
  const [city, setCity] = useState("")
  const [saving, setSaving] = useState(false)

  const saveCity = async () => {
    if (!city.trim()) return

    try {
      setSaving(true)

      const normalizedCity = city.toLowerCase().replace(/\s+/g, "")
      const res = await axios.post("/api/v1/user/change-city", { city: normalizedCity })
      console.log(res)
      onCitySaved()
    } catch (err) {
      console.error("City update failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${
        open ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute left-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Select your city</h2>

          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />

          <button
            onClick={saveCity}
            disabled={saving}
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CitySidebar
