import { Link } from "react-router-dom";

import {
  MapPin,
  BedDouble,
  Star,
  Users,
  Wifi,
  Hotel,
} from "lucide-react";

export default function HotelCard({ hotel }) {

  return (

    <div className="w-full max-w-[340px] group">

      {/* CARD */}
      <div className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">

        {/* IMAGE */}
        <div className="relative overflow-hidden">

          <img
            src={
              hotel.img ||
              "https://via.placeholder.com/400"
            }
            alt={hotel.title}
            className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* PRICE */}
          <div className="absolute bottom-4 right-4 rounded-xl bg-white/90 px-4 py-2 backdrop-blur-md shadow-md">

            <p className="text-sm text-gray-500">
              Per Night
            </p>

            <p className="text-lg font-bold text-gray-900">
              ₹{hotel.price}
            </p>

          </div>

          {/* FEATURED */}
          {hotel.featured && (

            <div className="absolute top-4 left-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">

              Featured

            </div>

          )}

        </div>

        {/* CONTENT */}
        <div className="p-5">

          {/* TITLE + RATING */}
          <div className="flex items-start justify-between gap-4">

            <div>

              <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                {hotel.title}
              </h2>

              <div className="mt-1 flex items-center gap-1 text-gray-500">

                <MapPin className="w-4 h-4" />

                <span className="text-sm">
                  {hotel.city}
                </span>

              </div>

            </div>

            {/* RATING */}
            <div className="flex items-center gap-1 rounded-xl bg-gray-100 px-2 py-1">

              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

              <span className="text-sm font-semibold">
                {hotel.rating || "4.5"}
              </span>

            </div>

          </div>

          {/* DESCRIPTION */}
          <p className="mt-3 text-sm leading-6 text-gray-500 line-clamp-2">

            {hotel.description}

          </p>

          {/* HOTEL TYPE */}
          {hotel.hotelType && (

            <div className="mt-4 flex items-center gap-2 text-gray-600">

              <Hotel className="w-4 h-4" />

              <span className="text-sm capitalize">
                {hotel.hotelType}
              </span>

            </div>

          )}

          {/* AMENITIES */}
          {hotel.amenities?.length > 0 && (

            <div className="mt-4 flex flex-wrap gap-2">

              {hotel.amenities.slice(0, 3).map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1"
                >

                  <Wifi className="w-3 h-3" />

                  <span className="text-xs font-medium capitalize">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          )}

          {/* BOTTOM */}
          <div className="mt-5 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* ROOMS */}
              <div className="flex items-center gap-1 text-gray-600">

                <BedDouble className="w-4 h-4" />

                <span className="text-sm">
                  {hotel.room} Rooms
                </span>

              </div>

              {/* GUESTS */}
              <div className="flex items-center gap-1 text-gray-600">

                <Users className="w-4 h-4" />

                <span className="text-sm">
                  {hotel.maxGuests || 2}
                </span>

              </div>

            </div>

            {/* BUTTON */}
            <Link
              to={`/book/${hotel._id}`}
              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Book Now
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}