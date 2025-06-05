import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon, 
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  HeartIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import MobileMenu from './MobileMenu';
import SearchModal from '@/components/ui/SearchModal';

// Datos de ejemplo para categorías
const categories = [
  { id: 'electronics', name: 'Electrónica', href: '/categories/electronics' },
  { id: 'clothing', name: 'Ropa', href: '/categories/clothing' },
  { id: 'home', name: 'Hogar', href: '/categories/home' },
  { id: 'sports', name: 'Deportes', href: '/categories/sports' },
  { id: 'beauty', name: 'Belleza', href: '/categories/beauty' },
  { id: 'books', name: 'Libros', href: '/categories/books' }
];

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, openSearchModal, closeSearchModal, isSearchModalOpen, openMobileMenu } = useUI();
  const { cartItems, totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Cerrar dropdowns al cambiar de ruta
  useEffect(() => {
    const handleRouteChange = () => {
      setShowUserDropdown(false);
      setShowCategoryDropdown(false);
      setShowLanguageDropdown(false);
    };
    
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);
  
  // Manejar cambio de idioma
  const handleLanguageChange = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setShowLanguageDropdown(false);
  };
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-8">
              <Image
                src={isDarkMode ? "/images/logo-light.svg" : "/images/logo-dark.svg"}
                alt="TiendaOnline"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Navegación principal - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                router.pathname === '/' 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'
              }`}
            >
              {t('nav.home')}
            </Link>
            
            {/* Dropdown de categorías */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  router.pathname.startsWith('/categories') 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'
                }`}
              >
                {t('nav.categories')}
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {showCategoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-secondary-800 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white transition-colors"
                          role="menuitem"
                          onClick={() => setShowCategoryDropdown(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                      <div className="border-t border-secondary-200 dark:border-secondary-700 my-1"></div>
                      <Link
                        href="/categories"
                        className="block px-4 py-2 text-sm text-primary-600 hover:bg-secondary-100 dark:text-primary-400 dark:hover:bg-secondary-700 transition-colors font-medium"
                        role="menuitem"
                        onClick={() => setShowCategoryDropdown(false)}
                      >
                        {t('nav.all_categories')}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link 
              href="/products" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                router.pathname.startsWith('/products') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'
              }`}
            >
              {t('nav.products')}
            </Link>
            
            <Link 
              href="/deals" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                router.pathname.startsWith('/deals') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'
              }`}
            >
              {t('nav.deals')}
            </Link>
            
            <Link 
              href="/about" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                router.pathname.startsWith('/about') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'
              }`}
            >
              {t('nav.about')}
            </Link>
            
            <Link 
              href="/contact" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                router.pathname.startsWith('/contact') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>
          
          {/* Acciones */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Selector de idioma */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="p-2 rounded-full text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
                aria-label={t('nav.language')}
              >
                <GlobeAltIcon className="h-5 w-5" />
              </button>
              
              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-secondary-800 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        onClick={() => handleLanguageChange('es')}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          router.locale === 'es'
                            ? 'bg-secondary-100 text-primary-600 dark:bg-secondary-700 dark:text-primary-400 font-medium'
                            : 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white'
                        }`}
                        role="menuitem"
                      >
                        Español
                      </button>
                      <button
                        onClick={() => handleLanguageChange('en')}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          router.locale === 'en'
                            ? 'bg-secondary-100 text-primary-600 dark:bg-secondary-700 dark:text-primary-400 font-medium'
                            : 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white'
                        }`}
                        role="menuitem"
                      >
                        English
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Botón de búsqueda */}
            <button
              onClick={openSearchModal}
              className="p-2 rounded-full text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
              aria-label={t('nav.search')}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            
            {/* Botón de favoritos */}
            <Link
              href="/favorites"
              className="p-2 rounded-full text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
              aria-label={t('nav.favorites')}
            >
              <HeartIcon className="h-5 w-5" />
            </Link>
            
            {/* Botón de carrito */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
              aria-label={t('nav.cart')}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            
            {/* Botón de usuario / Dropdown de cuenta */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="p-2 rounded-full text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
                aria-label={t('nav.account')}
              >
                {isAuthenticated && user?.avatar ? (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <UserIcon className="h-5 w-5" />
                )}
              </button>
              
              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-secondary-800 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-secondary-200 dark:border-secondary-700">
                            <p className="text-sm font-medium text-secondary-900 dark:text-white">{user?.name}</p>
                            <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">{user?.email}</p>
                          </div>
                          <Link
                            href="/account"
                            className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white transition-colors"
                            role="menuitem"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            {t('nav.my_account')}
                          </Link>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white transition-colors"
                            role="menuitem"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            {t('nav.my_orders')}
                          </Link>
                          {user?.role === 'admin' && (
                            <Link
                              href="/admin"
                              className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white transition-colors"
                              role="menuitem"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              {t('nav.admin_panel')}
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              logout();
                              setShowUserDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-secondary-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-secondary-700 dark:hover:text-red-300 transition-colors"
                            role="menuitem"
                          >
                            {t('nav.logout')}
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white transition-colors"
                            role="menuitem"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            {t('nav.login')}
                          </Link>
                          <Link
                            href="/register"
                            className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white transition-colors"
                            role="menuitem"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            {t('nav.register')}
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Botón de tema */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
              aria-label={isDarkMode ? t('nav.light_mode') : t('nav.dark_mode')}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            
            {/* Botón de menú móvil */}
            <button
              onClick={openMobileMenu}
              className="md:hidden p-2 rounded-full text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors"
              aria-label={t('nav.menu')}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de búsqueda */}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </header>
  );
};

export default Header;
