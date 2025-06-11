import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth"; // import the auth check

export default function CreateTrip() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // If not logged in, redirect or show message
  if (!isLoggedIn()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500">
        <div className="bg-white p-8  rounded shadow max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="mb-4">You must be logged in to create a trip.</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Use the correct backend port (5000)
      const res = await fetch("http://localhost:5000/api/roadtrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name:title, description, image }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Trip created successfully!");
        navigate("/trips");
      } else {
        setError(data.error || "Failed to create trip.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Trip Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              required
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={description}
              required
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2"
              value={image}
              required
              onChange={e => setImage(e.target.value)}
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-800 transition">
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
}
