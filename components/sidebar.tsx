"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { ChevronLeft } from "lucide-react";

// Updated menu categories for your anime and TV-related website.
const categories = [
  { title: "Popular TV Shows", url: "/popular-tv" },
  { title: "Top Rated Movies", url: "/top-rated-movies" },
  { title: "Trending Now", url: "/trending" },
  { title: "Latest Releases", url: "/latest-releases" },
  { title: "Anime", url: "/anime" },
  { title: "Movies", url: "/movies" },
  { title: "TV Series", url: "/tv-series" },
  { title: "My Watchlist", url: "/watchlist" },
  { title: "Favorites", url: "/favorites" },
  { title: "Recommendations", url: "/recommendations" },
];

const genres = [
  { title: "Action", color: "text-green-500" },
  { title: "Adventure", color: "text-pink-500" },
  { title: "Comedy", color: "text-yellow-500" },
  { title: "Drama", color: "text-blue-500" },
  { title: "Fantasy", color: "text-indigo-500" },
  { title: "Horror", color: "text-red-500" },
  { title: "Romance", color: "text-purple-500" },
  { title: "Sci-Fi", color: "text-teal-500" },
  { title: "Thriller", color: "text-orange-500" },
  { title: "Mystery", color: "text-gray-500" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-[#5b595cab] mt-1 w-[300px] h-[100vh] overflow-y-auto transition-transform fixed left-0 top-0 z-[100]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <button
        onClick={onClose}
        className="text-white text-sm px-4 py-2 flex items-center w-full"
      >
        <span className="flex items-center">
          <ChevronLeft /> Close menu
        </span>
      </button>
      <div className="px-4 overflow-y-auto h-[calc(100vh-56px)]">
        {/* Logo / name Section */}
        <div className="flex items-center space-x-2 py-4 text-lg font-bold px-4">
          Rushabh Bhosale
        </div>

        {/* Categories Section */}
        <ul>
          {categories.map((item) => (
            <Link href={item.url} key={item.title}>
              <li
                className={`py-4 px-4 ${
                  pathname === item.url
                    ? "text-white text-lg bg-gray-800"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.title}
              </li>
              <Separator className="bg-white/5" />
            </Link>
          ))}
        </ul>

        <div className="mt-4">
          {/* Genre Section */}
          <h3 className="text-gray-500 text-sm uppercase">Genres</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {genres.map((genre) => (
              <span
                key={genre.title}
                className={`${genre.color} text-sm hover:underline cursor-pointer`}
              >
                {genre.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
