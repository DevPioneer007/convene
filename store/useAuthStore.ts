import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  email: string | null;
  username: string | null;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: Partial<User>) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set, _) => ({
      user: null,
      isLoggedIn: false,
      setUser: (partialUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : null,
        })),
      setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
    }),
    {
      name: "convene-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
