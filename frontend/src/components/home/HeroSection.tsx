import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const HeroSection: React.FC = () => {
  const { t } = useTranslation('common');
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Contenido */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('hero.title_part1')} <span className="text-yellow-300">{t('hero.title_highlight')}</span> {t('hero.title_part2')}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-white text-primary-600 hover:bg-primary-50 rounded-lg font-medium flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  {t('hero.cta_primary')}
                </Link>
                
                <Link
                  href="/categories"
                  className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  {t('hero.cta_secondary')}
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Link>
              </div>
              
              {/* Características destacadas */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('hero.feature1_title')}</h3>
                    <p className="text-sm text-white/70">{t('hero.feature1_description')}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('hero.feature2_title')}</h3>
                    <p className="text-sm text-white/70">{t('hero.feature2_description')}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('hero.feature3_title')}</h3>
                    <p className="text-sm text-white/70">{t('hero.feature3_description')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Imagen */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                  src="/images/hero/hero-image.jpg"
                  alt={t('hero.image_alt')}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
                
                {/* Etiqueta de oferta */}
                <div className="absolute -top-5 -right-5 bg-yellow-500 text-primary-900 font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12">
                  {t('hero.discount_label')}
                </div>
              </div>
              
              {/* Tarjeta flotante de producto */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-secondary-800 p-4 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src="/images/products/featured-product.jpg"
                      alt={t('hero.featured_product_alt')}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-secondary-900 dark:text-white font-medium">{t('hero.featured_product_name')}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">${t('hero.featured_product_price')}</span>
                      <span className="ml-2 text-sm text-secondary-500 dark:text-secondary-400 line-through">${t('hero.featured_product_old_price')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Onda decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            className="dark:fill-secondary-900"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
