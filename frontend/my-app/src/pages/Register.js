import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to POST registration details to backend
  const postSignUpDetails = () => {
    fetch("https://mern-roadtrip-planner.onrender.com/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, username, tel, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        alert("Registration successful!");
        navigate("/login");
      })
      .catch(err => alert("Registration failed!"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postSignUpDetails();
    setEmail("");
    setTel("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="max-w-sm bg-gradient-to-br from-cyan-400 via-pink-200 to-pink-500 mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2"
            value={tel}
            required
            onChange={e => setTel(e.target.value)}
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
          Sign Up
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
