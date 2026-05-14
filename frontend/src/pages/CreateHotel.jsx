import { useState } from "react";
import { createHotel } from "../api/hotel";
import { useNavigate } from "react-router-dom";

export default function CreateHotel() {

  const navigate = useNavigate();

  const [data, setData] = useState({

    title: "",
    description: "",

    city: "",
    address: "",

    price: "",
    room: "",

    rating: "",
    maxGuests: "",

    hotelType: "",

    amenities: "",
    tags: "",
    nearbyPlaces: "",
    policies: "",

    checkInTime: "",
    checkOutTime: "",

    featured: false,

    img: null,
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    const { name, value, files, type, checked } = e.target;

    // IMAGE
    if (name === "img") {

      setData({
        ...data,
        img: files[0],
      });

    }

    // CHECKBOX
    else if (type === "checkbox") {

      setData({
        ...data,
        [name]: checked,
      });

    }

    // NORMAL INPUT
    else {

      setData({
        ...data,
        [name]: value,
      });

    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      // APPEND ALL FIELDS
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await createHotel(formData);

      alert("Hotel created successfully!");

      setData({

        title: "",
        description: "",

        city: "",
        address: "",

        price: "",
        room: "",

        rating: "",
        maxGuests: "",

        hotelType: "",

        amenities: "",
        tags: "",
        nearbyPlaces: "",
        policies: "",

        checkInTime: "",
        checkOutTime: "",

        featured: false,

        img: null,
      });

      navigate("/owner");

    } catch (error) {

      console.error(error);

      alert("Something went wrong");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl font-black text-gray-800">
            Create Hotel
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Add your hotel details for customers
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Hotel Name"
              value={data.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              placeholder="Write hotel description..."
              value={data.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 resize-none"
            />

          </div>

          {/* IMAGE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Image
            </label>

            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
            />

          </div>

          {/* CITY + ADDRESS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Goa"
                value={data.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>

              <input
                type="text"
                name="address"
                placeholder="Hotel Address"
                value={data.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

          </div>

          {/* PRICE + ROOM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Per Night
              </label>

              <input
                type="number"
                name="price"
                placeholder="5000"
                value={data.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

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
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

          </div>

          {/* RATING + MAX GUESTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                name="rating"
                placeholder="4.5"
                value={data.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Guests
              </label>

              <input
                type="number"
                name="maxGuests"
                placeholder="4"
                value={data.maxGuests}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

          </div>

          {/* HOTEL TYPE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Type
            </label>

            <select
              name="hotelType"
              value={data.hotelType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
            >

              <option value="">Select Type</option>

              <option value="budget">Budget</option>

              <option value="luxury">Luxury</option>

              <option value="business">Business</option>

              <option value="resort">Resort</option>

              <option value="hostel">Hostel</option>

              <option value="villa">Villa</option>

            </select>

          </div>

          {/* AMENITIES */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>

            <input
              type="text"
              name="amenities"
              placeholder="wifi,pool,parking,breakfast"
              value={data.amenities}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
            />

          </div>

          {/* TAGS */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              placeholder="family,couple_friendly"
              value={data.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
            />

          </div>

          {/* NEARBY PLACES */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nearby Places
            </label>

            <input
              type="text"
              name="nearbyPlaces"
              placeholder="beach,airport,mall"
              value={data.nearbyPlaces}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
            />

          </div>

          {/* POLICIES */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policies
            </label>

            <input
              type="text"
              name="policies"
              placeholder="late_checkin,free_cancellation"
              value={data.policies}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
            />

          </div>

          {/* CHECK IN / OUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check In Time
              </label>

              <input
                type="time"
                name="checkInTime"
                value={data.checkInTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check Out Time
              </label>

              <input
                type="time"
                name="checkOutTime"
                value={data.checkOutTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50"
              />

            </div>

          </div>

          {/* FEATURED */}
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="featured"
              checked={data.featured}
              onChange={handleChange}
            />

            <label className="text-sm text-gray-700">
              Featured Hotel
            </label>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-all duration-300"
          >
            Create Hotel
          </button>

        </form>

      </div>

    </div>
  );
}