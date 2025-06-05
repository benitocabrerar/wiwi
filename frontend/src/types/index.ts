// React
declare module 'react' {
  interface JSX {
    IntrinsicElements: any;
  }
}

// Modelos de datos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  productsCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Tipos para respuestas de la API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

// Tipos para filtros y ordenamiento
export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  availability?: 'in-stock' | 'out-of-stock';
  brands?: string[];
}

export interface SortOptions {
  field: 'price' | 'rating' | 'createdAt' | 'name';
  order: 'asc' | 'desc';
}

// Tipos para formularios
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
