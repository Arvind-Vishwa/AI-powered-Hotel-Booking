import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {
  Home,
  Building2,
  PlusCircle,
  CalendarDays,
  Wallet,
  Menu,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate=useNavigate();

  const stats = [
    {
      title: "Total Bookings",
      value: "12",
      icon: <CalendarDays className="w-6 h-6" />,
    },
    {
      title: "Upcoming Trips",
      value: "3",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: "Total Revenue",
      value: "₹24,000",
      icon: <Wallet className="w-6 h-6" />,
    },
  ];

  const recentActivity = [
    {
      title: "Booked Taj Hotel, Mumbai",
      time: "2 days ago",
    },
    {
      title: "Cancelled Goa Resort",
      time: "5 days ago",
    },
    {
      title: "Booked Delhi Stay",
      time: "1 week ago",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">
            StaySphere
          </h2>

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === "dashboard"
                ? "bg-black text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home className="w-5 h-5" />
            Dashboard
          </button>

          <button
            onClick={() => navigate('/hotels')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === "hotels"
                ? "bg-black text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Building2 className="w-5 h-5" />
            Hotels
          </button>

          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Mobile Menu */}
        <button
          className="md:hidden mb-5 bg-white p-3 rounded-2xl shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Top Navbar */}
        <header className="bg-white border border-gray-100 shadow-sm rounded-3xl px-6 py-4 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent tracking-tight">
              StaySphere Admin
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage hotels, bookings & customer experiences
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={()=>{navigate('/create')}}
              className="bg-black text-white px-5 py-3 rounded-2xl font-medium hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-md"
            >
              + Create Hotel
            </button>

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-black to-gray-600 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:scale-105 transition-all duration-300">
              A
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800">
                Dashboard Overview
              </h2>

              <p className="text-gray-500 mt-2">
                Monitor your hotels and booking performance
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {item.title}
                      </p>

                      <h2 className="text-3xl font-black text-gray-800 mt-2">
                        {item.value}
                      </h2>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-2xl text-gray-700">
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  Recent Activity
                </h3>

                <button className="text-sm text-blue-600 hover:underline">
                  View All
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {activity.title}
                      </p>
                    </div>

                    <span className="text-sm text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        

        
        
      </main>
    </div>
  );
};

export default Dashboard;