// src/utils/auth.js
export function isLoggedIn() {
    // Example: check for a token in localStorage
    return !!localStorage.getItem("token");
  }
  