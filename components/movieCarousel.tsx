import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import MovieCard from "./movieCard";

const MovieCarousel = ({ movies }: { movies: any[] }) => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={10}
        slidesPerView={5} // Show 5 movie cards at once
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="swiper-container"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
