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
import { Menu, StarIcon } from "lucide-react";
import Link from "next/link";
import { useTMDBStore } from "@/store/useMovieStore";
import { MTV } from "@/types/tmdb";
import Image from "next/image";

interface NavbarProps {
  onSidebarToggle: () => void;
}

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { searchMovies, search, isLoading } = useTMDBStore();

  // Handle search debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        searchMovies(query);
      }
    }, 1000); // 1-second debounce

    return () => clearTimeout(timeoutId);
  }, [query, searchMovies]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <nav className="bg-background p-3 fixed top-0 w-full z-[999]">
      <div className="flex items-center justify-between">
        {/* Sidebar Toggle */}
        <div className="flex items-center gap-5">
          <Menu onClick={onSidebarToggle} />
          <Link href="/home" className="text-lg font-semibold">
            Home
          </Link>
        </div>

        {/* Search and User Section */}
        <div className="flex gap-5 items-center relative">
          {/* Search Input */}
          <Input
            placeholder="Search here..."
            value={query}
            onChange={handleChange}
            className="w-[200px] md:w-[300px]"
          />

          {/* Search Results Dropdown */}
          {query.trim() && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-md z-10">
              {isLoading ? (
                <div className="p-4">
                  {" "}
                  {/* Skeleton loader */}
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-4 bg-gray-300 rounded w-full"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-black/20">
                  {search?.slice(0, 6).map((movie: MTV) => (
                    <li
                      key={movie.id}
                      className="p-4 bg-muted hover:bg-muted/90 cursor-pointer flex items-center"
                    >
                      <div className="w-12 h-16 relative">
                        <Image
                          fill
                          sizes="100"
                          src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}/${movie.poster_path}`}
                          alt={movie.title || movie.name}
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-3 text-muted-foreground truncate">
                        <p className="font-semibold ">
                          {movie.title || movie.name}
                        </p>
                        <div className="text-sm flex gap-3">
                          <div>
                            {new Date(
                              movie.first_air_date || movie.release_date
                            ).getFullYear()}
                          </div>
                          <div>TV</div>
                          <div className="flex items-center gap-1">
                            <StarIcon className="size-4 text-yellow-700" />
                            <div>{movie.vote_average?.toFixed(1)}</div>{" "}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  {search?.length === 0 && (
                    <li className="p-4 text-gray-500 text-sm">
                      No results found
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}

          {/* User Avatar */}
          <div className="shrink-0">
            {isLoading ? (
              <div className="size-10 bg-gray-300 animate-pulse rounded-full" />
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
