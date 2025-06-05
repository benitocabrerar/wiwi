// Datos para la página de inicio

// Categorías destacadas
export const featuredCategories = [
  {
    id: '1',
    name: 'Laptops',
    description: 'Portátiles para trabajo y gaming',
    image: '/images/categories/laptops.jpg',
    slug: 'laptops',
    featured: true,
  },
  {
    id: '2',
    name: 'Smartphones',
    description: 'Los últimos modelos de teléfonos',
    image: '/images/categories/smartphones.jpg',
    slug: 'smartphones',
    featured: true,
  },
  {
    id: '3',
    name: 'Accesorios',
    description: 'Complementos para tus dispositivos',
    image: '/images/categories/accessories.jpg',
    slug: 'accesorios',
    featured: true,
  },
  {
    id: '4',
    name: 'Audio',
    description: 'Auriculares, altavoces y más',
    image: '/images/categories/audio.jpg',
    slug: 'audio',
    featured: true,
  },
];

// Productos destacados
export const featuredProducts = [
  {
    id: '1',
    name: 'Laptop Pro X',
    description: 'Potente laptop para profesionales',
    price: 1299.99,
    discount: 10,
    image: '/images/products/laptop-1.jpg',
    images: [
      '/images/products/laptop-1.jpg',
      '/images/products/laptop-1-2.jpg',
      '/images/products/laptop-1-3.jpg',
    ],
    rating: 4.8,
    reviews: 124,
    stock: 15,
    sku: 'LAP-PRO-X-001',
    slug: 'laptop-pro-x',
    categoryId: '1',
    featured: true,
    specifications: {
      processor: 'Intel Core i7-11800H',
      memory: '16GB DDR4',
      storage: '512GB SSD',
      display: '15.6" 4K UHD',
      graphics: 'NVIDIA RTX 3060',
      battery: '8 horas',
      weight: '1.8 kg',
    },
  },
  {
    id: '2',
    name: 'Smartphone Ultra',
    description: 'El smartphone más avanzado',
    price: 999.99,
    discount: 15,
    image: '/images/products/smartphone-1.jpg',
    images: [
      '/images/products/smartphone-1.jpg',
      '/images/products/smartphone-1-2.jpg',
      '/images/products/smartphone-1-3.jpg',
    ],
    rating: 4.9,
    reviews: 208,
    stock: 22,
    sku: 'SP-ULTRA-001',
    slug: 'smartphone-ultra',
    categoryId: '2',
    featured: true,
    specifications: {
      processor: 'Snapdragon 8 Gen 2',
      memory: '12GB RAM',
      storage: '256GB',
      display: '6.7" AMOLED 120Hz',
      camera: 'Triple 50MP + 12MP + 10MP',
      battery: '5000mAh',
      weight: '195g',
    },
  },
  {
    id: '3',
    name: 'Auriculares Pro',
    description: 'Auriculares con cancelación de ruido',
    price: 249.99,
    discount: 0,
    image: '/images/products/headphones-1.jpg',
    images: [
      '/images/products/headphones-1.jpg',
      '/images/products/headphones-1-2.jpg',
      '/images/products/headphones-1-3.jpg',
    ],
    rating: 4.7,
    reviews: 89,
    stock: 30,
    sku: 'AUD-PRO-001',
    slug: 'auriculares-pro',
    categoryId: '4',
    featured: true,
    specifications: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      battery: '30 horas',
      noiseCancellation: 'Activa',
      microphone: 'Integrado',
      weight: '250g',
    },
  },
  {
    id: '4',
    name: 'Tablet Air',
    description: 'Tablet ligera y potente',
    price: 499.99,
    discount: 5,
    image: '/images/products/tablet-1.jpg',
    images: [
      '/images/products/tablet-1.jpg',
      '/images/products/tablet-1-2.jpg',
      '/images/products/tablet-1-3.jpg',
    ],
    rating: 4.6,
    reviews: 67,
    stock: 18,
    sku: 'TAB-AIR-001',
    slug: 'tablet-air',
    categoryId: '1',
    featured: true,
    specifications: {
      processor: 'A14 Bionic',
      memory: '8GB RAM',
      storage: '128GB',
      display: '10.9" Retina',
      camera: '12MP',
      battery: '10 horas',
      weight: '460g',
    },
  },
];

// Testimonios de clientes
export const testimonials = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    role: 'Diseñador Gráfico',
    content:
      'Compré una laptop para mi trabajo de diseño y estoy impresionado con la calidad y el rendimiento. El proceso de compra fue muy sencillo y la entrega rápida.',
    avatar: '/images/testimonials/avatar-1.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'María González',
    role: 'Estudiante',
    content:
      'Como estudiante, necesitaba una tablet económica pero buena. Encontré exactamente lo que buscaba y a un precio increíble. ¡Muy satisfecha con mi compra!',
    avatar: '/images/testimonials/avatar-2.jpg',
    rating: 4,
  },
  {
    id: '3',
    name: 'Juan Pérez',
    role: 'Ingeniero de Software',
    content:
      'He comprado varios productos en esta tienda y siempre he quedado satisfecho. El servicio al cliente es excelente y los productos son de alta calidad.',
    avatar: '/images/testimonials/avatar-3.jpg',
    rating: 5,
  },
];

// Características de la tienda
export const storeFeatures = [
  {
    id: '1',
    title: 'Envío Gratis',
    description: 'En pedidos superiores a $50',
    icon: 'ShippingIcon',
  },
  {
    id: '2',
    title: 'Devoluciones Fáciles',
    description: '30 días para devoluciones',
    icon: 'ReturnIcon',
  },
  {
    id: '3',
    title: 'Soporte 24/7',
    description: 'Asistencia técnica disponible',
    icon: 'SupportIcon',
  },
  {
    id: '4',
    title: 'Pago Seguro',
    description: 'Transacciones 100% seguras',
    icon: 'SecureIcon',
  },
];

// Marcas destacadas
export const brands = [
  {
    id: '1',
    name: 'Apple',
    logo: '/images/brands/apple.svg',
  },
  {
    id: '2',
    name: 'Samsung',
    logo: '/images/brands/samsung.svg',
  },
  {
    id: '3',
    name: 'Sony',
    logo: '/images/brands/sony.svg',
  },
  {
    id: '4',
    name: 'Microsoft',
    logo: '/images/brands/microsoft.svg',
  },
  {
    id: '5',
    name: 'Dell',
    logo: '/images/brands/dell.svg',
  },
  {
    id: '6',
    name: 'HP',
    logo: '/images/brands/hp.svg',
  },
];
