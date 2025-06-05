import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Estado del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Recuperar carrito guardado
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [];
  });
  
  // Calcular totales
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Agregar item al carrito
  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Si el item ya existe, incrementar cantidad
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Si es un item nuevo, agregarlo con cantidad 1
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };
  
  // Remover item del carrito
  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Actualizar cantidad de un item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };
  
  const value = {
    cartItems,
    totalItems,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
