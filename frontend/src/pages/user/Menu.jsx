import { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import UserNavbar from "./components/UserNavbar";
import UserFooter from "./components/UserFooter";

const Menu = () => {
  const { hotelId } = useParams();
  const { user, loading } = useContext(AuthContext);

  const [menuItems, setMenuItems] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) return;

    const fetchMenu = async () => {
      try {
        setFetching(true);
        const res = await axios.get(`/api/v1/user/view-menu/${hotelId}`, {
          withCredentials: true,
        });

        setMenuItems(res.data.data || []);
      } catch (err) {
        setError("Failed to load menu");
      } finally {
        setFetching(false);
      }
    };

    fetchMenu();
  }, [hotelId]);

  if (loading) return null;

  if (!user || user.role !== "user") {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        {fetching && <p className="text-gray-600">Loading menu...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!fetching && menuItems.length === 0 && (
          <p className="text-gray-600">No items available.</p>
        )}

        {menuItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">Menu</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={item.itemAvatar}
                    alt={item.title}
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>

                    <p className="text-sm text-gray-500 capitalize">
                      {item.category}
                    </p>

                    <p className="mt-2 font-semibold text-orange-500">
                      ₹{item.price}
                    </p>

                    <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <UserFooter />
    </div>
  );
};

export default Menu;
