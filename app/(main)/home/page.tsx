"use client";

import React, { useEffect, useState } from "react";
import HeroCarousel from "./hero-carousel";
import { tvService } from "@/services/tv.service";
import CardList from "./movie-carousel";

const Home = () => {
  const [tvShows, setTvShows] = useState();
  const getTopRatedTvShows = async () => {
    try {
      const tvShows = await tvService.getTopRatedTv();
      setTvShows(tvShows.data.data);
    } catch (error) {
      console.error("Error fetching top-rated TV shows:", error);
    }
  };

  useEffect(() => {
    getTopRatedTvShows();
  }, []);
  return (
    <div>
      <div>
        <HeroCarousel
          tv={
            tvShows || {
              page: 1,
              results: [],
              total_pages: 1,
              total_results: 0,
            }
          }
        />
        <CardList
          title="Top Rated Tv Shows"
          list={
            tvShows || {
              page: 1,
              results: [],
              total_pages: 1,
              total_results: 0,
            }
          }
        />
      </div>
    </div>
  );
};

export default Home;
