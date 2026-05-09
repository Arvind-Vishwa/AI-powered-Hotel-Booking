import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
      
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={hotel.image || "https://via.placeholder.com/400"}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
          {hotel.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{hotel.city}</p>
        <p className="text-sm text-gray-500 mt-1">{hotel.price}</p>

        {/* Divider */}
        <div className="my-4 border-t border-gray-100"></div>

        {/* Button */}
        <Link
          to={`/book/${hotel._id}`}
          className="inline-block w-full text-center bg-black text-white py-2.5 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}