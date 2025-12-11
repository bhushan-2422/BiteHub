// AddMenu.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { hotelContext } from "../context/hotelContext"; // adjust to your context path

const CATEGORIES = [
  "rice",
  "breakfast",
  "soups",
  "south indian",
  "beverages",
  "breads",
  "other",
];

export default function AddMenu() {
//   const { hotel } = useContext(hotelContext) || {}; // expects hotel.token for auth
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setCategory(CATEGORIES[0]);
  }, []);

  const handleImageChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setImageFile(f || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Minimal validation: backend requires these
    if (!title.trim() || price === "" || Number(price) <= 0 || !category) {
      console.warn("Validation failed: title, positive price and category are required.");
      return;
    }
    if (!imageFile) {
      console.warn("Validation failed: itemAvatar file is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("price", Number(price));
      formData.append("category", category);
      // backend expects file field name 'itemAvatar' (they access req.files?.itemAvatar[0])
      formData.append("itemAvatar", imageFile);

      const config = { headers: {} };
      // include auth if token exists; server should identify hotel via token -> req.hotel
      if (hotel && hotel.token) {
        config.headers.Authorization = `Bearer ${hotel.token}`;
      }

      // axios will set Content-Type multipart/form-data with boundary automatically in the browser
      const res = await axios.post("/api/v1/user/add-menu-items", formData, config);
      console.log("Add menu response:", res.data);

      // reset form
      setTitle("");
      setPrice("");
      setCategory(CATEGORIES[0]);
      setImageFile(null);
      // no UI messages per your requirement
    } catch (err) {
      console.error("Failed to add menu item:", err.response?.data || err.message || err);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Add Menu Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Paneer Butter Masala"
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 199"
                className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Item Avatar (required)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-600"
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setPrice("");
                setCategory(CATEGORIES[0]);
                setImageFile(null);
              }}
              className="px-4 py-2 border rounded-md text-sm"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm text-white bg-orange-500 hover:bg-orange-600"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
