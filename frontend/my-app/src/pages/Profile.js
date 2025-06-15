import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://mern-roadtrip-planner.onrender.com/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUser({
            name: data.user.username,
            email: data.user.email,
            bio: data.user.bio || "Travel enthusiast. Love exploring new places and sharing stories.",
            avatar: data.user.avatar || "https://i.pravatar.cc/150?img=3",
            location: data.user.location || "Unknown",
          });
          setFormData({
            name: data.user.username,
            email: data.user.email,
            bio: data.user.bio || "Travel enthusiast. Love exploring new places and sharing stories.",
            location: data.user.location || "Unknown",
            avatar: data.user.avatar || "https://i.pravatar.cc/150?img=3",
          });
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://mern-roadtrip-planner.onrender.com/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.name,
          bio: formData.bio,
          location: formData.location,
          avatar: formData.avatar,
        }),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const data = await response.json();
      setUser({
        ...user,
        name: data.user.username,
        bio: data.user.bio,
        location: data.user.location,
        avatar: data.user.avatar,
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-cyan-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <div className="text-xl text-gray-700">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <img
          src={user.avatar}
          alt="User avatar"
          className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow mb-4"
        />
        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
        <p className="text-gray-600 mb-2">{user.location}</p>
        <p className="text-gray-700 mb-4 text-center">{user.bio}</p>
        <div className="w-full border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-700">{user.email}</span>
          </div>
        </div>
        <button
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          onClick={handleEditClick}
        >
          Edit Profile
        </button>

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Avatar URL</label>
                  <input
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
