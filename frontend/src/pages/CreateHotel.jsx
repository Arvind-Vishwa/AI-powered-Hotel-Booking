import { useState } from "react";
import { createHotel } from "../api/hotel";
import { useNavigate } from "react-router-dom";

export default function CreateHotel() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    city: "",
    price: "",
    room: "",
    img: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // File Input
    if (name === "img") {
      setData({
        ...data,
        img: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // FormData for file upload
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("city", data.city);
      formData.append("price", data.price);
      formData.append("room", data.room);
      formData.append("img", data.img);

      await createHotel(formData);

      alert("Hotel created successfully!");

      setData({
        title: "",
        description: "",
        city: "",
        price: "",
        room: "",
        img: null,
      });

      navigate("/");
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
              rows="4"
              placeholder="Write hotel description..."
              value={data.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Image
            </label>

            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:outline-none"
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
              placeholder="Enter city"
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

          {/* Room */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rooms Available
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

          {/* Submit */}
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