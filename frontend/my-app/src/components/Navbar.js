import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import WeatherWidget from "../pages/WeatherWidget";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState("Agra");
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showWeather, setShowWeather] = useState(false);

  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  const fetchUserLocation = async () => {
    try {
      
      const response = await fetch('https://mern-roadtrip-planner.onrender.com/api/ip/location');
      const data = await response.json();
      if (data.city) {
        setLocation(data.city);
        setIsLocationLoaded(true);
      }
    } catch (err) {
      console.error("Error fetching location:", err);
    }
  };
  const [isWeatherPanelOpen, setIsWeatherPanelOpen] = useState(false);

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

              {/* Weather Control Panel (appears on hover) */}
              <div
                className="ml-2 flex items-center relative group">
                 <button
                  onClick={() => setIsWeatherPanelOpen(!isWeatherPanelOpen)}
                  className="text-white font-semibold px-2 py-1 rounded bg-green-600 cursor-pointer"
                  type="button"
                >
                  Weather
                </button>
                {/* Search input and toggle button (shown on hover) */}
                {isWeatherPanelOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded shadow-lg p-2 flex items-center space-x-2 z-50">
                     <button
                           onClick={async () => {
                          if (!isLocationLoaded) {
                          await fetchUserLocation();
                       }
                          setShowWeather(!showWeather);
                       }}
                           className="px-2 py-1 rounded bg-green-600 text-white font-semibold hover:bg-green-500 transition"
                        >
                           {showWeather ? "Hide" : "Show"}
                    </button>
                    
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location"
                      className="px-2 py-1 rounded text-sm border"
                    />
                   

                    <button onClick={fetchUserLocation}>
  Get Location
</button>
                  </div>



                )}
              </div>
              {/* Hamburger Menu Button (for mobile) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
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
      {/* Weather Widget (shown only when showWeather is true) */}
      {showWeather && <WeatherWidget location={location}   className="fixed right-10 top-20 z-50 bg-white rounded-lg shadow-lg p-4 w-48"/>}
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-blue-700 px-4 py-2 shadow">
          <div className="flex flex-col space-y-3">
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
                  className="text-white hover:text-yellow-300 font-medium transition text-left"
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
      )}
    </nav>
  );
}
