import HotelList from "../HotelList";
import Navbar from "../../componenet/Navbar";

export default function User() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>
            <h2 className="text-5xl font-bold tracking-tight leading-tight">
              Find Your
              <span className="block text-zinc-400">
                Perfect Stay
              </span>
            </h2>

            <p className="text-zinc-500 mt-4 text-lg max-w-xl">
              Discover luxury hotels, resorts, and premium stays
              across India with comfort and elegance.
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full md:w-[380px]">
            <input
              type="text"
              placeholder="Search city or hotel..."
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-2xl
                px-5 py-4
                outline-none
                text-white
                placeholder:text-zinc-500
                focus:border-white/30
                focus:bg-white/10
                transition-all
              "
            />
          </div>

        </div>

        {/* HOTEL LIST */}
        <HotelList />

      </main>
    </div>
  );
}