import { z } from "zod";

// Zod validation schema for login
export const userLoginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(50),
});

// Zod validation schema for signup
export const userSignUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

// Type for login and signup input
export interface LoginInputState {
  username: string;
  password: string;
}

export interface SignupInputState {
  username: string;
  email: string;
  password: string;
}
