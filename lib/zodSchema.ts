import { z } from "zod";

export const movieSchema = z.object({
  id: z.string(),
  title: z.string(),
  release_date: z.string(),
  vote_average: z.number(),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
});
