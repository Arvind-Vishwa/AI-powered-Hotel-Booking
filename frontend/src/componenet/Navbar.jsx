import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/hotels">Hotels</Link>
      <Link to="/create">Create</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}