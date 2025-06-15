// src/pages/Home.js
import { Link } from "react-router-dom";


export default function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500 flex flex-col items-center">
      
      <section className="mt-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4 text-center">
          Plan Your Next Adventure!
        </h1>
        <p className="text-lg md:text-xl text-white mb-6 text-center max-w-xl">
          Discover amazing road trips, share your own journeys, and connect with fellow travelers. RoadTrip makes planning and experiencing adventures easier than ever.
        </p>
        <Link
          to="/trips"
          className="bg-blue-700 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition mb-8"
        >
          Browse Trips
        </Link>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Road Trip"
          className="rounded-2xl shadow-lg w-full max-w-2xl"
        />
      </section>
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full px-4">
        <div className="bg-white bg-opacity-80 rounded-xl p-6 shadow text-center">
          <h3 className="text-xl font-bold mb-2 text-blue-700">Discover Destinations</h3>
          <p className="text-gray-600">Explore curated road trips and find your next adventure.</p>
        </div>
        <div className="bg-white bg-opacity-80 rounded-xl p-6 shadow text-center">
          <h3 className="text-xl font-bold mb-2 text-pink-700">Share Your Journey</h3>
          <p className="text-gray-600">Create and share your own trip stories with the community.</p>
        </div>
        <div className="bg-white bg-opacity-80 rounded-xl p-6 shadow text-center">
          <h3 className="text-xl font-bold mb-2 text-cyan-700">Join the Community</h3>
          <p className="text-gray-600">Connect with fellow travelers and make new friends.</p>
        </div>
      </section>
    </div>
  );
}
