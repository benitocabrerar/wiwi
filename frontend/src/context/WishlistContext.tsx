import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  sku: string;
  stock: number;
  discount?: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  itemsCount: number;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_COOKIE_NAME = 'techstore_wishlist';

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [itemsCount, setItemsCount] = useState(0);

  // Cargar lista de deseos desde cookies al iniciar
  useEffect(() => {
    const savedWishlist = Cookies.get(WISHLIST_COOKIE_NAME);
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setItems(parsedWishlist);
      } catch (error) {
        console.error('Error parsing wishlist from cookies:', error);
        Cookies.remove(WISHLIST_COOKIE_NAME);
      }
    }
  }, []);

  // Actualizar conteo de items cuando cambia la lista de deseos
  useEffect(() => {
    setItemsCount(items.length);

    // Guardar lista de deseos en cookies
    if (items.length > 0) {
      Cookies.set(WISHLIST_COOKIE_NAME, JSON.stringify(items), { expires: 30 });
    } else {
      Cookies.remove(WISHLIST_COOKIE_NAME);
    }
  }, [items]);

  const addItem = (item: WishlistItem) => {
    setItems((prevItems) => {
      // Verificar si el item ya existe en la lista de deseos
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems; // No hacer nada si ya existe
      }
      return [...prevItems, item]; // Añadir si no existe
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string): boolean => {
    return items.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
    Cookies.remove(WISHLIST_COOKIE_NAME);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemsCount,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
