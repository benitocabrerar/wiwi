import React, { createContext, useContext, useState, useEffect } from 'react';

interface UIContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  isFilterSidebarOpen: boolean;
  openFilterSidebar: () => void;
  closeFilterSidebar: () => void;
}

interface UIProviderProps {
  children: React.ReactNode;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  // Estado del tema oscuro
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar preferencia guardada
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // Verificar preferencia del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  // Estado del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estado del modal de búsqueda
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  // Estado del sidebar de filtros
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  
  // Efecto para aplicar la clase dark al elemento html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Guardar preferencia
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  
  // Alternar modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Funciones del menú móvil
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  // Funciones del modal de búsqueda
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);
  
  // Funciones del sidebar de filtros
  const openFilterSidebar = () => setIsFilterSidebarOpen(true);
  const closeFilterSidebar = () => setIsFilterSidebarOpen(false);
  
  const value = {
    isDarkMode,
    toggleDarkMode,
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    isSearchModalOpen,
    openSearchModal,
    closeSearchModal,
    isFilterSidebarOpen,
    openFilterSidebar,
    closeFilterSidebar
  };
  
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
