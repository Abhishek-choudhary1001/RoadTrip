// src/pages/TripDescription.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TripDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [trip, setTrip] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch trip details and reviews on mount
  useEffect(() => {
    fetch(`/api/roadtrips/${id}`)
      .then(res => res.json())
      .then(data => {
        setTrip(data.trip);
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Add to My List handler
  const handleAddToList = () => {
    if (!isLoggedIn) {
      alert("Please log in to add this trip to your list.");
      navigate("/login");
      return;
    }
    fetch("/api/my-trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ tripId: id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Trip added to your list!");
        }
      })
      .catch(() => alert("Failed to add trip."));
  };

  // Review form submit handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in to leave a review.");
      navigate("/login");
      return;
    }
    fetch(`/api/trips/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ text: reviewText }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          // Optionally use data.user.username if returned from backend
          setReviews([...reviews, { user: data.user?.username || "You", text: reviewText }]);
          setReviewText("");
        }
      })
      .catch(() => alert("Failed to submit review."));
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!trip) return <div className="text-center mt-10">Trip not found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">
      <img
        src={trip.image}
        alt={trip.name}
        className="w-full h-56 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{trip.name}</h2>
      <p className="mb-6 text-gray-700">{trip.description}</p>
      <button
        onClick={handleAddToList}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Add to My List
      </button>

      {/* Review Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Reviews</h3>
        <form onSubmit={handleReviewSubmit} className="mb-4">
          <textarea
            className="w-full border rounded px-3 py-2"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            required
            placeholder="Leave a review..."
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
            Submit Review
          </button>
        </form>
        <ul>
          {reviews.length === 0 && (
            <li className="text-gray-500">No reviews yet. Be the first!</li>
          )}
          {reviews.map((r, idx) => (
            <li key={idx} className="border-b py-2">
              <span className="font-semibold">{r.user}:</span> {r.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
