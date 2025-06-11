// src/components/ApiTest.js
import React, { useEffect, useState } from "react";

export default function ApiTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("API not reachable"));
  }, []);

  return (
    <div>
      
      <p>{message}</p>
    </div>
  );
}
