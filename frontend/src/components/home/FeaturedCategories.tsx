import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Datos de ejemplo para categorías destacadas
const categories = [
  {
    id: 'electronics',
    name: 'Electrónica',
    description: 'Smartphones, laptops, tablets y más',
    image: '/images/categories/electronics.jpg',
    itemCount: 120,
    color: 'bg-blue-500'
  },
  {
    id: 'clothing',
    name: 'Ropa',
    description: 'Moda para hombres, mujeres y niños',
    image: '/images/categories/clothing.jpg',
    itemCount: 85,
    color: 'bg-pink-500'
  },
  {
    id: 'home',
    name: 'Hogar',
    description: 'Muebles, decoración y electrodomésticos',
    image: '/images/categories/home.jpg',
    itemCount: 74,
    color: 'bg-amber-500'
  },
  {
    id: 'sports',
    name: 'Deportes',
    description: 'Equipamiento, ropa y accesorios deportivos',
    image: '/images/categories/sports.jpg',
    itemCount: 56,
    color: 'bg-green-500'
  },
  {
    id: 'beauty',
    name: 'Belleza',
    description: 'Cuidado personal, maquillaje y fragancias',
    image: '/images/categories/beauty.jpg',
    itemCount: 42,
    color: 'bg-purple-500'
  },
  {
    id: 'books',
    name: 'Libros',
    description: 'Libros físicos, digitales y audiolibros',
    image: '/images/categories/books.jpg',
    itemCount: 38,
    color: 'bg-red-500'
  }
];

const FeaturedCategories: React.FC = () => {
  const { t } = useTranslation('common');
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white">
            {t('home.featured_categories')}
          </h2>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            {t('home.featured_categories_description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Imagen de fondo */}
              <div className="relative h-64 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className={`w-12 h-12 rounded-full ${category.color} bg-opacity-90 flex items-center justify-center mb-4`}>
                  <span className="text-white text-xl font-bold">
                    {category.name.charAt(0)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                
                <p className="text-white/80 text-sm mb-3">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/90 text-sm">
                    {t('common.items', { count: category.itemCount })}
                  </span>
                  
                  <Link
                    href={`/categories/${category.id}`}
                    className="flex items-center text-white hover:text-primary-300 transition-colors"
                  >
                    <span className="mr-1 text-sm font-medium">
                      {t('common.explore')}
                    </span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Ver todas las categorías */}
        <div className="mt-10 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm hover:shadow"
          >
            {t('home.view_all_categories')}
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
