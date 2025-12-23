import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ MUST be here (top-level)
  const fetchCurrentUser = async () => {
    // 1️⃣ USER
    try {
      const res = await axios.get(
        "/api/v1/user/get-current-user",
        { withCredentials: true }
      )
      setUser({ ...res.data.data, role: "user" })
      return
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("User /me error:", err)
      }
    }

    // 2️⃣ HOTEL
    try {
      const res = await axios.get(
        "/api/v1/hotel/get-current-user",
        { withCredentials: true }
      )
      setUser({ ...res.data.data, role: "hotel" })
      return
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Hotel /me error:", err)
      }
    }

    // 3️⃣ PARTNER
    try {
      const res = await axios.get(
        "/api/v1/partner/get-current-user",
        { withCredentials: true }
      )
      setUser({ ...res.data.data, role: "partner" })
      return
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Partner /me error:", err)
      }
    }

    // 4️⃣ Nobody logged in
    setUser(null)
  }

  // ✅ initial auth check
  useEffect(() => {
    fetchCurrentUser().finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser: fetchCurrentUser, // ✅ now REAL
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
