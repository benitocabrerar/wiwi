import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { 
  XMarkIcon,
  FunnelIcon,
  PlusIcon,
  MinusIcon 
} from '@heroicons/react/24/outline';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Datos de ejemplo para filtros
const filters = {
  price: {
    ranges: [
      { id: 'under-50', label: 'Menos de $50', min: 0, max: 50 },
      { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
      { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
      { id: 'over-200', label: 'Más de $200', min: 200, max: null }
    ]
  },
  categories: [
    { id: 'electronics', name: 'Electrónica', count: 120 },
    { id: 'clothing', name: 'Ropa', count: 85 },
    { id: 'home', name: 'Hogar', count: 74 },
    { id: 'sports', name: 'Deportes', count: 56 },
    { id: 'beauty', name: 'Belleza', count: 42 },
    { id: 'books', name: 'Libros', count: 38 }
  ],
  brands: [
    { id: 'apple', name: 'Apple', count: 45 },
    { id: 'samsung', name: 'Samsung', count: 38 },
    { id: 'nike', name: 'Nike', count: 32 },
    { id: 'adidas', name: 'Adidas', count: 28 },
    { id: 'sony', name: 'Sony', count: 25 }
  ],
  ratings: [
    { value: 4, label: '4 estrellas o más' },
    { value: 3, label: '3 estrellas o más' },
    { value: 2, label: '2 estrellas o más' },
    { value: 1, label: '1 estrella o más' }
  ],
  availability: [
    { id: 'in-stock', name: 'En stock' },
    { id: 'out-of-stock', name: 'Agotado' }
  ]
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'price']);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    price: [],
    categories: [],
    brands: [],
    ratings: [],
    availability: []
  });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  // Alternar sección expandida/colapsada
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  // Manejar cambio en checkbox
  const handleCheckboxChange = (section: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter(v => v !== value)
        : [...prev[section], value]
    }));
  };
  
  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSelectedFilters({
      price: [],
      categories: [],
      brands: [],
      ratings: [],
      availability: []
    });
    setPriceRange({ min: '', max: '' });
  };
  
  // Aplicar filtros
  const applyFilters = () => {
    // Aquí iría la lógica para aplicar los filtros
    // Por ahora solo cerramos el sidebar
    onClose();
  };
  
  return (
    <div className={`fixed inset-0 z-40 lg:relative lg:z-0 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Overlay para móvil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
        style={{ display: isOpen ? 'block' : 'none' }}
      />
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 h-full w-80 max-w-full bg-white dark:bg-secondary-900 shadow-xl overflow-y-auto lg:sticky lg:top-4 lg:transform-none lg:shadow-none ${
          isOpen ? '' : 'pointer-events-none lg:pointer-events-auto'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            {t('filters.title')}
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-full text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
            aria-label={t('common.close')}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Contenido */}
        <div className="p-4">
          {/* Rango de precio */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                {t('filters.price')}
              </span>
              {expandedSections.includes('price') ? (
                <MinusIcon className="h-4 w-4 text-secondary-500" />
              ) : (
                <PlusIcon className="h-4 w-4 text-secondary-500" />
              )}
            </button>
            
            {expandedSections.includes('price') && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-secondary-500 dark:text-secondary-400">
                      {t('filters.min_price')}
                    </label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="mt-1 block w-full rounded-md border-secondary-300 dark:border-secondary-700 dark:bg-secondary-800 text-secondary-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-secondary-500 dark:text-secondary-400">
                      {t('filters.max_price')}
                    </label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="mt-1 block w-full rounded-md border-secondary-300 dark:border-secondary-700 dark:bg-secondary-800 text-secondary-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {filters.price.ranges.map((range) => (
                    <label key={range.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.price.includes(range.id)}
                        onChange={() => handleCheckboxChange('price', range.id)}
                        className="rounded border-secondary-300 dark:border-secondary-700 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Categorías */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                {t('filters.categories')}
              </span>
              {expandedSections.includes('categories') ? (
                <MinusIcon className="h-4 w-4 text-secondary-500" />
              ) : (
                <PlusIcon className="h-4 w-4 text-secondary-500" />
              )}
            </button>
            
            {expandedSections.includes('categories') && (
              <div className="space-y-2">
                {filters.categories.map((category) => (
                  <label key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.categories.includes(category.id)}
                        onChange={() => handleCheckboxChange('categories', category.id)}
                        className="rounded border-secondary-300 dark:border-secondary-700 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-secondary-500 dark:text-secondary-400">
                      {category.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Marcas */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('brands')}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                {t('filters.brands')}
              </span>
              {expandedSections.includes('brands') ? (
                <MinusIcon className="h-4 w-4 text-secondary-500" />
              ) : (
                <PlusIcon className="h-4 w-4 text-secondary-500" />
              )}
            </button>
            
            {expandedSections.includes('brands') && (
              <div className="space-y-2">
                {filters.brands.map((brand) => (
                  <label key={brand.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.brands.includes(brand.id)}
                        onChange={() => handleCheckboxChange('brands', brand.id)}
                        className="rounded border-secondary-300 dark:border-secondary-700 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        {brand.name}
                      </span>
                    </div>
                    <span className="text-xs text-secondary-500 dark:text-secondary-400">
                      {brand.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Valoraciones */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('ratings')}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                {t('filters.ratings')}
              </span>
              {expandedSections.includes('ratings') ? (
                <MinusIcon className="h-4 w-4 text-secondary-500" />
              ) : (
                <PlusIcon className="h-4 w-4 text-secondary-500" />
              )}
            </button>
            
            {expandedSections.includes('ratings') && (
              <div className="space-y-2">
                {filters.ratings.map((rating) => (
                  <label key={rating.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.ratings.includes(rating.value.toString())}
                      onChange={() => handleCheckboxChange('ratings', rating.value.toString())}
                      className="rounded border-secondary-300 dark:border-secondary-700 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                      {rating.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Disponibilidad */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                {t('filters.availability')}
              </span>
              {expandedSections.includes('availability') ? (
                <MinusIcon className="h-4 w-4 text-secondary-500" />
              ) : (
                <PlusIcon className="h-4 w-4 text-secondary-500" />
              )}
            </button>
            
            {expandedSections.includes('availability') && (
              <div className="space-y-2">
                {filters.availability.map((option) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.availability.includes(option.id)}
                      onChange={() => handleCheckboxChange('availability', option.id)}
                      className="rounded border-secondary-300 dark:border-secondary-700 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                      {option.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Footer con botones */}
        <div className="sticky bottom-0 bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700 p-4 flex items-center justify-between">
          <button
            onClick={clearAllFilters}
            className="text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white transition-colors"
          >
            {t('filters.clear_all')}
          </button>
          
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            {t('filters.apply')}
          </button>
        </div>
      </motion.aside>
    </div>
  );
};

export default FilterSidebar;
