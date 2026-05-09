import { useEffect, useState } from "react";
import { getHotels } from "../api/hotel";
import HotelCard from "../componenet/HotelCard";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getHotels().then((res) => {
      setHotels(res.data.hotels)
      console.log(res.data.hotels)
    });
  }, []);

  return (
    <div>
      {hotels.map((h) => (
        <HotelCard key={h._id} hotel={h} />
      ))}
    </div>
  );
}