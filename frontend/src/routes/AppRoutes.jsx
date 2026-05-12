import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

import CreateHotel from "../pages/CreateHotel";
import HotelList from "../pages/HotelList";
import BookHotel from "../pages/BookHotel";
import { useAuthStore } from "../AuthStore";
import Owner from "../pages/Dashboard/Owner";
import User from "../pages/Dashboard/User";
import Admin from "../pages/Dashboard/Admin";
import Listing from "../pages/Listing";

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
          
            <User />
          
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
        path="/listing"
        element={
            <Listing />
        }
      />

      <Route
        path="/owner"
        element={
            <PrivateRoute>
              <Owner />
            </PrivateRoute>
        }
      />

      <Route
        path="/user"
        element={
            <User />
        }
      />
      <Route
        path="/admin"
        element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
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