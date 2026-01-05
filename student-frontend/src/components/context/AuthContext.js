import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Save token when logged in
  const login = (tokenValue) => {
    setToken(tokenValue);
    localStorage.setItem("token", tokenValue);
    setLastActivity(Date.now());
  };

  // Logout function
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    window.location.href = "/login"; // force redirect
  };

  // Track user activity (mouse, keyboard)
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
    };
  }, []);

  // Auto logout after 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && Date.now() - lastActivity > 1 * 60 * 1000) {
        // alert("Logged out due to inactivity!");
        logout();
      }
    }, 4000); // check every 5 sec

    return () => clearInterval(interval);
  }, [token, lastActivity]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
