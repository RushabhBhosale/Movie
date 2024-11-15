"use client";

import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Calendar,
  ChevronRight,
  CirclePlay,
  Clock,
  CreativeCommons,
  Mic,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getTopRatedTVShows } from "@/app/services/tv.service";

const Home = () => {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: false, delay: 5000, stopOnInteraction: true }),
  ]);

  const getTopRatedTv = async () => {
    const tvs = await getTopRatedTVShows();
    setTvShows(tvs);
  };

  useEffect(() => {
    getTopRatedTv();
  }, []);

  return (
    <div className="w-full h-[85vh]">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {tvShows.map((show, index) => (
            <div
              key={show.id} // Use `show.id` as the unique key
              className="embla__slide flex-none w-full h-full relative"
            >
              {/* Slide Background Image */}
              <div
                className="relative w-full h-full bg-cover bg-no-repeat flex items-center px-8"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`, // Use the full URL for the backdrop image
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
                    {show.name} {/* Show name from the object */}
                  </h2>
                  <div className="flex items-center gap-2 text-primary text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <CirclePlay className="size-4" /> TV
                    </span>
                    <span>
                      <Calendar className="size-4" />
                    </span>
                    <span>{show.first_air_date}</span> {/* Air date */}
                    <span className="px-2 py-1 bg-pink text-xs font-bold text-black rounded-md">
                      HD
                    </span>
                    <span className="px-2 py-1 bg-green font-bold text-black flex gap-1 items-center text-xs rounded-md">
                      {show.vote_average} {/* Display average rating */}
                    </span>
                    <span className="px-2 py-1 flex items-center gap-1 bg-blue text-black font-bold text-xs rounded-md">
                      {show.vote_count} {/* Display the vote count */}
                    </span>
                  </div>
                  <p className="text-primary/85 mb-6">{show.overview}</p>{" "}
                  {/* Show description */}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
