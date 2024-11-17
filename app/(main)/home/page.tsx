"use client";

import React, { useEffect, useState } from "react";
import HeroCarousel from "./hero-carousel";
import { tvService } from "@/services/tv.service";

const Home = () => {
  const [tvShows, setTvShows] = useState();
  const getTopRatedTvShows = async () => {
    try {
      const tvShows = await tvService.getTopRatedTv();
      console.log(tvShows);
      setTvShows(tvShows.data.data.results);
    } catch (error) {
      console.error("Error fetching top-rated TV shows:", error);
    }
  };

  useEffect(() => {
    getTopRatedTvShows();
  }, []);
  return (
    <div className="">
      <div>
        <HeroCarousel tv={tvShows} />
      </div>
    </div>
  );
};

export default Home;
