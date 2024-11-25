"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Menu } from "lucide-react";

interface NavbarProps {
  onSidebarToggle: () => void;
}

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const { user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  setTimeout(() => {
    setIsLoading(false);
  }, 200); // Simulating loading state for demonstration
  return (
    <nav className="bg-background p-3 fixed top-0 w-full z-[999]">
      <div className="flex items-center justify-between">
        {/* Sidebar Toggle */}
        <div className="flex items-center gap-5">
          <Menu onClick={onSidebarToggle} />
        </div>

        {/* Search and User Section */}
        <div className="flex gap-5 items-center">
          <Input
            placeholder="Search here..."
            className="w-[200px] md:w-[300px]"
          />
          <div className="shrink-0">
            {/* Show skeleton or nothing while loading */}
            {isLoading ? (
              <div className="size-10 bg-gray-300 animate-pulse rounded-full" /> // Skeleton loader
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      className="size-10 rounded-full"
                      src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push("/login")} variant="default">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
