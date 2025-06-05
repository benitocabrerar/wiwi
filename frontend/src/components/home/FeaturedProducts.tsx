import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/products/ProductCard';

// Datos de ejemplo para productos destacados
const featuredProducts = [
  {
    id: '1',
    name: 'Smartphone XYZ Pro',
    slug: 'smartphone-xyz-pro',
    price: 799,
    originalPrice: 899,
    image: '/images/products/smartphone.jpg',
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    stock: 15
  },
  {
    id: '2',
    name: 'Auriculares Inalámbricos Premium',
    slug: 'auriculares-inalambricos-premium',
    price: 149,
    image: '/images/products/headphones.jpg',
    rating: 4.8,
    reviewCount: 95,
    isFeatured: true,
    stock: 8
  },
  {
    id: '3',
    name: 'Smartwatch Serie 5',
    slug: 'smartwatch-serie-5',
    price: 299,
    originalPrice: 349,
    image: '/images/products/smartwatch.jpg',
    rating: 4.2,
    reviewCount: 64,
    isFeatured: true,
    isOnSale: true,
    stock: 12
  },
  {
    id: '4',
    name: 'Laptop Ultradelgada 15"',
    slug: 'laptop-ultradelgada-15',
    price: 1299,
    image: '/images/products/laptop.jpg',
    rating: 4.7,
    reviewCount: 42,
    isNew: true,
    isFeatured: true,
    stock: 5
  },
  {
    id: '5',
    name: 'Cámara DSLR Profesional',
    slug: 'camara-dslr-profesional',
    price: 899,
    originalPrice: 1099,
    image: '/images/products/camera.jpg',
    rating: 4.6,
    reviewCount: 37,
    isFeatured: true,
    isOnSale: true,
    stock: 3
  },
  {
    id: '6',
    name: 'Altavoz Bluetooth Portátil',
    slug: 'altavoz-bluetooth-portatil',
    price: 79,
    image: '/images/products/speaker.jpg',
    rating: 4.3,
    reviewCount: 56,
    isFeatured: true,
    stock: 20
  },
  {
    id: '7',
    name: 'Tablet 10" Ultra HD',
    slug: 'tablet-10-ultra-hd',
    price: 349,
    originalPrice: 399,
    image: '/images/products/tablet.jpg',
    rating: 4.4,
    reviewCount: 29,
    isFeatured: true,
    isOnSale: true,
    stock: 7
  },
  {
    id: '8',
    name: 'Consola de Videojuegos Pro',
    slug: 'consola-videojuegos-pro',
    price: 499,
    image: '/images/products/console.jpg',
    rating: 4.9,
    reviewCount: 84,
    isNew: true,
    isFeatured: true,
    stock: 2
  }
];

const FeaturedProducts: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentPage, setCurrentPage] = useState(0);
  
  // Configuración para diferentes tamaños de pantalla
  const itemsPerPage = {
    sm: 2, // Móvil: 2 productos por página
    md: 3, // Tablet: 3 productos por página
    lg: 4  // Desktop: 4 productos por página
  };
  
  // Número total de páginas (basado en desktop para simplicidad)
  const totalPages = Math.ceil(featuredProducts.length / itemsPerPage.lg);
  
  // Navegar a la página anterior
  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };
  
  // Navegar a la página siguiente
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };
  
  return (
    <section className="py-12 bg-secondary-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white">
              {t('home.featured_products')}
            </h2>
            <p className="mt-2 text-secondary-600 dark:text-secondary-400">
              {t('home.featured_products_description')}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevPage}
              className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 shadow-sm hover:shadow transition-all"
              aria-label={t('common.previous')}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextPage}
              className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 shadow-sm hover:shadow transition-all"
              aria-label={t('common.next')}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <Link
              href="/products"
              className="hidden md:flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              {t('common.view_all')}
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        
        {/* Productos destacados - Carrusel responsivo */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Productos para móvil (2 por página) */}
            <div className="col-span-2 md:hidden">
              {featuredProducts
                .slice(
                  currentPage * itemsPerPage.sm,
                  currentPage * itemsPerPage.sm + itemsPerPage.sm
                )
                .map((product) => (
                  <div key={product.id} className="mb-4 last:mb-0">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            
            {/* Productos para tablet (3 por página) */}
            <div className="hidden md:grid md:grid-cols-3 md:col-span-3 lg:hidden gap-6">
              {featuredProducts
                .slice(
                  currentPage * itemsPerPage.md,
                  currentPage * itemsPerPage.md + itemsPerPage.md
                )
                .map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            
            {/* Productos para desktop (4 por página) */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:col-span-4 gap-6">
              {featuredProducts
                .slice(
                  currentPage * itemsPerPage.lg,
                  currentPage * itemsPerPage.lg + itemsPerPage.lg
                )
                .map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Indicadores de página */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentPage === index
                  ? 'bg-primary-600 dark:bg-primary-500'
                  : 'bg-secondary-300 dark:bg-secondary-700 hover:bg-secondary-400 dark:hover:bg-secondary-600'
              }`}
              aria-label={`${t('common.page')} ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Botón "Ver todos" para móvil */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            {t('common.view_all')}
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
