import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const backendUrl = "https://mern-roadtrip-planner.onrender.com";

// Use valid ObjectIds for _id fields!
const PRESELECTED_TRIPS = [
  {
    _id: "665f5b9e2f6b9c1b2c3d4e5a",
    name: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&auto=format&fit=crop&q=60",
    description: "Visit the majestic Taj Mahal and explore the rich Mughal heritage.",
    fullDescription:
      "Agra is home to the world-renowned Taj Mahal, a symbol of love and architectural beauty. Enjoy local cuisine, explore Agra Fort, and stroll through the bustling markets.",
  },
  {
    _id: "665f5b9e2f6b9c1b2c3d4e5b",
    name: "Jaipur",
    image: "https://plus.unsplash.com/premium_photo-1661962404003-e0ca40da40ef?w=1000&auto=format&fit=crop&q=60",
    description: "Experience the Pink City’s forts, palaces, and vibrant bazaars.",
    fullDescription:
      "Jaipur, known as the Pink City, offers a blend of royal heritage, colorful culture, and stunning architecture. Don't miss Amber Fort, City Palace, and traditional Rajasthani food.",
  },
  {
    _id: "665f5b9e2f6b9c1b2c3d4e5c",
    name: "Goa",
    image: "https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?w=1000&auto=format&fit=crop&q=60",
    description: "Relax on sun-kissed beaches and enjoy the lively nightlife.",
    fullDescription:
      "Goa is famous for its beaches, water sports, seafood, and vibrant nightlife. Explore old churches, spice plantations, and beach shacks.",
  },
  {
    _id: "665f5b9e2f6b9c1b2c3d4e5d",
    name: "Manali",
    image: "https://images.unsplash.com/photo-1656437717503-971f67b6af21?w=1000&auto=format&fit=crop&q=60",
    description: "Explore the Himalayas, adventure sports, and scenic valleys.",
    fullDescription:
      "Manali is a paradise for nature lovers and adventure seekers. Trekking, paragliding, river rafting, and beautiful mountain views await you.",
  },
  {
    _id: "665f5b9e2f6b9c1b2c3d4e5e",
    name: "Kerala Backwaters",
    image: "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?w=1000&auto=format&fit=crop&q=60",
    description: "Cruise through tranquil backwaters and lush green landscapes.",
    fullDescription:
      "Kerala's backwaters offer a unique experience of houseboat stays, coconut groves, and serene water channels. Enjoy local cuisine and traditional hospitality.",
  },
  {
    _id: "665f5b9e2f6b9c1b2c3d4e5f",
    name: "Rann of Kutch",
    image: "https://images.unsplash.com/photo-1660733617811-3d905e6c37c4?w=1000&auto=format&fit=crop&q=60",
    description: "Witness the white salt desert and vibrant cultural festivals.",
    fullDescription:
      "The Rann of Kutch is known for its surreal white salt desert, the Rann Utsav festival, folk music, and handicrafts. A must-visit for culture and photography lovers.",
  },
];

export default function BrowseTrips() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [likes, setLikes] = useState(() =>
    PRESELECTED_TRIPS.reduce((acc, trip) => ({ ...acc, [trip._id]: 0 }), {})
  );
  const [reviews, setReviews] = useState({});
  const [reviewText, setReviewText] = useState({});
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Fetch reviews for all trips on mount
  useEffect(() => {
    PRESELECTED_TRIPS.forEach(trip => {
      fetch(`${backendUrl}/api/reviews/${trip._id}`)
        .then(res => res.json())
        .then(data => {
          setReviews(prev => ({
            ...prev,
            [trip._id]: data.reviews || [],
          }));
        });
    });
  }, []);

  const handleAddTrip = async (trip) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setAdding(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${backendUrl}/api/roadtrips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: trip.name,
          description: trip.fullDescription,
          image: trip.image,
        }),
      });
      if (res.ok) {
        alert("Trip added to your list!");
        setShowModal(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add trip. Please try again.");
      }
    } catch (e) {
      alert("Network error. Please try again.");
    }
    setAdding(false);
  };
const handleLike = (tripId) => {
    if (!isLoggedIn) {
      alert("Login to like trips.");
      return;
    }
    setLikes((prev) => ({
      ...prev,
      [tripId]: prev[tripId] + 1,
    }));
    // For real app: POST to /api/roadtrips/:tripId/like
  };

  const handleReview = async (e, tripId) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Login to review.");
      return;
    }
    const text = reviewText[tripId]?.trim();
    if (!text) return;
    const token = localStorage.getItem("token");
    // Only allow posting if tripId is a valid ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(tripId)) {
      alert("Invalid trip ID.");
      return;
    }
    const res = await fetch(`${backendUrl}/api/reviews/${tripId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      const { review } = await res.json();
      setReviews(prev => ({
        ...prev,
        [tripId]: [...(prev[tripId] || []), review],
      }));
      setReviewText(prev => ({ ...prev, [tripId]: "" }));
    } else {
      alert("Failed to add review.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Browse Road Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESELECTED_TRIPS.map((trip) => (
          <div
            key={trip._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedTrip(trip);
              setShowModal(true);
            }}
          >
            <img
              src={trip.image}
              alt={trip.name}
              className="w-full h-48 object-cover transform hover:scale-105 transition-transform"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
              <p className="text-gray-600">{trip.description}</p>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  className={`px-3 py-1 rounded ${
                    isLoggedIn
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  onClick={e => {
                    e.stopPropagation();
                    handleLike(trip._id);
                  }}
                  disabled={!isLoggedIn}
                >
  
                  ❤️ Like {likes[trip._id]}
                </button>
              </div>
              <div className="mt-2">
                <div className="font-semibold mb-1">Reviews:</div>
                <ul className="mb-2">
                  {(reviews[trip._id] || []).map((r, i) => (
                    <li key={i} className="text-sm mb-1">
                      <b>{r.user?.username || "User"}:</b> {r.text}
                    </li>
                  ))}
                </ul>
                <form
                  className="flex"
                  onSubmit={e => handleReview(e, trip._id)}
                  onClick={e => e.stopPropagation()}
                >
                  <input
                    className="border rounded px-2 py-1 flex-1 mr-2"
                    value={reviewText[trip._id] || ""}
                    onChange={e =>
                      setReviewText(prev => ({
                        ...prev,
                        [trip._id]: e.target.value,
                      }))
                    }
                    placeholder={isLoggedIn ? "Add a review" : "Login to review"}
                    disabled={!isLoggedIn}
                  />
                  <button
                    className={`px-2 py-1 rounded ${
                      isLoggedIn
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={!isLoggedIn}
                  >
                    Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <img
              src={selectedTrip.image}
              alt={selectedTrip.name}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedTrip.name}</h3>
            <p className="mb-4">{selectedTrip.fullDescription}</p>
            {isLoggedIn ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
                onClick={() => handleAddTrip(selectedTrip)}
                disabled={adding}
                type="button"
              >
                {adding ? "Adding..." : "Add Trip"}
              </button>
            ) : (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                disabled
                type="button"
                onClick={() => navigate("/login")}
              >
                Login to Add Trip
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
