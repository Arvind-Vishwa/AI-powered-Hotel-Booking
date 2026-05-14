import { useParams } from "react-router-dom";
import { useState } from "react";
import { bookHotel } from "../api/hotel";
import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  BedDouble,
  Users,
  FileText,
} from "lucide-react";

export default function BookHotel() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({

    checkIn: "",

    checkOut: "",

    selectedRooms: 1,

    guests: 1,

    specialRequests: "",

  });

  const [loading, setLoading] =
    useState(false);

  // TEMP PRICE
  // later fetch from hotel details API

  const roomPrice = 2000;

  // TOTAL NIGHTS
  const totalNights =
    form.checkIn &&
    form.checkOut
      ? Math.ceil(
          (
            new Date(form.checkOut) -
            new Date(form.checkIn)
          ) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // TOTAL PRICE
  const totalPrice =
    totalNights > 0
      ? roomPrice *
        Number(form.selectedRooms) *
        totalNights
      : 0;

  // HANDLE BOOKING
  const handleBook = async () => {

    // VALIDATION
    if (
      !form.checkIn ||
      !form.checkOut
    ) {
      alert(
        "Please select check-in and check-out dates"
      );

      return;
    }

    if (
      new Date(form.checkOut) <=
      new Date(form.checkIn)
    ) {
      alert(
        "Check-out must be after check-in"
      );

      return;
    }

    const payload = {

      checkIn: form.checkIn,

      checkOut: form.checkOut,

      selectedRooms:
        Number(form.selectedRooms),

      guests:
        Number(form.guests),

      specialRequests:
        form.specialRequests,

    };

    try {

      setLoading(true);

      const response =
        await bookHotel(id, payload);

      console.log(response);

      alert("Booking Confirmed ✅");

      // RESET
      setForm({

        checkIn: "",

        checkOut: "",

        selectedRooms: 1,

        guests: 1,

        specialRequests: "",

      });

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Booking failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-lg w-full">

        {/* TITLE */}
        <div className="text-center">

          <h2 className="text-3xl font-bold text-gray-900">
            Confirm Booking
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Fill your stay details
          </p>

        </div>

        {/* FORM */}
        <div className="mt-8 space-y-5">

          {/* CHECK IN */}
          <div>

            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">

              <CalendarDays className="w-4 h-4" />

              Check In

            </label>

            <input
              type="date"
              value={form.checkIn}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  checkIn: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* CHECK OUT */}
          <div>

            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">

              <CalendarDays className="w-4 h-4" />

              Check Out

            </label>

            <input
              type="date"
              value={form.checkOut}
              onChange={(e) =>
                setForm({
                  ...form,
                  checkOut: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* ROOMS */}
          <div>

            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">

              <BedDouble className="w-4 h-4" />

              Rooms

            </label>

            <input
              type="number"
              min="1"
              value={form.selectedRooms}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedRooms:
                    e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* GUESTS */}
          <div>

            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">

              <Users className="w-4 h-4" />

              Guests

            </label>

            <input
              type="number"
              min="1"
              value={form.guests}
              onChange={(e) =>
                setForm({
                  ...form,
                  guests:
                    e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* SPECIAL REQUESTS */}
          <div>

            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">

              <FileText className="w-4 h-4" />

              Special Requests

            </label>

            <textarea
              rows="3"
              placeholder="Early check-in, extra pillows..."
              value={
                form.specialRequests
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  specialRequests:
                    e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* PRICE BOX */}
          <div className="rounded-2xl bg-gray-100 p-5 space-y-2">

            <div className="flex justify-between text-sm text-gray-600">

              <span>
                Price Per Night
              </span>

              <span>
                ₹{roomPrice}
              </span>

            </div>

            <div className="flex justify-between text-sm text-gray-600">

              <span>
                Total Nights
              </span>

              <span>
                {totalNights}
              </span>

            </div>

            <div className="flex justify-between text-sm text-gray-600">

              <span>
                Rooms
              </span>

              <span>
                {form.selectedRooms}
              </span>

            </div>

            <div className="border-t pt-3 flex justify-between items-center">

              <span className="font-semibold text-gray-800">
                Total Price
              </span>

              <span className="text-2xl font-bold text-black">

                ₹{totalPrice}

              </span>

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleBook}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition duration-300 disabled:opacity-50"
          >

            {loading
              ? "Booking..."
              : "Confirm Booking"}

          </button>

        </div>

      </div>

    </div>
  );
}