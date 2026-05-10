import Navbar from "../../componenet/Navbar";
import { useNavigate } from "react-router-dom";
export default function Owner() {
  const navigate=useNavigate();

  const stats = [
    { title: "Hotels", value: 4 },
    { title: "Rooms", value: 48 },
    { title: "Bookings", value: 12 },
  ];

  const hotels = [
    {
      name: "Royal Palace",
      city: "Delhi",
      rooms: 12,
    },
    {
      name: "Ocean View",
      city: "Mumbai",
      rooms: 20,
    },
  ];

  const bookings = [
    {
      guest: "Rahul Sharma",
      hotel: "Royal Palace",
      room: 204,
      status: "Confirmed",
    },
    {
      guest: "Ananya Verma",
      hotel: "Ocean View",
      room: 105,
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-900 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Owner Dashboard
            </h1>

            <p className="text-zinc-500 mt-3 text-lg">
              Manage hotels, rooms, and bookings effortlessly.
            </p>
          </div>

          <button className="
            bg-white
            text-black
            px-6 py-3
            rounded-2xl
            font-semibold
            hover:scale-105
            transition-all
            duration-300
          ">
            + Add Hotel
          </button>
          <button
          className="
          bg-white
          text-black
          px-6 py-3
          rounded-2xl
          font-semibold
          hover:scale-105
          transition-all
          duration-300"
          onClick={()=>{navigate('/listing')}}
          >
            See Your Hotel Listing
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="
                bg-white/5
                border border-white/10
                rounded-3xl
                p-7
                backdrop-blur-xl
                hover:border-white/20
                transition-all
              "
            >
              <p className="text-zinc-400 text-sm">
                {stat.title}
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {stat.value}
              </h2>
            </div>
          ))}

        </div>

        {/* HOTELS */}
        <section className="
          bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          mb-8
          backdrop-blur-xl
        ">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Your Hotels
            </h2>

            <p className="text-sm text-zinc-500">
              {hotels.length} Properties
            </p>
          </div>

          <div className="space-y-4">

            {hotels.map((hotel, index) => (
              <div
                key={index}
                className="
                  flex items-center justify-between
                  bg-white/[0.03]
                  border border-white/5
                  rounded-2xl
                  px-6 py-5
                  hover:bg-white/[0.05]
                  transition-all
                "
              >

                <div>
                  <h3 className="font-semibold text-lg">
                    {hotel.name}
                  </h3>

                  <p className="text-zinc-500 text-sm mt-1">
                    {hotel.city}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-500">
                    Rooms
                  </p>

                  <h4 className="text-xl font-bold">
                    {hotel.rooms}
                  </h4>
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* BOOKINGS */}
        <section className="
          bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          backdrop-blur-xl
        ">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Recent Bookings
            </h2>

            <p className="text-sm text-zinc-500">
              Latest activity
            </p>
          </div>

          <div className="space-y-4">

            {bookings.map((booking, index) => (
              <div
                key={index}
                className="
                  flex flex-col md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                  bg-white/[0.03]
                  border border-white/5
                  rounded-2xl
                  px-6 py-5
                "
              >

                <div>
                  <h3 className="font-semibold">
                    {booking.guest}
                  </h3>

                  <p className="text-zinc-500 text-sm mt-1">
                    {booking.hotel}
                  </p>
                </div>

                <div className="text-zinc-400 text-sm">
                  Room #{booking.room}
                </div>

                <div>
                  <span
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      ${
                        booking.status === "Confirmed"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-yellow-500/15 text-yellow-400"
                      }
                    `}
                  >
                    {booking.status}
                  </span>
                </div>

              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}