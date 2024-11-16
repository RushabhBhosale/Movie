import axiosClient from "@/utils/axiosClient";
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const authService = {
  login: (data: LoginInput) => axiosClient.post("login", data),
  register: (data: RegisterInput) => axiosClient.post("register", data),
  getUser: () => axiosClient.get("/api/auth/me"),
};
