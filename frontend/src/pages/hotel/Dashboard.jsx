import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../context/AuthProvider"
import HotelNavbar from "./component/HotelNavbar"
import HotelFooter from "./component/HotelFooter"

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext)

  const [menuItems, setMenuItems] = useState([])
  const [orders, setOrders] = useState([])
  const [menuLoading, setMenuLoading] = useState(true)
  const [ordersLoading, setOrdersLoading] = useState(true)

  // ✅ hooks ALWAYS run
  useEffect(() => {
    if (!user || user.role !== "hotel") return

    const fetchMenu = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/get-menu-items")
        setMenuItems(res.data.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setMenuLoading(false)
      }
    }

    fetchMenu()
  }, [user])

  useEffect(() => {
    if (!user || user.role !== "hotel") return

    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/orders-placed")
        setOrders(res.data.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setOrdersLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  // ✅ CONDITIONAL RETURNS AFTER HOOKS
  if (loading) return null

  if (!user || user.role !== "hotel") {
    return <Navigate to="/hotel/login" replace />
  }


  // ================= PLACEHOLDER HANDLERS =================
  const handleAcceptOrder = (orderId) => {
    console.log("Accept order:", orderId)
  }

  const handleDeclineOrder = (orderId) => {
    console.log("Decline order:", orderId)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">

      <HotelNavbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-14">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your menu items and handle incoming orders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ================= MENU ITEMS ================= */}
            <section className="bg-[#fffaf5] rounded-3xl shadow-xl border border-orange-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Menu Items
              </h2>

              {menuLoading ? (
                <p className="text-sm text-gray-500">Loading menu items…</p>
              ) : menuItems.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No menu items found. Add items to your menu.
                </p>
              ) : (
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.itemAvatar}
                          alt={item.title}
                          className="w-14 h-14 rounded-lg object-cover border"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.category} • ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm rounded-lg border border-orange-300 text-orange-600 hover:bg-orange-50">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ================= ORDERS ================= */}
            <section className="bg-[#fffaf5] rounded-3xl shadow-xl border border-orange-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Recent Orders
              </h2>

              {ordersLoading ? (
                <p className="text-sm text-gray-500">Loading orders…</p>
              ) : orders.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No new orders yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Order #{order._id.slice(-5)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {order.items?.length} items • ₹{order.totalAmount}
                          </p>
                        </div>

                        <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                          {order.status || "New"}
                        </span>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleAcceptOrder(order._id)}
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeclineOrder(order._id)}
                          className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      <HotelFooter />
    </div>
  )
}

export default Dashboard
