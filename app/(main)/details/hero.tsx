"use client";

import { Button } from "@/components/ui/button";
import { movieService } from "@/services/movie.service";
import { tvService } from "@/services/tv.service";
import {
  CastMember,
  CrewMember,
  Genre,
  MTV,
  ProductionCompany,
} from "@/types/tmdb";
import { PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface HeroProps {
  type: string;
  id: number;
}

const Hero = ({ type, id }: HeroProps) => {
  const [details, setDetails] = useState<MTV>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [slice, setSlice] = useState<number>(200);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "movie") {
        const [
          detailsRes,
          creditsRes,
          videosRes,
          imagesRes,
          recommendationsRes,
        ] = await Promise.all([
          movieService.getMovieDetails(id),
          movieService.getMovieCredits(id),
          movieService.getMovieVideos(id),
          movieService.getMovieImages(id),
          movieService.getRecommendedMovies(id),
        ]);
        setDetails(detailsRes.data.data || {});
        setCrew(creditsRes.data.data.crew || []);
        setCast(creditsRes.data.data.cast || []);
        setVideos(videosRes.data.data.results || []);
        setImages(imagesRes.data.data.posters || []);
        setRecommendations(recommendationsRes.data.data || []);
      } else if (type === "tv") {
        const [
          detailsRes,
          creditsRes,
          videosRes,
          imagesRes,
          recommendationsRes,
        ] = await Promise.all([
          tvService.getTvDetails(id),
          tvService.getTvCredits(id),
          tvService.getTvVideos(id),
          tvService.getTvImages(id),
          tvService.getRecommendedTv(id),
        ]);
        setDetails(detailsRes.data.data || {});
        setCrew(creditsRes.data.data.crew || []);
        setCast(creditsRes.data.data.cast || []);
        setVideos(videosRes.data.data.results || []);
        setImages(imagesRes.data.data.posters || []);
        setRecommendations(recommendationsRes.data.data || []);
      }
    };

    fetchData();
  }, [type, id]);

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
          <h2 className="text-3xl md:text-4xl  font-bold">
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
          <div className=" flex flex-wrap gap-x-3 text-muted-foreground">
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
            {details?.overview &&
            details?.overview.length > 200 &&
            slice < details?.overview.length
              ? `${details?.overview.slice(0, slice)}...`
              : details?.overview || "No description available."}

            {details?.overview && details?.overview.length > 200 && (
              <Button
                variant="ghost"
                className="text-muted-foreground bg-muted size-5 text-xl ml-2"
                onClick={() => setSlice(slice === 99999 ? 200 : 99999)}
              >
                {slice === 99999 ? "-" : "+"}
              </Button>
            )}
          </p>
          {/* Created By */}
          {details?.created_by && details.created_by.length > 0 && (
            <div className="flex gap-4 my-4 font-medium">
              <div className="flex flex-wrap gap-1">
                <span className="text-muted-foreground font-medium shrink-0">
                  Created By:
                </span>
                {details.created_by.map((author: any, index: number) => (
                  <span key={index}>
                    {author.name}
                    {index < details.created_by.length - 1 && `,`}
                  </span>
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

      {/* Trailers */}
      <div className="lg:flex gap-10">
        <div>
          <h3 className="text-2xl font-bold text-white">Trailers</h3>
          {/* Video Gallery Thumbnails */}
          <div className="flex gap-4 overflow-x-auto">
            {videos.slice(0, 2).map((video: any) => (
              <div
                key={video.id}
                className="w-[200px] h-[150px] relative group rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedVideo(video.key)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                  alt={video.name || "Trailer"}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayIcon className="w-10 h-10 text-white" />
                </div>
              </div>
            ))}
          </div>

          {selectedVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative w-full max-w-3xl">
                <button
                  className="absolute top-4 right-4 text-white text-2xl"
                  onClick={() => setSelectedVideo(null)}
                >
                  ✕
                </button>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[400px] rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <h3 className="text-2xl font-bold text-white">Images</h3>
          <div className="sm:mt-5 list overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {images.map((image: any) => (
                <div
                  key={image.file_path}
                  className="w-[200px] h-[110px] relative flex-shrink-0 rounded-sm overflow-hidden"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}/${image.file_path}`}
                    alt="Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover shrink-0 hover:scale-110 transition-transform hover:object-contain"
                  />
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
