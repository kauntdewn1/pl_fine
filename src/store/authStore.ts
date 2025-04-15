import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  ageVerified: boolean;
  setAuthenticated: (value: boolean) => void;
  setAgeVerified: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  ageVerified: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setAgeVerified: (value) => set({ ageVerified: value }),
}));