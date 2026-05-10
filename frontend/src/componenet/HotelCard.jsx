import { Link } from "react-router-dom";
import { MapPin, BedDouble, Star } from "lucide-react";

export default function HotelCard({ hotel }) {
  return (
    <div className="w-full max-w-[320px] group">
      
      {/* Card */}
      <div className="overflow-hidden rounded-2xl bg-white">
        
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={hotel.img || "https://via.placeholder.com/400"}
            alt={hotel.title}
            className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Price */}
          <div className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-3 py-1.5 backdrop-blur-md">
            <p className="text-sm font-semibold text-gray-900">
              ₹{hotel.price}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="pt-3">
          
          {/* Title + Rating */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1">
                {hotel.title}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-gray-500">
                <MapPin className="w-3.5 h-3.5" />

                <span className="text-sm">
                  {hotel.city}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-black text-black" />

              <span className="text-sm font-medium">
                4.9
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm leading-5 text-gray-500 line-clamp-2">
            {hotel.description}
          </p>

          {/* Bottom */}
          <div className="mt-4 flex items-center justify-between">
            
            {/* Rooms */}
            <div className="flex items-center gap-1.5 text-gray-600">
              <BedDouble className="w-4 h-4" />

              <span className="text-sm">
                {hotel.room} Rooms
              </span>
            </div>

            {/* Button */}
            <Link
              to={`/book/${hotel._id}`}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}