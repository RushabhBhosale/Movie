import { create } from "zustand";
import { authService } from "../services/auth.service";
import { clearTokenFromCookies } from "@/utils/cookies";

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void; // Add setToken to handle token directly
}

export const useAuthStore = create<AuthState>((set) => ({
  token: "", // Initialize token from cookies
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
    clearTokenFromCookies();
  },
  setUser: (user) => set({ user }), // Setting user manually
  setToken: (token) => set({ token }), // Add a setter for token to handle token updates
}));
