import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../AuthStore";

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <h1 className="text-2xl font-bold tracking-tight text-white">
            StayAI
          </h1>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">

          {/* <Link
            to="/hotels"
            className="hover:text-white transition"
          >
            Hotels
          </Link> */}

          {user?.role === "owner" && (
            <Link
              to="/create"
              className="hover:text-white transition"
            >
              Create Hotel
            </Link>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* ROLE */}
          {user?.role && (
            <div className="hidden sm:flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wider text-zinc-300">
              {user.role}
            </div>
          )}

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}