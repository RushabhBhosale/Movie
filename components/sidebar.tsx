"use client";

import { Compass, TrendingUp, BookmarkCheck, Settings } from "lucide-react";

import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Browse",
    url: "/browse",
    icon: Compass,
  },
  {
    title: "Trending",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "Watchlist",
    url: "#",
    icon: BookmarkCheck,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="bg-background w-full h-[90.7vh] overflow-auto">
      <ul>
        {items.map((item) => (
          <li
            key={item.title}
            className={`flex items-center py-2 px-4 ${
              pathname === item.url
                ? "bg-gray-700 text-white"
                : "text-gray-500 hover:bg-gray-600"
            }`}
          >
            <item.icon className="mr-4" />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
