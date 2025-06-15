import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Adjust the path as needed

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const postLoginDetails = () => {
    fetch("https://mern-roadtrip-planner.onrender.com/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login successful!");
          localStorage.setItem("token", data.token); // Store JWT
          // Fetch user profile and update context
          fetch("/api/auth/profile", {
            headers: { Authorization: `Bearer ${data.token}` }
          })
            .then(res => res.json())
            .then(profile => {
              setUser(profile.user); // Update global user state
              navigate("/profile");
            });
        }
      })
      .catch(() => alert("Login failed!"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postLoginDetails();
    setPassword("");
    setEmail("");
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500 mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            required
            minLength={8}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-800 transition">
          Sign In
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
