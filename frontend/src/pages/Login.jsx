import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../AuthStore";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(form);

      if (user.role === "user") {
        navigate("/user");
      } else if (user.role === "owner") {
        navigate("/owner");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight text-center">
          Welcome Back
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center mt-2">
          Login to continue your booking experience
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-black font-medium hover:underline"
            >
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}