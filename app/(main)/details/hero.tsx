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
  TVListResponse,
} from "@/types/tmdb";
import { Clock10Icon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import React, { useEffect, useState } from "react";
import { DetailsSkeleton } from "./hero-skeletons";
import ReviewCard from "./review-card";
import CardList from "../home/movie-carousel";

interface HeroProps {
  type: string;
  id: number;
}

const Hero = ({ type, id }: HeroProps) => {
  const [details, setDetails] = useState<MTV>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<TVListResponse[]>([]);
  const [slice, setSlice] = useState<number>(200);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isTab = useMediaQuery("(max-width: 1300px)");

  useEffect(() => {
    const fetchData = async () => {
      if (type === "movie") {
        setLoading(true);
        const [
          detailsRes,
          creditsRes,
          videosRes,
          imagesRes,
          recommendationsRes,
          reviewsRes,
          topRatedRes,
        ] = await Promise.all([
          movieService.getMovieDetails(id),
          movieService.getMovieCredits(id),
          movieService.getMovieVideos(id),
          movieService.getMovieImages(id),
          movieService.getRecommendedMovies(id),
          movieService.getMovieReviews(id),
          movieService.getTopRatedMovies(),
        ]);
        setDetails(detailsRes.data.data || {});
        setCast(creditsRes.data.data.cast || []);
        setVideos(videosRes.data.data.results || []);
        setImages(imagesRes.data.data.posters || []);
        setRecommendations(recommendationsRes.data.data || []);
        setReviews(reviewsRes.data.data.results || []);
        setTopRated(topRatedRes.data.data.results || []);
      } else if (type === "tv") {
        const [
          detailsRes,
          creditsRes,
          videosRes,
          imagesRes,
          recommendationsRes,
          reviewsRes,
          topRatedRes,
        ] = await Promise.all([
          tvService.getTvDetails(id),
          tvService.getTvCredits(id),
          tvService.getTvVideos(id),
          tvService.getTvImages(id),
          tvService.getRecommendedTv(id),
          tvService.getTvReviews(id),
          tvService.getTopRatedTv(),
        ]);
        setDetails(detailsRes.data.data || {});
        setCast(creditsRes.data.data.cast || []);
        setVideos(videosRes.data.data.results || []);
        setImages(imagesRes.data.data.posters || []);
        setRecommendations(recommendationsRes.data.data || []);
        setReviews(reviewsRes.data.data.results || []);
        setTopRated(topRatedRes.data.data.results || []);
      }
    };

    fetchData();
    setLoading(false);
  }, [type, id]);

  if (loading) {
    return <DetailsSkeleton />;
  }

  console.log(recommendations);

  return (
    <div className="bg-black p-6">
      <div>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Poster and details */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Poster */}
            <div className="w-full h-[350px] md:h-[250px] lg:w-[350px] lg:h-[450px] shrink-0 rounded-lg overflow-hidden relative shadow-lg">
              {details?.poster_path ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}/${details.poster_path}`}
                  alt={details?.title || "Poster"}
                  fill
                  sizes="100"
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
                  {(details?.release_date || details?.first_air_date)?.slice(
                    0,
                    4
                  )}
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
                  <span className="text-muted-foreground font-medium">
                    Status:
                  </span>
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
                <div className="text-muted-foreground mr-2 shrink-0">
                  Starring:
                </div>
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
                          details?.production_companies.slice(0, 4).length -
                            1 && `,`}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`lg:flex gap-4 max-w-7xl mx-auto mt-6 md:px-6 lg:px-0 `}>
        {/* Main Card */}
        <div className="w-full lg:w-8/12">
          {type === "tv" && (
            <>
              <h3 className="text-2xl font-bold text-white mb-4">
                Seasons & Episodes
              </h3>
              <div className="lg:flex lg:flex-row gap-4 md:p-0  flex flex-col-reverse">
                <div className="bg-muted rounded-lg shadow-lg lg:w-4/6 p-6 flex flex-col gap-4">
                  {/* Title and Air Date */}
                  <div>
                    <h2 className="text-2xl font-bold truncate">
                      {details?.last_episode_to_air?.name ||
                        "No Title Available"}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Aired on{" "}
                      {details?.last_episode_to_air?.air_date
                        ? new Date(
                            details.last_episode_to_air.air_date
                          ).toDateString()
                        : "Date not available"}
                    </p>
                  </div>

                  {/* Overview */}
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {details?.last_episode_to_air?.overview ||
                      "No overview available for this episode."}
                  </p>

                  {/* Additional Details */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 text-yellow-500">
                        <StarIcon className="size-4" />
                      </span>
                      <span>
                        {details?.last_episode_to_air?.vote_average
                          ? details.last_episode_to_air.vote_average.toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 text-primary">
                        <Clock10Icon className="size-4" />
                      </span>
                      <span>
                        {details?.last_episode_to_air?.runtime || "N/A"} min
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Season{" "}
                        {details?.last_episode_to_air?.season_number || "?"},
                        Episode{" "}
                        {details?.last_episode_to_air?.episode_number || "?"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg shadow-lg lg:w-2/6 p-4 flex flex-col gap-4">
                  {/* Seasons and Episodes */}
                  <div>
                    <h3 className="text-lg font-bold">Details</h3>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold">
                          {details?.number_of_seasons || "?"}
                        </span>{" "}
                        Seasons
                      </p>
                      <p>
                        <span className="font-semibold">
                          {details?.number_of_episodes || "?"}
                        </span>{" "}
                        Episodes
                      </p>
                    </div>
                  </div>

                  {/* Streaming Network */}
                  <div>
                    <h3 className="text-lg font-bold">Available On</h3>
                    <p className="text-sm text-muted-foreground">
                      {details?.networks?.[0]?.name || "Unknown Network"}
                    </p>
                  </div>

                  {/* Average Runtime */}
                  <div>
                    <h3 className="text-lg font-bold">Average Runtime</h3>
                    <p className="text-sm text-muted-foreground">
                      {details?.episode_run_time?.[0] || "N/A"} minutes per
                      episode
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="my-4">
              <h3 className="text-2xl font-bold text-white mb-4">Reviews</h3>
              <div className="overflow-x-auto flex gap-4">
                {reviews.slice(0.4).map((review: any, index: number) => (
                  <ReviewCard
                    key={index}
                    author={review.author}
                    authorDetails={{
                      name: review.author,
                      avatarPath: review.author_details.avatar_path,
                      rating: review.author_details.rating,
                    }}
                    content={
                      review.content.length > 150
                        ? `${review.content.slice(0, 150)}...`
                        : review.content
                    }
                    createdAt={review.created_at}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Trailers */}
          {videos.length > 0 && (
            <div className="lg:flex gap-10 my-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Trailers</h3>
                <div className="flex gap-4 overflow-x-auto">
                  {videos.slice(0, isTab ? 3 : 4).map((video: any) => (
                    <div
                      key={video.id}
                      className="w-[200px] h-[150px] relative rounded-lg overflow-hidden shadow-md cursor-pointer flex-none"
                      onClick={() => setSelectedVideo(video.key)}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name || "Trailer"}
                        fill
                        sizes="200px" // Ensures correct sizing for the image
                        className="object-cover"
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
            </div>
          )}

          {/* Cast */}
          <div>
            <h3 className="text-2xl font-bold text-white mt-4">Top Cast</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {cast.map((cast: any) => (
                <div
                  key={cast.id}
                  className="flex items-center gap-2 shrink-0 my-4 bg-muted p-4 rounded-sm"
                >
                  <div className="relative size-20 shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}/${cast.profile_path}`}
                      alt={cast.name}
                      fill
                      sizes="100"
                      className="object-cover rounded-full shrink-0"
                    />
                  </div>
                  <div className="text-muted-foreground ">
                    <p className="font-bold">{cast.name}</p>
                    <p className="text-sm my-1">{cast.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Movies */}
          {recommendations && (
            <CardList
              title={`Recommended ${type === "tv" ? "TV Shows" : "Movies"}`}
              list={recommendations}
            />
          )}
        </div>

        {/* Right Panel */}
        <div className={`w-full lg:w-4/12 rounded-md bg-muted p-4 z-10`}>
          <h3 className="text-2xl font-bold text-white mb-4">Most Popular</h3>
          {topRated.slice(0, 10).map((topRated: MTV, index: number) => (
            <div key={index} className="flex gap-3 my-4">
              <div className="relative w-16 h-20">
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL}/${topRated.poster_path}`}
                  alt={topRated.name || topRated.title}
                  fill
                  sizes="100"
                  className="rounded-md"
                />
              </div>
              <div className="text-muted-foreground">
                <p className="font-bold">{topRated.name || topRated.title}</p>
                <p className="text-sm my-1">
                  {topRated.first_air_date
                    ? new Date(topRated.first_air_date).getFullYear()
                    : new Date(topRated.release_date).getFullYear()}
                </p>
                <div className="text-sm flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <StarIcon className="text-yellow-600 size-4" />{" "}
                    {topRated.vote_average.toFixed(1)}
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

export default Hero;
