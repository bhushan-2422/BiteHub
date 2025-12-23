import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthProvider"
import UserNavbar from "./components/UserNavbar"
import UserFooter from "./components/UserFooter"
import CitySidebar from "./components/CitySidebar"
import HotelCard from "./components/HotelCard"

const UserHome = () => {
  const { user, loading } = useContext(AuthContext)

  const [hotels, setHotels] = useState([])
  const [fetching, setFetching] = useState(false)
  const [showCitySidebar, setShowCitySidebar] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!loading && user) {
      if (user.city) {
        fetchHotels()
      } else {
        setShowCitySidebar(true)
      }
    }
  }, [loading, user])

  const fetchHotels = async () => {
    try {
      setFetching(true)
      setError(null)

      const res = await axios.get("/api/v1/user/view-hotels")
      setHotels(res.data.data || [])
    } catch (err) {
      setError("Failed to load hotels")
    } finally {
      setFetching(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <UserNavbar onChooseCity={() => setShowCitySidebar(true)} />

      <CitySidebar
        open={showCitySidebar}
        onClose={() => setShowCitySidebar(false)}
        onCitySaved={() => {
          setShowCitySidebar(false)
          fetchHotels()
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">

        {!fetching && hotels.length === 0 && user?.city && (
          <p className="text-gray-600">
            No restaurants available in your city yet.
          </p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {fetching && (
          <p className="text-gray-600">Loading restaurants...</p>
        )}

        {hotels.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Restaurants in <span className="text-orange-500">{user.city}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(hotel => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          </>
        )}
      </main>

      <UserFooter />
    </div>
  )
}

export default UserHome
