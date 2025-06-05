import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Datos de ejemplo para resultados de búsqueda
const exampleResults = {
  categories: [
    { id: 'electronics', name: 'Electrónica', count: 120 },
    { id: 'clothing', name: 'Ropa', count: 85 },
    { id: 'home', name: 'Hogar', count: 74 }
  ],
  products: [
    {
      id: '1',
      name: 'Smartphone XYZ Pro',
      price: 799,
      image: '/images/products/smartphone.jpg',
      category: 'Electrónica'
    },
    {
      id: '2',
      name: 'Laptop Ultradelgada 15"',
      price: 1299,
      image: '/images/products/laptop.jpg',
      category: 'Electrónica'
    },
    {
      id: '3',
      name: 'Auriculares Inalámbricos Premium',
      price: 149,
      image: '/images/products/headphones.jpg',
      category: 'Electrónica'
    }
  ]
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Escuchar la tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Manejar cambios en el término de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= 2) {
      handleSearch(value);
    } else {
      setShowResults(false);
    }
  };
  
  // Simular búsqueda
  const handleSearch = async (term: string) => {
    setIsLoading(true);
    setShowResults(false);
    
    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsLoading(false);
    setShowResults(true);
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      // Guardar en búsquedas recientes
      setRecentSearches(prev => {
        const updated = [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        return updated;
      });
      
      handleSearch(searchTerm);
    }
  };
  
  // Cargar búsquedas recientes al montar
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-secondary-900 shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="container mx-auto px-4 py-4">
                {/* Formulario de búsqueda */}
                <form onSubmit={handleSubmit} className="relative mb-6">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder={t('search.placeholder')}
                    className="w-full h-12 pl-12 pr-4 bg-secondary-100 dark:bg-secondary-800 rounded-lg text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                  <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-secondary-500" />
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-3.5 p-0.5 rounded-full text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                    aria-label={t('search.close')}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </form>
                
                {/* Contenido del modal */}
                <div>
                  {isLoading ? (
                    // Estado de carga
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent" />
                    </div>
                  ) : showResults ? (
                    // Resultados de búsqueda
                    <div className="space-y-8">
                      {/* Categorías */}
                      <div>
                        <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                          {t('search.categories')}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {exampleResults.categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/categories/${category.id}`}
                              className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                              onClick={onClose}
                            >
                              <span className="text-secondary-900 dark:text-white font-medium">
                                {category.name}
                              </span>
                              <span className="text-sm text-secondary-500 dark:text-secondary-400">
                                {category.count}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      {/* Productos */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white">
                            {t('search.products')}
                          </h3>
                          <Link
                            href={`/search?q=${encodeURIComponent(searchTerm)}`}
                            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center"
                            onClick={onClose}
                          >
                            {t('search.view_all')}
                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {exampleResults.products.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.id}`}
                              className="flex items-center p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                              onClick={onClose}
                            >
                              <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <h4 className="text-sm font-medium text-secondary-900 dark:text-white">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                                  {product.category}
                                </p>
                                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                  ${product.price}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Búsquedas recientes
                    recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                          {t('search.recent_searches')}
                        </h3>
                        <div className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchTerm(search);
                                handleSearch(search);
                              }}
                              className="flex items-center w-full p-2 text-left rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-700 dark:text-secondary-300"
                            >
                              <MagnifyingGlassIcon className="h-5 w-5 mr-3 text-secondary-400" />
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
