import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services/auth.service";

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
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,

      login: async (data) => {
        set({ isLoading: true });
        try {
          const resp = await authService.login(data);
          set({
            token: resp.data.data.token,
            user: resp.data.data.user,
            isLoading: false,
          });
        } catch (error) {
          console.error("Login failed:", error);
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ token: null, user: null, isLoading: false });
      },

      setUser: (user) => set({ user, isLoading: false }),

      setToken: (token) => set({ token, isLoading: false }),

      checkAuth: async () => {
        set({ isLoading: true });
        const { token } = get();
        if (!token) {
          set({ token: null, user: null, isLoading: false });
        } else {
          try {
            // Perform additional checks or fetch user data
            // ...
            set({ isLoading: false });
          } catch (error) {
            console.error("Failed to check auth:", error);
            set({ token: null, user: null, isLoading: false });
          }
        }
      },
    }),
    {
      name: "auth-data", // Key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
