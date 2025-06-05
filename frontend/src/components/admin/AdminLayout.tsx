import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { 
  FiHome, 
  FiShoppingBag, 
  FiUsers, 
  FiShoppingCart, 
  FiStar, 
  FiSettings, 
  FiBarChart2, 
  FiTag, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiBell, 
  FiUser, 
  FiMoon, 
  FiSun 
} from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useTranslation('admin');
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si es un dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Verificar si el usuario está autenticado y es administrador
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login?redirect=/admin');
    }
  }, [user, isLoading, router]);

  // Obtener notificaciones (simulado)
  useEffect(() => {
    // Aquí se haría una llamada a la API para obtener notificaciones
    const mockNotifications = [
      { id: 1, message: 'Nuevo pedido #ORD-2305-1234', time: '5 min', read: false },
      { id: 2, message: 'Producto con bajo stock: Smartphone X1', time: '30 min', read: false },
      { id: 3, message: 'Nueva reseña de producto', time: '1 hora', read: true },
    ];
    setNotifications(mockNotifications);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const menuItems = [
    { name: t('dashboard'), icon: <FiHome className="w-5 h-5" />, href: '/admin' },
    { name: t('products'), icon: <FiShoppingBag className="w-5 h-5" />, href: '/admin/products' },
    { name: t('categories'), icon: <FiTag className="w-5 h-5" />, href: '/admin/categories' },
    { name: t('orders'), icon: <FiShoppingCart className="w-5 h-5" />, href: '/admin/orders' },
    { name: t('customers'), icon: <FiUsers className="w-5 h-5" />, href: '/admin/customers' },
    { name: t('reviews'), icon: <FiStar className="w-5 h-5" />, href: '/admin/reviews' },
    { name: t('analytics'), icon: <FiBarChart2 className="w-5 h-5" />, href: '/admin/analytics' },
    { name: t('settings'), icon: <FiSettings className="w-5 h-5" />, href: '/admin/settings' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Admin
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href || router.pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              {t('logout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiMenu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 rounded-full dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-500 rounded-full dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiBell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 z-10 w-80 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
                    {t('notifications')}
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {t('noNotifications')}
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 text-sm text-center text-primary-600 dark:text-primary-400 border-t border-gray-200 dark:border-gray-700">
                      <button>{t('viewAll')}</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="relative w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.firstName}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <FiUser className="w-full h-full p-1 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container p-4 mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
