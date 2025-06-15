import React, { useState } from "react";

export default function ReviewForm({ tripId, onReviewAdded }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Login to add a review.");
      return;
    }
    if (!text.trim()) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`https://mern-roadtrip-planner.onrender.com/api/reviews/${tripId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    setLoading(false);
    if (res.ok) {
      const { review } = await res.json();
      setText("");
      if (onReviewAdded) onReviewAdded(review);
      alert("Review added!");
    } else {
      const err = await res.json();
      alert(err.error || "Failed to add review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        className="border rounded px-2 py-1 flex-1 mr-2"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={isLoggedIn ? "Add a review" : "Login to review"}
        disabled={!isLoggedIn || loading}
      />
      <button
        className={`px-2 py-1 rounded ${
          isLoggedIn
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        type="submit"
        disabled={!isLoggedIn || loading}
      >
        {loading ? "Adding..." : "Review"}
      </button>
    </form>
  );
}
