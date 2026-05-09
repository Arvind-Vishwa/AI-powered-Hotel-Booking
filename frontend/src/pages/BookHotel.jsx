import { useParams } from "react-router-dom";
import { useState } from "react";
import { bookHotel } from "../api/hotel";
import {useNavigate} from 'react-router-dom'

export default function BookHotel() {
  const { id } = useParams();
  const navigate=useNavigate();

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    selectRoom: 1,
  });

  const [loading, setLoading] = useState(false);

  const roomPrice = 2000;

  // total price
  const totalPrice = roomPrice * Number(form.selectRoom);

  const handleBook = async () => {
    // validation
    if (!form.checkIn || !form.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const payload = {
      hotelId: id,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      selectRoom: Number(form.selectRoom),
      totalPrice,
    };

    try {
      setLoading(true);

      const response = await bookHotel(id,payload);

      console.log(response);

      alert("Booking Confirmed ✅");

      // optional reset
      setForm({
        checkIn: "",
        checkOut: "",
        selectRoom: 1,
      });
      navigate('/')
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight text-center">
          Confirm Your Booking
        </h2>

        <p className="text-gray-500 text-sm mt-2 text-center">
          Fill in your stay details
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">

          {/* Check-in */}
          <div>
            <label className="text-sm text-gray-600">
              Check-in
            </label>

            <input
              type="date"
              value={form.checkIn}
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
              onChange={(e) =>
                setForm({
                  ...form,
                  checkIn: e.target.value,
                })
              }
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="text-sm text-gray-600">
              Check-out
            </label>

            <input
              type="date"
              value={form.checkOut}
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
              onChange={(e) =>
                setForm({
                  ...form,
                  checkOut: e.target.value,
                })
              }
            />
          </div>

          {/* Rooms */}
          <div>
            <label className="text-sm text-gray-600">
              Rooms
            </label>

            <input
              type="number"
              min="1"
              value={form.selectRoom}
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
              onChange={(e) =>
                setForm({
                  ...form,
                  selectRoom: e.target.value,
                })
              }
            />
          </div>

          {/* Total Price */}
          <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
            <span className="text-gray-700 font-medium">
              Total Price
            </span>

            <span className="text-lg font-bold text-black">
              ₹{totalPrice}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleBook}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </div>
      </div>
    </div>
  );
}