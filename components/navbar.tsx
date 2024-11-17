"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <nav className="bg-background p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5"></div>
        <div className="flex gap-5 items-center ">
          <Input placeholder="Search here..." />
          <div className="shrink-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      className="size-8 rounded-full"
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
              <Button
                onClick={() => router.push("/login")}
                variant="primary"
                className="text-blue-500"
              >
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
