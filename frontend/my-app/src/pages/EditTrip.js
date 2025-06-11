import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { isLoggedIn } from "../utils/auth"; // Optional: use if you prefer

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`/api/trips/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.trip) {
          setTrip(data.trip);
          setTitle(data.trip.title);
          setDescription(data.trip.description);
          setImage(data.trip.image);
        }
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/trips/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description, image }),
      });
      if (res.ok) {
        alert("Trip updated!");
        navigate("/my-trips");
      } else {
        setError("Failed to update trip.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!trip) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Trip</h2>
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
            Update Trip
          </button>
        </form>
      </div>
    </div>
  );
}
