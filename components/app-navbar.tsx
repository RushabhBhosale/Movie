"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search } from "lucide-react";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const router = useRouter();
  const { removeToken, isAuthenticated, token } = useAuthStore();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (token !== null) {
      setLoading(false); // Once the token is loaded, stop the loading state
    } else {
      setLoading(false); // In case there's no token, stop loading
    }
  }, [token]);

  return (
    <div className="w-full px-4 md:px-8 py-4 bg-primary-foreground">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 flex items-center gap-5">
          <SidebarTrigger />
          <div className="flex relative">
            <Input
              className="lg:w-[250px] pl-10"
              placeholder="Search any movies or series"
            />
            <Search className="absolute top-[11px] left-2 size-[18px] text-muted-foreground " />
          </div>
        </div>
        <div className="flex gap-2 md:gap-6 items-center">
          {!loading &&
            (isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-7 lg:size-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RB</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="-ml-20">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Watchlist</DropdownMenuItem>
                  <DropdownMenuItem>Watching now</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => removeToken()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="primary" onClick={() => router.push("/login")}>
                Login
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
