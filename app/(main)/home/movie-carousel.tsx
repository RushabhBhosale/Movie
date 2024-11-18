import MovieCard from "@/components/movie-card";
import { TVListResponse } from "@/types/tmdb";
import React from "react";

interface CardListProps {
  list: TVListResponse;
  title?: string;
}

const CardList = ({ list, title }: CardListProps) => {
  return (
    <>
      <p className="text-2xl my-2 sm:mt-6 font-bold">{title}</p>
      <div className="sm:mt-5 popular list overflow-x-auto">
        <div className="flex gap-5">
          {list &&
            list.results.map((movie: any, index: number) => (
              <MovieCard movie={movie} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default CardList;
