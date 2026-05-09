import { useState } from "react";
import { useAuthStore } from "../AuthStore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(form);
    if (user) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight text-center">
          Create Account
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center mt-2">
          Sign up to start booking premium stays
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer link */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}