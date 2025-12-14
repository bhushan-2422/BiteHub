import { useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"
import HotelNavbar from "./component/HotelNavbar"
import HotelFooter from "./component/HotelFooter"

const HotelHome = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return null
  if (!user || user.role !== "hotel") {
    return <Navigate to="/hotel/login" replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">

      {/* Navbar */}
      <HotelNavbar />

      {/* ================= HERO ================= */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* HERO CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-10 shadow-xl">
            <div className="relative z-10 max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Welcome back,
                <span className="block text-orange-100">{user.name}</span>
              </h1>

              <p className="mt-4 text-orange-100 max-w-xl">
                Manage your restaurant, track orders, and grow revenue — all from
                one place built for partners.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/hotel/add-menu"
                  className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-orange-50 transition"
                >
                  Add Menu
                </Link>
                <Link
                  to="/hotel/dashboard"
                  className="border border-orange-200 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition"
                >
                  Dashboard
                </Link>
              </div>
            </div>

            {/* soft ambient glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
          </div>

          {/* ACTION CARDS */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Add Menu", desc: "Create & update food items", link: "/hotel/add-menu" },
              { title: "Dashboard", desc: "Orders & performance overview", link: "/hotel/dashboard" },
              { title: "Sales", desc: "Revenue & growth insights", link: "/hotel/sales" },
              { title: "Profile", desc: "View & edit hotel details", link: "/hotel/profile" },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="group bg-[#fffaf5] rounded-2xl p-6 border border-orange-200 shadow-md hover:shadow-xl transition"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4 group-hover:bg-orange-500 group-hover:text-white transition">
                  {item.title.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>

          {/* SNAPSHOT */}
          <div className="mt-20 bg-[#fffaf5] rounded-3xl shadow-xl p-10 border border-orange-200">
            <h3 className="text-xl font-bold text-gray-800">
              Today’s Snapshot
            </h3>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Orders", "Revenue", "Menu Items", "Rating"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100 text-center border border-orange-200"
                >
                  <p className="text-sm text-gray-600">{label}</p>
                  <p className="text-3xl font-extrabold text-orange-600 mt-1">
                    –
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <HotelFooter />
    </div>
  )
}

export default HotelHome
