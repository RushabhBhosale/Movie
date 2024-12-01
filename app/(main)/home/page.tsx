"use client";

import React, { useEffect, useState } from "react";
import HeroCarousel from "./hero-carousel";
import { tvService } from "@/services/tv.service";
import CardList from "./movie-carousel";
import { movieService } from "@/services/movie.service";

const Home = () => {
  const [tvShows, setTvShows] = useState([]);
  const [movies, setMovies] = useState();
  const getTopRatedTvShows = async () => {
    try {
      const tvShows = await tvService.getTopRatedTv();
      setTvShows(tvShows.data.data.results);
    } catch (error) {
      console.error("Error fetching top-rated TV shows:", error);
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const movies = await movieService.getTopRatedMovies();
      setMovies(movies.data.data);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    }
  };

  useEffect(() => {
    getTopRatedTvShows();
    getTopRatedMovies();
  }, []);
  return (
    <div className="p-5">
      <HeroCarousel list={tvShows} />
      <CardList title="Top Rated Tv Shows" list={tvShows} />
    </div>
  );
};

export default Home;
