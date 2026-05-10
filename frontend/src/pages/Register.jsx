import { useState } from "react";
import { useAuthStore } from "../AuthStore";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    const user = await register(form);
    console.log(user)
    if (user) {

      // ROLE BASED REDIRECT
      if (user.role == "owner") {
        navigate("/owner");
      } else {
        navigate("/user");
      }
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full">

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight text-center">
          Create Account
        </h2>

        {/* SUBTITLE */}
        <p className="text-sm text-gray-500 text-center mt-2">
          Sign up to start booking premium stays
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value
              })
            }
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            required
          />

          {/* ROLE SELECT */}
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value
              })
            }
          >

            <option value="user">
              User
            </option>

            <option value="owner">
              Hotel Owner
            </option>

          </select>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>

        </form>

        {/* FOOTER */}
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