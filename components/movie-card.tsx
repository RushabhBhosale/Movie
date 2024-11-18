import Link from "next/link";
import { Movie, TVShow } from "../types/tmdb";
import { StarIcon } from "lucide-react";

type MovieCardProps = {
  movie: Movie | TVShow;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const isMovie = (item: Movie | TVShow): item is Movie => "title" in item;

  return (
    <div className="relative flex-shrink-0 overflow-hidden mb-2">
      <Link
        href={`/detail/${movie.id}${
          isMovie(movie) ? `movie${movie.title}` : `tv${movie.name}`
        }`}
      >
        <img
          className="sm:rounded-3xl rounded-md w-25 sm:w-52 h-40 sm:h-72 object-cover cursor-pointer"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="poster"
        />
      </Link>
      <div className="text-xl hidden sm:block font-bold py-2">
        {isMovie(movie)
          ? movie.title.length > 17
            ? `${movie.title.slice(0, 17)}...`
            : movie.title
          : movie.name.length > 17
          ? `${movie.name.slice(0, 17)}...`
          : movie.name}
      </div>
      <div className="sm:flex hidden justify-between">
        <div className="flex">
          <div className="pe-1 text-yellow-400">
            <StarIcon width={20} height={20} />
          </div>
          <div>{movie.vote_average.toFixed(1)}</div>
        </div>
        <div className="bg-[#313036] text-white text-xs rounded-sm px-2 py-1 font-semibold">
          {isMovie(movie)
            ? new Date(movie.release_date).getFullYear()
            : new Date(movie.first_air_date).getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
