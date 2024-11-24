"use client";

import MovieCard from "@/components/movie-card";
import { movieService } from "@/services/movie.service";
import { tvService } from "@/services/tv.service";
import { Genre, Movie, MTV, ProductionCompany, TVShow } from "@/types/tmdb";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DetailParams {
  params: {
    type: string;
    id: number;
  };
}

const Detail = ({ params }: DetailParams) => {
  const { type, id } = await params;

  const [details, setDetails] = useState<MTV | null>(null);
  const [credits, setCredits] = useState<any[]>([]);
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
    setDetails(res.data);
  };

  const fetchTvDetails = async () => {
    const res = await tvService.getTvDetails(id);
    setDetails(res.data);
  };

  const fetchMovieCredits = async () => {
    const res = await movieService.getRecommendedMovies(id);
    setCredits(res.data.cast || []);
  };

  const fetchTvCredits = async () => {
    const res = await tvService.getRecommendedTv(id);
    setCredits(res.data.cast || []);
  };

  const fetchMovieVideos = async () => {
    const res = await movieService.getRecommendedMovies(id);
    setVideos(res.data.results || []);
  };

  const fetchTvVideos = async () => {
    const res = await tvService.getRecommendedTv(id);
    setVideos(res.data.results || []);
  };

  const fetchMovieRecommendations = async () => {
    const res = await movieService.getRecommendedMovies(id);
    setRecommendations(res.data.results || []);
  };

  const fetchTvRecommendations = async () => {
    const res = await tvService.getRecommendedTv(id);
    setRecommendations(res.data.results || []);
  };

  return (
    <div className="w-full relative overflow-auto pages bg-black">
      {details?.backdrop_path && (
        <Image
          className="hidden sm:block z-0 relative object-cover rounded-tl-3xl"
          alt="backdrop"
          src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
          fill
          sizes="100%"
        />
      )}
      <div className="absolute z-0 w-full h-full hidden sm:block gradient"></div>
      <div className="sm:flex flex-col sm:flex-row sm:h-full z-20 m-5">
        <div className="sm:w-2/3 w-full">
          {details?.poster_path && (
            <Image
              className="rounded-3xl sticky w-[24rem] top-[4.3rem]"
              src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
              alt="poster"
              width={344}
              height={512}
            />
          )}
        </div>
        <div className="z-30">
          <div className="sm:px-10 px-2 mt-6">
            <div className="sm:text-5xl text-3xl font-bold">
              {details?.title || details?.name}
            </div>
            <div className="my-5 flex text-[#918f90e2] text-lg gap-5 items-center">
              <div className="flex gap-2 items-center">
                <StarIcon width={18} color="#fcb900" height={18} />
                {details?.vote_average?.toFixed(1)}
              </div>
              <div className="flex">
                {details?.runtime
                  ? `${details.runtime} mins`
                  : details?.episode_run_time?.[0]
                  ? `${details.episode_run_time[0]} mins`
                  : ""}
              </div>
              <div className="flex">
                {new Date(
                  details?.release_date || details?.first_air_date || ""
                ).getFullYear()}
              </div>
              {details?.status && (
                <div className="text-xs py-1 px-2 rounded-md bg-[#313036]">
                  {details.status}
                </div>
              )}
            </div>
            <div className="flex flex-wrap my-8 sm:my-1 sm:flex-nowrap text-[#918f90e2] gap-2">
              {details?.genres.map((genre: Genre, index: number) => (
                <p key={index}>{genre.name}</p>
              ))}
            </div>
            {details && "number_of_seasons" in details && (
              <div className="flex gap-4 mt-4 text-[#918f90e2]">
                <p>
                  Seasons:{" "}
                  <span className="text-white">
                    {details.number_of_seasons}
                  </span>
                </p>
                <p>
                  Episodes:{" "}
                  <span className="text-white">
                    {details.number_of_episodes}
                  </span>
                </p>
              </div>
            )}
            <div className="mt-5 text-lg text-[#fffffff3]">
              {details?.overview.slice(0, 350)}...
            </div>
            <div className="sm:flex mt-6 text-lg">
              <div className="sm:w-1/4 text-[#918f90e2]">Starring:</div>
              <div className="sm:w-3/4 flex flex-wrap">
                {credits.slice(0, 10).map((cast, index) => (
                  <p key={index}>{cast.name},</p>
                ))}
              </div>
            </div>
            <div className="sm:flex mt-6 text-lg">
              <div className="sm:w-1/4 text-[#918f90e2]">Production:</div>
              <div className="sm:w-3/4 flex flex-wrap">
                {details?.production_companies.map(
                  (prod: ProductionCompany, index: number) => (
                    <p key={index}>{prod.name},</p>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 px-4">
            <div className="text-3xl my-5 font-bold">Trailers & Clips</div>
            {videos.length > 0 ? (
              <div className="flex gap-4 h-[10rem] overflow-auto overflow-y-hidden">
                {videos.slice(0, 6).map((video, index) => (
                  <iframe
                    key={index}
                    className="youtube-video inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            ) : (
              <div className="text-3xl sm:mx-72 text-red-700 my-20">
                No Videos Available
              </div>
            )}
            <div className="text-4xl ps-40 mt-6 hidden sm:block text-white">
              You may also like
            </div>
          </div>
        </div>
      </div>
      <div className="text-4xl ps-2 sm:hidden text-white">
        You may also like
      </div>
      <div className="overflow-auto px-4">
        <div className="flex gap-5 mt-6 sm:mt-44">
          {recommendations.map((recommendation, index) => (
            <MovieCard key={index} movie={recommendation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
