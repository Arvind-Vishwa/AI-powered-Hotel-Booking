import Navbar from "../../componenet/Navbar";
import {fetchOwnerDashboard} from '../../api/owner'
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

export default function Owner() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({});

  const [hotels, setHotels] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {
      const res=await fetchOwnerDashboard();

      setStats(res.data.stats);

      setHotels(res.data.hotels);

      setBookings(res.data.bookings);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-900 text-white">

      <Navbar />

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

          <div className="flex gap-4">

            <button
              onClick={() => navigate("/create")}
              className="
                bg-white
                text-black
                px-6 py-3
                rounded-2xl
                font-semibold
              "
            >
              + Add Hotel
            </button>

            <button
              onClick={() => navigate("/listing")}
              className="
                bg-white
                text-black
                px-6 py-3
                rounded-2xl
                font-semibold
              "
            >
              See Listings
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

            <p className="text-zinc-400 text-sm">
              Hotels
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {stats.totalHotels}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

            <p className="text-zinc-400 text-sm">
              Rooms
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {stats.totalRooms}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

            <p className="text-zinc-400 text-sm">
              Bookings
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {stats.totalBookings}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

            <p className="text-zinc-400 text-sm">
              Revenue
            </p>

            <h2 className="text-5xl font-bold mt-4">
              ₹{stats.totalRevenue}
            </h2>

          </div>

        </div>

        {/* HOTELS */}
        <section className="
          bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          mb-8
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

            {hotels.map((hotel) => (

              <div
                key={hotel._id}
                className="
                  flex items-center justify-between
                  bg-white/[0.03]
                  border border-white/5
                  rounded-2xl
                  px-6 py-5
                "
              >

                <div>

                  <h3 className="font-semibold text-lg">
                    {hotel.title}
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
                    {hotel.room}
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
        ">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-semibold">
              Recent Bookings
            </h2>

          </div>

          <div className="space-y-4">

            {bookings.map((booking) => (

              <div
                key={booking._id}
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
                    {booking.userId?.username}
                  </h3>

                  <p className="text-zinc-500 text-sm mt-1">
                    {booking.hotelId?.title}
                  </p>

                </div>

                <div className="text-zinc-400 text-sm">

                  ₹{booking.totalPrice}

                </div>

                <div>

                  <span
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      ${
                        booking.bookingStatus === "confirmed"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-yellow-500/15 text-yellow-400"
                      }
                    `}
                  >
                    {booking.bookingStatus}
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