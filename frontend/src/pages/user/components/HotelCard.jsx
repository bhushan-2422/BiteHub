import { useNavigate } from "react-router-dom"

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={hotel.hotelAvatar}
        alt={hotel.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-gray-800">{hotel.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{hotel.city}</p>

        <button
          onClick={() => navigate(`/user/hotel/${hotel._id}/menu`)}
          className="mt-3 text-orange-500 font-semibold hover:underline"
        >
          View Menu →
        </button>
      </div>
    </div>
  )
}

export default HotelCard
