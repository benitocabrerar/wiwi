import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();
  
  // Verificar sesión al montar
  useEffect(() => {
    checkAuth();
  }, []);
  
  // Verificar si hay una sesión activa
  const checkAuth = async () => {
    try {
      const saved = localStorage.getItem('auth');
      if (saved) {
        const { user } = JSON.parse(saved);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        setState({
          ...initialState,
          isLoading: false
        });
      }
    } catch (error) {
      setState({
        ...initialState,
        isLoading: false,
        error: 'Error al verificar sesión'
      });
    }
  };
  
  // Iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Simular petición al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular respuesta exitosa
      if (email === 'admin@example.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          avatar: '/images/avatars/admin.jpg'
        };
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        localStorage.setItem('auth', JSON.stringify({ user }));
        router.push('/dashboard');
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al iniciar sesión'
      }));
      throw error;
    }
  };
  
  // Cerrar sesión
  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    localStorage.removeItem('auth');
    router.push('/login');
  };
  
  // Registrar nuevo usuario
  const register = async (userData: RegisterData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Simular petición al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular respuesta exitosa
      const user: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'user'
      };
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      localStorage.setItem('auth', JSON.stringify({ user }));
      router.push('/dashboard');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al registrar usuario'
      }));
      throw error;
    }
  };
  
  // Actualizar perfil
  const updateProfile = async (data: Partial<User>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Simular petición al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar datos localmente
      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...data } : null,
        isLoading: false
      }));
      
      // Actualizar en localStorage
      const saved = localStorage.getItem('auth');
      if (saved) {
        const auth = JSON.parse(saved);
        auth.user = { ...auth.user, ...data };
        localStorage.setItem('auth', JSON.stringify(auth));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al actualizar perfil'
      }));
      throw error;
    }
  };
  
  const value = {
    ...state,
    login,
    logout,
    register,
    updateProfile
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
