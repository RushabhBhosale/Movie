import axios from "axios";

export const tmdbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
});