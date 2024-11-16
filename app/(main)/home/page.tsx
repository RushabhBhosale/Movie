"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, CirclePlay, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import {
  getTopRatedTVShows,
  getPopularTVShows,
} from "@/app/services/tv.service"; // Assuming you have the movies service
import MovieCarousel from "@/components/movieCarousel"; // Custom carousel component for movie cards

const Home = () => {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);

  // Fetch top-rated TV shows
  const getTopRatedTv = async () => {
    try {
      const tvs = await getTopRatedTVShows();
      setTvShows(tvs.data?.data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch popular movies
  const getPopularMoviesList = async () => {
    try {
      const popularMovies = await getPopularTVShows(); // Modify if needed to get movies
      setMovies(popularMovies.data?.data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTopRatedTv();
    getPopularMoviesList();
  }, []);

  return (
    <div>
      {/* Hero Carousel - Main Spotlight */}
      <div className="w-full h-[85vh]">
        <Swiper
          spaceBetween={10}
          slidesPerView={1} // Show 1 slide at once (Full screen hero)
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="swiper-container h-full"
        >
          {tvShows.map((show, index) => (
            <SwiperSlide key={show.id}>
              {/* Hero Slide - Background Image */}
              <div
                className="relative w-full h-full bg-cover bg-no-repeat flex items-center px-8"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 w-2/3 bg-gradient-to-r from-black/90 via-black/80 to-transparent"></div>

                {/* Slide Content */}
                <div className="text-primary-foreground max-w-3xl relative z-10 p-6">
                  <h6 className="text-pink font-semibold text-lg mb-2">
                    #{index + 1} Spotlight
                  </h6>
                  <h2 className="text-primary font-bold text-4xl mb-4">
                    {show.name}
                  </h2>
                  <div className="flex items-center gap-2 text-primary text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <CirclePlay className="size-4" /> TV
                    </span>
                    <span>
                      <Calendar className="size-4" />
                    </span>
                    <span>{show.first_air_date}</span>
                    <span className="px-2 py-1 bg-pink text-xs font-bold text-black rounded-md">
                      HD
                    </span>
                    <span className="px-2 py-1 bg-green font-bold text-black flex gap-1 items-center text-xs rounded-md">
                      {show.vote_average}
                    </span>
                    <span className="px-2 py-1 flex items-center gap-1 bg-blue text-black font-bold text-xs rounded-md">
                      {show.vote_count}
                    </span>
                  </div>
                  <p className="text-primary/85 mb-6">{show.overview}</p>
                  <div className="flex gap-4">
                    <Button
                      variant="primary"
                      className="rounded-full px-6 py-2"
                    >
                      Details <ChevronRight />
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Movie Carousel - Scrollable Movie Cards */}
      <div className="mt-10">
        <MovieCarousel movies={movies} />
      </div>
    </div>
  );
};

export default Home;
