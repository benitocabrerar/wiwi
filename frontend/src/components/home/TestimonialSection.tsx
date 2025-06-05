import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Datos de ejemplo para testimonios
const testimonials = [
  {
    id: '1',
    name: 'María García',
    role: 'Cliente Frecuente',
    avatar: '/images/testimonials/avatar1.jpg',
    content: 'Increíble experiencia de compra. Los productos llegaron antes de lo esperado y la calidad es excepcional. Definitivamente volveré a comprar aquí.',
    rating: 5
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Cliente Nuevo',
    avatar: '/images/testimonials/avatar2.jpg',
    content: 'Primera vez comprando en esta tienda y quedé gratamente sorprendido. El proceso de compra fue sencillo y el seguimiento del pedido muy transparente.',
    rating: 4
  },
  {
    id: '3',
    name: 'Ana Martínez',
    role: 'Cliente VIP',
    avatar: '/images/testimonials/avatar3.jpg',
    content: 'Llevo años comprando en esta tienda y nunca me han decepcionado. El servicio al cliente es excepcional y siempre resuelven cualquier problema rápidamente.',
    rating: 5
  },
  {
    id: '4',
    name: 'Javier López',
    role: 'Cliente Corporativo',
    avatar: '/images/testimonials/avatar4.jpg',
    content: 'Realizamos compras frecuentes para nuestra empresa y siempre recibimos un trato preferencial. Los precios al por mayor son muy competitivos.',
    rating: 5
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    role: 'Cliente Frecuente',
    avatar: '/images/testimonials/avatar5.jpg',
    content: 'Me encanta la variedad de productos y las promociones exclusivas. La aplicación móvil hace que comprar sea aún más fácil y rápido.',
    rating: 4
  }
];

const TestimonialSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Cambiar al testimonio anterior
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  // Cambiar al testimonio siguiente
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);
  
  // Pausar autoplay al interactuar
  const handleInteraction = () => {
    setAutoplay(false);
    
    // Reanudar después de 10 segundos de inactividad
    const timeout = setTimeout(() => {
      setAutoplay(true);
    }, 10000);
    
    return () => clearTimeout(timeout);
  };
  
  return (
    <section className="py-16 bg-secondary-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white">
            {t('home.testimonials_title')}
          </h2>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            {t('home.testimonials_description')}
          </p>
        </div>
        
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={handleInteraction}
          onTouchStart={handleInteraction}
        >
          {/* Controles */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
            <button
              onClick={() => {
                prevTestimonial();
                handleInteraction();
              }}
              className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 shadow-sm hover:shadow transition-all"
              aria-label={t('common.previous')}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
            <button
              onClick={() => {
                nextTestimonial();
                handleInteraction();
              }}
              className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 shadow-sm hover:shadow transition-all"
              aria-label={t('common.next')}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Carrusel de testimonios */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-primary-100 dark:border-primary-900">
                    <Image
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Estrellas */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[currentIndex].rating
                            ? 'text-yellow-400'
                            : 'text-secondary-300 dark:text-secondary-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Contenido */}
                  <blockquote className="text-center mb-6">
                    <p className="text-lg text-secondary-700 dark:text-secondary-300 italic">
                      "{testimonials[currentIndex].content}"
                    </p>
                  </blockquote>
                  
                  {/* Información del cliente */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  handleInteraction();
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === index
                    ? 'bg-primary-600 dark:bg-primary-500'
                    : 'bg-secondary-300 dark:bg-secondary-700 hover:bg-secondary-400 dark:hover:bg-secondary-600'
                }`}
                aria-label={`${t('common.testimonial')} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
