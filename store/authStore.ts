import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  isAuthenticated: boolean;
}

const TOKEN_KEY = "MOVIE";

// Creating the Zustand store with persistence middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },
      removeToken: () => {
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: TOKEN_KEY, // the name for localStorage key
      storage: createJSONStorage(() => localStorage), // using localStorage
    }
  )
);
