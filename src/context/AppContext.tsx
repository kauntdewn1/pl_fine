import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, User } from '../types';
import { MESSAGES } from '../constants';
import { getLocalStorage, setLocalStorage } from '../utils';

// Estado inicial
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isAgeVerified: false,
  loading: false,
  error: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case 'SET_AGE_VERIFIED':
      return {
        ...state,
        isAgeVerified: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isAgeVerified: state.isAgeVerified,
      };
    default:
      return state;
  }
}

// Contexto
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Efeito para carregar estado inicial
  React.useEffect(() => {
    const userEmail = getLocalStorage<string>('userEmail');
    const ageVerified = getLocalStorage<boolean>('ageVerified');

    if (userEmail) {
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    }

    if (ageVerified) {
      dispatch({ type: 'SET_AGE_VERIFIED', payload: true });
    }
  }, []);

  // Funções de utilidade
  const login = async (email: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Aqui você implementaria a lógica de login
      const user: User = {
        id: '1',
        email,
        plano: 'vip',
        status: 'ativo',
      };

      setLocalStorage('userEmail', email);
      dispatch({ type: 'SET_USER', payload: user });
      return true;
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: MESSAGES.ERRORS.AUTHENTICATION 
      });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    setLocalStorage('userEmail', null);
    dispatch({ type: 'LOGOUT' });
  };

  const verifyAge = () => {
    setLocalStorage('ageVerified', true);
    dispatch({ type: 'SET_AGE_VERIFIED', payload: true });
  };

  return (
    <AppContext.Provider 
      value={{ 
        state, 
        dispatch,
        login,
        logout,
        verifyAge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
} 