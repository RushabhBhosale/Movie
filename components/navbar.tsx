"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <SidebarTrigger />
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
