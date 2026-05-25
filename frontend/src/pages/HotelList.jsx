import HotelCard from "../componenet/HotelCard";

export default function HotelList({ hotels }) {

  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500">
        No hotels found
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#fafafa] rounded-[40px] p-8">

      {/* GRID */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-x-8
        gap-y-12
        place-items-center
      ">

        {hotels.map((h) => (

          <HotelCard
            key={h._id}
            hotel={h}
          />

        ))}

      </div>

    </div>
  );
}