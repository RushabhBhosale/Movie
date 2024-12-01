import { movieService } from "@/services/movie.service";
import { tvService } from "@/services/tv.service";
import axiosClient from "@/utils/axiosClient";
import { create } from "zustand";

interface MovieState {
  isLoading: boolean;
  movies: {
    details: any | null;
    trending: any | null;
    topRated: any | null;
    cast: any | null;
    videos: any | null;
    images: any | null;
    recommendations: any | null;
    reviews: any | null;
    similar: any | null;
  };
  search: any | null;
  fetchDetails: (type: "movie" | "tv", id: number) => Promise<void>;
  fetchTrending: (type: "movie" | "tv") => Promise<void>;
  fetchTopRated: (type: "movie" | "tv") => Promise<void>;
  fetchCredits: (type: "movie" | "tv", id: number) => Promise<void>;
  fetchVideos: (type: "movie" | "tv", id: number) => Promise<void>;
  fetchImages: (type: "movie" | "tv", id: number) => Promise<void>;
  fetchRecommendations: (type: "movie" | "tv", id: number) => Promise<void>;
  fetchReviews: (type: "movie" | "tv", id: number) => Promise<void>;
  fetchSimilar: (type: "movie" | "tv", id: number) => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
}

export const useTMDBStore = create<MovieState>((set) => ({
  isLoading: false,
  movies: {
    details: null,
    trending: null,
    topRated: null,
    cast: null,
    videos: null,
    images: null,
    recommendations: null,
    reviews: null,
    similar: null,
  },
  search: null,

  // fetch search results
  searchMovies: async (query: string) => {
    console.log(query);
    set({ isLoading: true });
    try {
      const response = await axiosClient.get(
        `http://localhost:3000/api/tmdb/search?query=${query}`
      );
      console.log(response);
      set((state) => ({
        search: response.data.data.tv, // Directly updating search with results
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to search movies:", error);
      set({ isLoading: false });
    }
  },

  // Fetch top rated

  // Fetch details
  fetchDetails: async (type, id) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getMovieDetails(id)
          : await tvService.getTvDetails(id);
      set((state) => ({
        movies: { ...state.movies, details: response.data.data },
        isLoading: false,
      }));
    } catch (error) {
      console.error(
        `Failed to fetch details for ${type} with id ${id}:`,
        error
      );
      set({ isLoading: false });
    }
  },

  // Fetch trending
  fetchTrending: async (type) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getTrendingMovies()
          : await tvService.getTrendingTv();
      set((state) => ({
        movies: { ...state.movies, trending: response.data.data.results },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
      set({ isLoading: false });
    }
  },

  // Fetch top-rated
  fetchTopRated: async (type) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getTopRatedMovies()
          : await tvService.getTopRatedTv();
      set((state) => ({
        movies: { ...state.movies, topRated: response.data.data.results },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch top-rated movies:", error);
      set({ isLoading: false });
    }
  },

  // Fetch credits
  fetchCredits: async (type, id) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getMovieCredits(id)
          : await tvService.getTvCredits(id);

      set((state) => ({
        movies: { ...state.movies, cast: response.data.data.cast || null },
        isLoading: false,
      }));
    } catch (error) {
      console.error(
        `Failed to fetch credits for ${type} with id ${id}:`,
        error
      );
      set({ isLoading: false });
    }
  },

  // Fetch videos
  fetchVideos: async (type, id) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getMovieVideos(id)
          : await tvService.getTvVideos(id);
      set((state) => ({
        movies: { ...state.movies, videos: response.data.data.results },
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Failed to fetch videos for ${type} with id ${id}:`, error);
      set({ isLoading: false });
    }
  },

  // Fetch images
  fetchImages: async (type, id) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getMovieImages(id)
          : await tvService.getTvImages(id);
      set((state) => ({
        movies: { ...state.movies, images: response.data.data.posters },
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Failed to fetch images for ${type} with id ${id}:`, error);
      set({ isLoading: false });
    }
  },

  // Fetch recommendations
  fetchRecommendations: async (type, id) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getRecommendedMovies(id)
          : await tvService.getRecommendedTv(id);
      set((state) => ({
        movies: {
          ...state.movies,
          recommendations: response.data.data.results,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error(
        `Failed to fetch recommendations for ${type} with id ${id}:`,
        error
      );
      set({ isLoading: false });
    }
  },

  // Fetch reviews
  fetchReviews: async (type, id) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getMovieReviews(id)
          : await tvService.getTvReviews(id);
      set((state) => ({
        movies: {
          ...state.movies,
          reviews: response.data.data.results,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error(
        `Failed to fetch Reviews for ${type} with id ${id}:`,
        error
      );
      set({ isLoading: false });
    }
  },

  // Fetch similar
  fetchSimilar: async (type, id) => {
    set({ isLoading: true });
    try {
      const response =
        type === "movie"
          ? await movieService.getSimilarMovies(id)
          : await tvService.getSimilarTv(id);
      set((state) => ({
        movies: {
          ...state.movies,
          similar: response.data.data.results,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error(
        `Failed to fetch similar for ${type} with id ${id}:`,
        error
      );
      set({ isLoading: false });
    }
  },
}));
