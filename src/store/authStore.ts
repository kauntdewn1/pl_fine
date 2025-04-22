import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  ageVerified: boolean;
  setAuthenticated: (value: boolean) => void;
  setAgeVerified: (value: boolean) => void;
}

// Inicializar o estado com o valor do localStorage
const getInitialAgeVerified = () => {
  const stored = localStorage.getItem('ageVerified');
  return stored ? JSON.parse(stored) : false;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  ageVerified: getInitialAgeVerified(),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setAgeVerified: (value) => {
    localStorage.setItem('ageVerified', JSON.stringify(value));
    set({ ageVerified: value });
  },
}));