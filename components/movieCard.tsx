import { StarIcon, PlusCircleIcon } from "lucide-react"; // Assuming you have these icons installed

const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <div className="relative flex-shrink-0 overflow-hidden mb-2 w-full h-[350px] sm:w-[250px] md:w-[280px] group">
      {/* Movie Poster */}
      <img
        className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title || movie.name}
      />

      {/* Top-Right Watchlist Icon */}
      <div className="absolute top-2 right-2 z-10">
        <button className="text-white bg-black/60 hover:bg-black p-2 rounded-full transition-all">
          <PlusCircleIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Movie Info - Initial View */}
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent p-4 w-full h-[100px] rounded-b-md flex flex-col justify-end group-hover:h-full transition-all duration-300">
        {/* Title and Release Year */}
        <div className="">
          <h3 className="font-bold text-sm truncate w-[80%]">
            {movie.title || movie.name}
          </h3>
          <p className="text-xs">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : movie.first_air_date}
          </p>
        </div>

        {/* Movie Rating */}
        <div className="flex items-center text-sm">
          <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
        </div>

        {/* Hover Content */}
        <div className="hidden group-hover:block mt-3">
          {/* Genres */}
          <div className="flex gap-2 mb-2">
            {movie.genres?.map((genre: string) => (
              <span
                key={genre}
                className="text-xs bg-blue-600 px-2 py-1 rounded-md"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-xs text-gray-300 line-clamp-3 mb-2">
            {movie.overview || "No description available."}
          </p>

          {/* Cast */}
          <div>
            <p className="font-bold text-sm mb-1">Cast</p>
            <div className="flex -space-x-2">
              {movie.cast?.slice(0, 5).map((actor: any, index: number) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                  className="w-8 h-8 object-cover rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
