import { useState } from "react";
import { aiSearch } from "../../api/hotel";
import HotelList from "../HotelList";
import Navbar from "../../componenet/Navbar";

import {
  Sparkles,
  Search,
  Loader2,
} from "lucide-react";

import axios from "axios";

export default function User() {

  // AI SEARCH INPUT
  const [searchText, setSearchText] =
    useState("");

  // AI RESULT HOTELS
  const [hotels, setHotels] =
    useState([]);

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // AI SEARCH FUNCTION
  const handleAISearch =
    async () => {

      if (!searchText.trim()) {
        alert(
        "Please enter search text"
      );
        return;
      }

      try {

        setLoading(true);

        const response=await aiSearch(searchText)

        console.log(response.data);

        setHotels(
          response.data.hotels
        );

      } catch (error) {

        console.error(error);

        alert(
          "AI Search Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-14">

          {/* LEFT */}
          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2">

                <Sparkles className="w-4 h-4 text-yellow-400" />

                <span className="text-sm text-zinc-300">

                  AI Powered Search

                </span>

              </div>

            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">

              Find Your

              <span className="block text-zinc-400">

                Perfect Stay

              </span>

            </h1>

            <p className="text-zinc-500 mt-5 text-lg max-w-2xl leading-8">

              Search hotels naturally using AI.

              Example:
              <span className="text-zinc-300">

                {" "}
                "Luxury hotel in Goa with pool near beach"

              </span>

            </p>

            {/* MODEL INFO */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">

              <div className="w-2 h-2 rounded-full bg-emerald-400" />

              <p className="text-sm text-emerald-300">

                Powered by Gemini 1.5 Flash AI

              </p>

            </div>

          </div>

          {/* RIGHT SEARCH */}
          <div className="w-full md:w-[450px]">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-3 backdrop-blur-xl">

              {/* SEARCH INPUT */}
              <div className="flex items-center gap-3">

                <Search className="w-5 h-5 text-zinc-500 ml-2" />

                <input
                  type="text"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(
                      e.target.value
                    )
                  }
                  placeholder='Try: "Budget hotel in Mumbai with wifi"'
                  className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-zinc-500
                    py-3
                  "
                />

              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handleAISearch
                }
                disabled={loading}
                className="
                  mt-3
                  w-full
                  bg-white
                  text-black
                  rounded-2xl
                  py-3
                  font-semibold
                  hover:bg-zinc-200
                  transition-all
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                {loading ? (
                  <>

                    <Loader2 className="w-4 h-4 animate-spin" />

                    Searching with AI...

                  </>
                ) : (
                  <>

                    <Sparkles className="w-4 h-4" />

                    Search with AI

                  </>
                )}

              </button>

            </div>

            {/* EXAMPLES */}
            <div className="mt-4 flex flex-wrap gap-2">

              {[
                "Luxury hotel in Goa",
                "Budget hotel in Mumbai",
                "Resort near beach",
                "Hotel with wifi",
              ].map((item, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setSearchText(item)
                  }
                  className="
                    text-xs
                    px-3 py-2
                    rounded-full
                    bg-white/5
                    border border-white/10
                    text-zinc-400
                    hover:bg-white/10
                    transition
                  "
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

        </div>

        {/* RESULTS */}
        <div>

          {/* AI RESULT TITLE */}
          {hotels.length > 0 && (

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">

                  AI Search Results

                </h2>

                <p className="text-zinc-500 mt-1">

                  Found {hotels.length} matching hotels

                </p>

              </div>

              <div className="flex items-center gap-2 text-sm text-zinc-400">

                <Sparkles className="w-4 h-4" />

                Gemini AI Matching

              </div>

            </div>

          )}

          {/* HOTEL LIST */}
          <HotelList hotels={hotels} />

        </div>

      </main>

    </div>
  );
}