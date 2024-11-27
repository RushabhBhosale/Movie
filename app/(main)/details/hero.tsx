"use client";

import MovieCard from "@/components/movie-card";
import { movieService } from "@/services/movie.service";
import { tvService } from "@/services/tv.service";
import {
  CastMember,
  CrewMember,
  Genre,
  MTV,
  ProductionCompany,
} from "@/types/tmdb";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HeroProps {
  type: string;
  id: number;
}

const Hero = ({ type, id }: HeroProps) => {
  const [details, setDetails] = useState<MTV>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (type === "movie") {
      fetchMovieDetails();
      fetchMovieCredits();
      fetchMovieVideos();
      fetchMovieRecommendations();
    } else if (type === "tv") {
      fetchTvDetails();
      fetchTvCredits();
      fetchTvVideos();
      fetchTvRecommendations();
    }
  }, [type, id]);

  const fetchMovieDetails = async () => {
    const res = await movieService.getMovieDetails(id);
    setDetails(res.data.data || {});
  };

  const fetchTvDetails = async () => {
    const res = await tvService.getTvDetails(id);
    setDetails(res.data.data || {});
  };

  const fetchMovieCredits = async () => {
    const res = await movieService.getMovieCredits(id);
    setCrew(res.data.data.crew || []);
    setCast(res.data.data.cast || []);
  };

  const fetchTvCredits = async () => {
    const res = await tvService.getTvCredits(id);
    setCrew(res.data.data.crew || []);
    setCast(res.data.data.cast || []);
  };

  const fetchMovieVideos = async () => {
    const res = await movieService.getMovieVideos(id);
    setVideos(res.data.data || []);
  };

  const fetchTvVideos = async () => {
    const res = await tvService.getTvVideos(id);
    setVideos(res.data.data || []);
  };

  const fetchMovieRecommendations = async () => {
    const res = await movieService.getRecommendedMovies(id);
    setRecommendations(res.data.data || []);
  };

  const fetchTvRecommendations = async () => {
    const res = await tvService.getRecommendedTv(id);
    setRecommendations(res.data.data || []);
  };

  return (
    <div className="w-full p-6 space-y-6 bg-black lg:rounded-3xl">
      {/* Poster and details */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Poster */}
        <div className="w-full h-[350px] md:h-[250px] lg:w-[350px] lg:h-[450px] shrink-0 rounded-lg overflow-hidden relative shadow-lg">
          {details?.poster_path ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}/${details.poster_path}`}
              alt={details?.title || "Poster"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
              No Poster Available
            </div>
          )}
        </div>

        {/* Movie Details */}
        <div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold">
            {details?.title || details?.name || "No Title"}
          </h2>
          <div className="flex text-lg my-3 text-muted-foreground gap-5">
            <div className="flex items-center gap-1">
              <StarIcon className="size-4 text-yellow-500" />
              {details?.vote_average.toFixed(1)}
            </div>
            <div>{details?.episode_run_time || details?.runtime}m</div>
            <div>
              {(details?.release_date || details?.first_air_date)?.slice(0, 4)}
            </div>
            {details?.adult ? (
              <div className="text-xs py-[6px] px-2 rounded-md bg-[#313036] ">
                A
              </div>
            ) : (
              ""
            )}
          </div>
          {/* Genre */}
          <div className=" flex flex-wrap gap-x-1 text-muted-foreground">
            {details?.genres?.map((genre: Genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          {/* Seasons & Episodes */}
          {type === "tv" && (
            <div className="flex gap-4 my-4">
              <div className="flex gap-1">
                <span className="text-muted-foreground font-medium">
                  Seasons:
                </span>
                <span>{details?.number_of_seasons}</span>
              </div>
              <div className="flex gap-1">
                <span className="text-muted-foreground font-medium">
                  Episodes:
                </span>
                <span>{details?.number_of_episodes}</span>
              </div>
            </div>
          )}
          {/* Status */}
          <div className="flex gap-4 my-4">
            <div className="flex gap-1">
              <span className="text-muted-foreground font-medium">Status:</span>
              <span>{details?.status}</span>
            </div>
          </div>
          {/* Overview */}
          <p className="mt-3 text-lg font-medium">
            {details?.overview && details?.overview.length > 200
              ? `${details?.overview.slice(0, 200)}...`
              : details?.overview || "No description available."}
          </p>
          {/* Created By */}
          {details?.created_by && details.created_by.length > 0 && (
            <div className="flex gap-4 my-4 font-medium">
              <div className="flex gap-1">
                <span className="text-muted-foreground font-medium">
                  Created By:
                </span>
                {details.created_by.map((author: any, index: number) => (
                  <span key={index}>{author.name}</span>
                ))}
              </div>
            </div>
          )}
          {/* Cast */}
          <div className="flex flex-wrap my-4 font-medium">
            <div className="text-muted-foreground mr-2 shrink-0">Starring:</div>
            <div className="flex flex-wrap gap-x-1">
              {cast.slice(0, 6).map((actor: CastMember, index: number) => (
                <div key={actor.id} className="shrink-0">
                  {actor.name}
                  {index < cast.slice(0, 6).length - 1 && `,`}
                </div>
              ))}
            </div>
          </div>
          {/* Production */}
          <div className="flex flex-wrap my-4 font-medium">
            <div className="text-muted-foreground mr-2 shrink-0">
              Production:
            </div>
            <div className="flex flex-wrap gap-x-1">
              {details?.production_companies
                ?.slice(0, 4)
                ?.map((prod: ProductionCompany, index: number) => (
                  <div key={prod.id} className="shrink-0">
                    {prod.name}
                    {index <
                      details?.production_companies.slice(0, 4).length - 1 &&
                      `,`}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
