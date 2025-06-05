import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  ChevronRightIcon,
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';

// Datos de ejemplo para categorías
const categories = [
  { id: 'electronics', name: 'Electrónica', href: '/categories/electronics' },
  { id: 'clothing', name: 'Ropa', href: '/categories/clothing' },
  { id: 'home', name: 'Hogar', href: '/categories/home' },
  { id: 'sports', name: 'Deportes', href: '/categories/sports' },
  { id: 'beauty', name: 'Belleza', href: '/categories/beauty' },
  { id: 'books', name: 'Libros', href: '/categories/books' }
];

const MobileMenu: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { isMobileMenuOpen, closeMobileMenu } = useUI();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    const handleRouteChange = () => {
      closeMobileMenu();
    };
    
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, closeMobileMenu]);
  
  // Cerrar el menú al presionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);
  
  // Prevenir el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };
  
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeMobileMenu}
          />
          
          {/* Panel de menú */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-white dark:bg-secondary-900 shadow-xl z-50 overflow-y-auto"
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                {t('mobile_menu.title')}
              </h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                aria-label={t('mobile_menu.close')}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Contenido del menú */}
            <div className="p-4">
              {/* Navegación principal */}
              <nav className="space-y-1 mb-6">
                <Link
                  href="/"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname === '/'
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800'
                  }`}
                >
                  <HomeIcon className="h-5 w-5 mr-3" />
                  {t('nav.home')}
                </Link>
                
                <Link
                  href="/products"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname.startsWith('/products')
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800'
                  }`}
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-3" />
                  {t('nav.products')}
                </Link>
                
                <Link
                  href="/deals"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname.startsWith('/deals')
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800'
                  }`}
                >
                  <TagIcon className="h-5 w-5 mr-3" />
                  {t('nav.deals')}
                </Link>
                
                <Link
                  href="/about"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname.startsWith('/about')
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800'
                  }`}
                >
                  <InformationCircleIcon className="h-5 w-5 mr-3" />
                  {t('nav.about')}
                </Link>
                
                <Link
                  href="/contact"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname.startsWith('/contact')
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800'
                  }`}
                >
                  <EnvelopeIcon className="h-5 w-5 mr-3" />
                  {t('nav.contact')}
                </Link>
              </nav>
              
              {/* Categorías */}
              <div className="mb-6">
                <h3 className="px-3 text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2">
                  {t('mobile_menu.categories')}
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.href}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800"
                    >
                      <span>{category.name}</span>
                      <ChevronRightIcon className="h-4 w-4 text-secondary-400" />
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                  >
                    <span>{t('nav.all_categories')}</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Cuenta */}
              <div className="mb-6">
                <h3 className="px-3 text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2">
                  {t('mobile_menu.account')}
                </h3>
                <div className="space-y-1">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-sm text-secondary-700 dark:text-secondary-300">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/account"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800"
                      >
                        <UserIcon className="h-5 w-5 mr-3" />
                        {t('nav.my_account')}
                      </Link>
                      <Link
                        href="/favorites"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800"
                      >
                        <HeartIcon className="h-5 w-5 mr-3" />
                        {t('nav.favorites')}
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800"
                      >
                        <ShoppingCartIcon className="h-5 w-5 mr-3" />
                        {t('nav.my_orders')}
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800"
                        >
                          <Cog6ToothIcon className="h-5 w-5 mr-3" />
                          {t('nav.admin_panel')}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                        {t('nav.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800"
                      >
                        <UserIcon className="h-5 w-5 mr-3" />
                        {t('nav.login')}
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                        {t('nav.register')}
                      </Link>
                    </>
                  )}
                </div>
              </div>
              
              {/* Información de contacto */}
              <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                <h3 className="px-3 text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2">
                  {t('mobile_menu.contact_us')}
                </h3>
                <div className="px-3 space-y-2 text-sm text-secondary-700 dark:text-secondary-300">
                  <p>
                    <a href="tel:+593987654321" className="hover:text-primary-600 dark:hover:text-primary-400">
                      +593 98 765 4321
                    </a>
                  </p>
                  <p>
                    <a href="mailto:info@tiendaonline.com" className="hover:text-primary-600 dark:hover:text-primary-400">
                      info@tiendaonline.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
