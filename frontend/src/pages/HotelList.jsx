import { useEffect, useState } from "react";
import { getHotels } from "../api/hotel";
import HotelCard from "../componenet/HotelCard";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getHotels().then((res) => {
      setHotels(res.data.hotels);
      console.log(res.data.hotels);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Discover Stays
          </h1>

          <p className="mt-2 text-gray-500 text-sm">
            Find premium hotels with comfort and luxury.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 place-items-center">
          
          {hotels.map((h) => (
            <HotelCard key={h._id} hotel={h} />
          ))}

        </div>
      </div>
    </div>
  );
}