import { useState } from "react";
import { createHotel } from "../api/hotel";
import {useNavigate} from 'react-router-dom'

export default function CreateHotel() {
  const navigate=useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    price: "",
    room:""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createHotel(data);
      alert("Hotel created successfully!");

      setData({
        title: "",
        description: "",
        location: "",
        city: "",
        price: "",
        room:""
      });

      navigate('/')
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Create Hotel
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Add a new hotel listing with all required details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter hotel title"
              value={data.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Write hotel description..."
              rows="4"
              value={data.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter hotel location"
              value={data.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>

            <input
              type="text"
              name="city"
              placeholder="Enter city name"
              value={data.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Per Night
            </label>

            <input
              type="number"
              name="price"
              placeholder="₹5000"
              value={data.price}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* // rooms available */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rooms available
            </label>

            <input
              type="number"
              name="room"
              placeholder="10"
              value={data.room}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Create Hotel
          </button>
        </form>
      </div>
    </div>
  );
}