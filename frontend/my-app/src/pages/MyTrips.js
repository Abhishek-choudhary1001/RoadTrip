import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BrowseTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = "https://mern-roadtrip-planner.onrender.com";

  // Check if the user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${backendUrl}/api/roadtrips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          setTrips([]);
          setLoading(false);
          return;
        }
        return res.json();
      })
      .then(data => {
        setTrips(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Delete handler
  const handleDelete = async (tripId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    const res = await fetch(`${backendUrl}/api/roadtrips/${tripId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setTrips(trips.filter(trip => trip._id !== tripId));
    } else {
      alert("Failed to delete trip.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading trips...</div>;
  }

  if (trips.length === 0) {
    return <div className="text-center mt-10 text-gray-500">No trips found.</div>;
  }

  return (
    
    <div className="max-w-7xl mx-auto  p-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map(trip => (
          <div key={trip._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            {trip.image && (
              <img
                src={trip.image}
                alt={trip.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
              <p className="text-gray-600">{trip.description}</p>
              <Link
                to={`/trips/${trip._id}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
              >
                View Details →
              </Link>
              {isLoggedIn && (
                <button
                  className="ml-2 mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => handleDelete(trip._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
