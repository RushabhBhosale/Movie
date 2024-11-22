import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/modules";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { BookmarkIcon, Info, InfoIcon, PlayIcon } from "lucide-react";
import { TVListResponse } from "@/types/tmdb";
import { Button } from "@/components/ui/button";

interface HeroCarouselProps {
  list: TVListResponse;
}

const HeroCarousel = ({ list }: HeroCarouselProps) => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper w-full h-[32rem] rounded-xl"
      >
        {list &&
          list.results.map((movie: any, index: number) => (
            <SwiperSlide className="slides w-full relative" key={index}>
              <Image
                alt="backdrop"
                fill
                className="object-cover z-10"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
              <div className="absolute z-20 w-full h-full bg-black opacity-60"></div>
              <div className="absolute z-30 w-full h-full flex flex-col sm:justify-center justify-end px-6 sm:px-16">
                <h3 className="sm:text-5xl drop-shadow-lg text-3xl mb-1 text-white font-bold">
                  {movie.name}
                </h3>
                <div className="flex gap-6">
                  <p className=" text-gray-200 text-lg font-bold my-1 sm:my-4">
                    {new Date(movie.first_air_date).getFullYear()}
                  </p>
                  <p className=" text-white text-sm font-bold my-1 sm:my-4 px-2 py-1 rounded-sm bg-[#313036e7] bg-opacity-85">
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
                {/* <div className="mb-3">
                  {movie.genre_ids.map((genre, index) => (
                    <span
                      className="mx-1 text-xs font-semibold text-white"
                      key={index}
                    >
                      {getGenreById(genre)}
                    </span>
                  ))}
                </div> */}
                <div className="sm:w-2/4">
                  <div className="hidden sm:block">
                    {movie.overview.slice(0, 200)}...
                  </div>
                  <div className="sm:hidden text-xs">
                    {movie.overview.slice(0, 100)}...
                  </div>
                </div>
                <div className="flex gap-7">
                  <Link
                    href={`/detail/${movie.id}${
                      movie.title ? `movie${movie.title}` : `tv${movie.name}`
                    }`}
                  >
                    <div className="my-7">
                      <Button variant="default">
                        <PlayIcon className="size-5" />
                        Watch Now
                      </Button>
                    </div>
                  </Link>
                  <Link
                    href={`/detail/${movie.id}${
                      movie.title ? `movie${movie.title}` : `tv${movie.name}`
                    }`}
                  >
                    <div className="my-7">
                      <Button variant="secondary" className="rounded-full">
                        <BookmarkIcon className="size-5" />
                        Add to watchlist
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
