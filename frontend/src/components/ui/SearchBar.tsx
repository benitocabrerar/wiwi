import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useUI } from '@/context/UIContext';

const SearchBar: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { isSearchOpen, closeSearch } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Cargar búsquedas recientes desde localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Error parsing recent searches:', error);
        localStorage.removeItem('recentSearches');
      }
    }
  }, []);

  // Enfocar el input cuando se abre la búsqueda
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (term: string = searchTerm) => {
    if (!term.trim()) return;
    
    // Guardar en búsquedas recientes
    const updatedSearches = [
      term,
      ...recentSearches.filter(s => s !== term)
    ].slice(0, 5); // Mantener solo las 5 más recientes
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    
    // Navegar a la página de resultados
    router.push(`/busqueda?q=${encodeURIComponent(term)}`);
    closeSearch();
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm">
      <div className="relative mx-auto mt-16 max-w-2xl px-4">
        <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900">
          <div className="mb-4 flex items-center">
            <MagnifyingGlassIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('search.placeholder')}
              className="flex-1 border-none bg-transparent p-2 text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
            />
            <button
              onClick={closeSearch}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {recentSearches.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('search.recent_searches')}
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                >
                  {t('search.clear_all')}
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {recentSearches.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSearch(term)}
                      className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <MagnifyingGlassIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => handleSearch()}
              disabled={!searchTerm.trim()}
              className="w-full rounded-md bg-primary-600 py-2 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
            >
              {t('search.search_button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
