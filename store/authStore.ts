import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services/auth.service";
import axiosClient from "@/utils/axiosClient";

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null, // Initialize token as null
      user: null,
      isLoading: false,
      login: async (data) => {
        set({ isLoading: true });
        try {
          const resp = await authService.login(data);
          set({ token: resp.data.body.token, user: resp.data.body.user });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ token: null, user: null });
        localStorage.removeItem("auth-data");
      },
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      checkAuth: async () => {
        const storedData = localStorage.getItem("auth-data");
        if (storedData) {
          try {
            const { token } = JSON.parse(storedData);
            if (token) {
              set({ token });
              const resp = await axiosClient.get("/user", token);

              if (resp.data.success) {
                let userData = await resp.data.json();
                set({ user: userData });
              } else {
                throw new Error("Invalid token");
              }
            }
          } catch (error) {
            console.error("Authentication check failed:", error);
            set({ token: null, user: null }); // Clear invalid data
          }
        }
      },
    }),
    {
      name: "auth-data", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
