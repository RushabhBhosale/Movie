"use client";

import MovieCard from "@/components/movie-card";
import { movieService } from "@/services/movie.service";
import { tvService } from "@/services/tv.service";
import { Genre, MTV, ProductionCompany } from "@/types/tmdb";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface MainHeaderProps {
  type: string;
  id: number;
}

const MainHeader = ({ type, id }: MainHeaderProps) => {
  const [details, setDetails] = useState<MTV>();
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
    setDetails(res.data.data || {});
  };

  const fetchTvDetails = async () => {
    const res = await tvService.getTvDetails(id);
    setDetails(res.data.data || {});
  };

  const fetchMovieCredits = async () => {
    const res = await movieService.getMovieCredits(id);
    setCredits(res.data.data || []);
  };

  const fetchTvCredits = async () => {
    const res = await tvService.getTvCredits(id);
    setCredits(res.data.data || []);
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

  console.log(credits);

  return (
    <>
      <div className="">Hello</div>
    </>
  );
};

export default MainHeader;
