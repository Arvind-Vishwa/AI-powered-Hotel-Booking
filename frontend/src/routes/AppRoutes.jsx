import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateHotel from "../pages/CreateHotel";
import HotelList from "../pages/HotelList";
import BookHotel from "../pages/BookHotel";
import { useAuthStore } from "../AuthStore";

const PrivateRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateHotel />
          </PrivateRoute>
        }
      />

      <Route
        path="/hotels"
        element={
          
            <HotelList />
          
        }
      />

      <Route
        path="/book/:id"
        element={
          
            <BookHotel />
          
        }
      />
    </Routes>
  );
}