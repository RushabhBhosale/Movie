"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { getTokenFromServer } from "@/utils/cookies";

const Navbar = () => {
  const { user, logout, setUser, setToken } = useAuthStore();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenFromServer();
      if (token) {
        // You can optionally fetch user data based on the token
        setUser({ token });
      }
    };

    fetchToken();
  }, [setUser, setToken]);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">My App</h1>
      <div>
        {user ? (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        ) : (
          <button className="text-blue-500">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
