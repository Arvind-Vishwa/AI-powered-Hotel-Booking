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
    <div className="min-h-screen bg-[#fafafa]">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            AI Search Results
          </h1>

          <p className="mt-2 text-gray-500 text-sm">
            Found {hotels.length} matching hotels
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