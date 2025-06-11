import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 sticky top-0 z-50 px-4 py-3 shadow">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand and Welcome */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-2xl font-bold tracking-wide">
            RoadTrip
          </Link>
          {user && (
            <span className="text-yellow-300 font-semibold ml-3 hidden sm:inline">
              Welcome, {user.username}!
            </span>
          )}
        </div>
        {/* Navigation Links */}
        <div className="flex items-center space-x-5">
          <Link
            to="/"
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/trips"
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            Browse Trips
          </Link>
          {user && (
            <>
              <Link
                to="/create"
                className="text-white hover:text-yellow-300 font-medium transition"
              >
                Create Trip
              </Link>
              <Link
                to="/my-trips"
                className="text-white hover:text-yellow-300 font-medium transition"
              >
                Trip List
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 rounded bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-yellow-300 font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
