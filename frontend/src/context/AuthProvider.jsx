import { createContext, useEffect, useState } from "react"
import axios from "axios"
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)   // user | hotel | partner
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      // 1️⃣ try USER
      try {
        const res = await axios.get("/api/v1/user/get-current-user")
        setUser({ ...res.data.data, role: "user" })
        return
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("User /me error:", err)
        }
      }

      // 2️⃣ try HOTEL
      try {
        const res = await axios.get("/api/v1/hotel/get-current-user")
        setUser({ ...res.data.data, role: "hotel" })
        return
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Hotel /me error:", err)
        }
      }

      // 3️⃣ try PARTNER
      try {
        const res = await axios.get("/api/v1/partner/get-current-user")
        setUser({ ...res.data.data, role: "partner" })
        return
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Partner /me error:", err)
        }
      }

      // 4️⃣ nobody logged in
      setUser(null)
    }

    fetchCurrentUser().finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
