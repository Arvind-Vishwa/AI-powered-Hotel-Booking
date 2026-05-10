export default function Admin() {
    const stats = [
      { title: 'Users', value: 1240 },
      { title: 'Hotels', value: 86 },
      { title: 'Bookings', value: 542 },
    ]
  
    const hotels = [
      {
        name: 'Royal Palace',
        city: 'Delhi',
        status: 'Approved',
      },
      {
        name: 'Ocean View',
        city: 'Mumbai',
        status: 'Pending',
      },
    ]
  
    const users = [
      {
        name: 'Rahul Sharma',
        role: 'Owner',
        status: 'Active',
      },
      {
        name: 'Ananya Verma',
        role: 'User',
        status: 'Blocked',
      },
    ]
  
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black border-r border-white/10 p-6">
          <h1 className="text-2xl font-bold mb-10">
            Stay<span className="text-amber-400">AI</span>
          </h1>
  
          <nav className="space-y-3">
            {['Dashboard', 'Hotels', 'Users', 'Settings'].map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 rounded-xl transition ${
                  item === 'Dashboard'
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'hover:bg-white/5 text-zinc-300'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>
  
        {/* Main */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            <p className="text-zinc-400 mt-2">
              Manage platform users and hotels.
            </p>
          </div>
  
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <p className="text-zinc-400">{stat.title}</p>
                <h3 className="text-4xl font-bold mt-3">{stat.value}</h3>
              </div>
            ))}
          </div>
  
          {/* Hotels */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Hotel Listings</h3>
  
              <button className="bg-amber-400 text-black px-4 py-2 rounded-xl font-semibold">
                View All
              </button>
            </div>
  
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  <th className="pb-4">Hotel</th>
                  <th className="pb-4">City</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
  
              <tbody>
                {hotels.map((hotel, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-4">{hotel.name}</td>
                    <td className="py-4">{hotel.city}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          hotel.status === 'Approved'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {hotel.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Users */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-2xl font-semibold mb-6">Users</h3>
  
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
  
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-4">{user.name}</td>
                    <td className="py-4">{user.role}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.status === 'Active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    )
  }
  