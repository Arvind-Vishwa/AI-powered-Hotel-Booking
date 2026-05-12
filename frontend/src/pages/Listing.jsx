import { useEffect, useState } from "react";
import { listing } from "../api/hotel";
export default function Listing() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH HOTELS
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await listing();
  
        console.log("API RESPONSE:", response);
  
        const hotelsData =
          response?.data?.hotels ||
          response?.data ||
          [];
  
        setHotels(Array.isArray(hotelsData) ? hotelsData : []);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHotels();
  }, []);

  return (
    <section className="mt-10">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Your Properties
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            Manage and track your hotel listings
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-zinc-500 text-sm">
          Loading hotels...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && hotels.length === 0 && (
        <div className="text-zinc-500 text-sm bg-white/5 border border-white/10 rounded-2xl p-6">
          No hotels found. Create your first listing.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="
              group
              bg-white/5
              border border-white/10
              rounded-3xl
              overflow-hidden
              hover:border-white/20
              hover:-translate-y-1
              transition-all duration-300
            "
          >

            {/* IMAGE (optional) */}
            <div className="h-40 bg-zinc-800 relative overflow-hidden">
              {hotel.image ? (
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  No Image
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h3 className="text-lg font-semibold text-white">
                {hotel.username}
              </h3>

              <p className="text-zinc-500 text-sm mt-1">
                {hotel.city}
              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-5">

                <span className="text-sm text-zinc-400">
                  Rooms: {hotel.room || 0}
                </span>

                <button className="
                  text-xs
                  px-4 py-2
                  rounded-xl
                  bg-white/10
                  border border-white/10
                  text-white
                  hover:bg-white/20
                  transition
                ">
                  View
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}