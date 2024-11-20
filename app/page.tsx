"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { trendingService } from "@/services/trending.service";
import { CircleArrowRight, Menu, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [keywords, setKeywords] = useState([]);
  const [banner, setBanner] = useState([]);
  const router = useRouter();
  const getKeywords = async () => {
    try {
      const keywords = await trendingService.getTrendingKeywords();
      setBanner(keywords.data.data.results[16].backdrop_path);
      const trending = keywords.data.data.results.map((item: any) => {
        const value = item.name || item.title;
        return value.length > 20 ? `${value.slice(0, 20)}...` : value;
      });
      const topTenTrending = trending;
      setKeywords(topTenTrending);
      console.log("Kewords", topTenTrending);
    } catch (error) {
      console.error("Error fetching trending keywords:", error);
    }
  };

  useEffect(() => {
    getKeywords();
  }, []);
  return (
    <div>
      {/* Nav */}
      <div className="lg:mt-16 mt-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center lg:justify-center gap-x-16 px-6">
            <div className="lg:hidden cursor-pointer">
              <Drawer>
                <DrawerTrigger>
                  <Menu />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                    <DrawerClose />
                  </DrawerHeader>
                  <div className="px-8 flex flex-col gap-4">
                    <div className="font-bold">Home</div>
                    <div className="font-bold">Movies</div>
                    <div className="font-bold">TV Series</div>
                    <div className="font-bold">Most Popular</div>
                    <div className="font-bold">Top Airing</div>
                  </div>
                  <DrawerFooter></DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="font-bold hidden lg:block">Home</div>
            <div className="font-bold hidden lg:block">Movies</div>
            <div className="font-bold hidden lg:block">TV Series</div>
            <div className="font-bold hidden lg:block">Most Popular</div>
            <div className="font-bold hidden lg:block">Top Airing</div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${banner})`,
          backgroundPosition: "200px center",
        }}
        className="max-w-[94%] mx-auto rounded-3xl h-[65vh] bg-cover bg-right bg-no-repeat"
      >
        <div className="z-10 w-full h-full rounded-3xl bg-gradient-to-r from-black via-black/90 to-transparent p-20">
          <div className="w-[40%]">
            <div className="text-5xl font-bold">Movie</div>
            <div className="flex items-center justify-between gap-3 my-6">
              <Input
                placeholder="Search ..."
                className="bg-foreground text-black"
              />
              <Button variant="primary">
                <SearchIcon />
              </Button>
            </div>
            <div>
              <p>
                <span className="font-semibold"> Top search: </span>
                {keywords.map((item, i) => (
                  <span className="text-sm font-bold" key={i}>
                    {item} {i < keywords.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
            <Button
              variant="primary"
              className="font-medium px-5 mt-6 rounded-xl"
              onClick={() => router.push("home")}
            >
              Watch Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
