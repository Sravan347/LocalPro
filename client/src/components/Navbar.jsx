import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // This should clear Redux state + call backend logout if you have it
  };

  return (
    <nav className="p-4 bg-gray-100 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>

        {/* Role-based links */}
        {user?.role === "provider" && (
          <Link to="/provider/dashboard">Provider Dashboard</Link>
        )}
        {user?.role === "admin" && (
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        )}
      </div>

      <div className="flex gap-2">
        {!user ? (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        ) : (
          <>
            <span className="mr-2">Hi, {user.name}</span>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
