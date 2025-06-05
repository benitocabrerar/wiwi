import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { 
  FiShoppingBag, 
  FiUsers, 
  FiShoppingCart, 
  FiStar, 
  FiTrendingUp, 
  FiDollarSign, 
  FiAlertCircle, 
  FiPackage 
} from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: NextPage = () => {
  const { t } = useTranslation('admin');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    pendingReviews: 0,
    recentOrders: [],
    topProducts: [],
    salesData: {
      labels: [],
      datasets: [],
    },
    categoryData: {
      labels: [],
      datasets: [],
    },
  });

  useEffect(() => {
    // Simular carga de datos
    const fetchData = async () => {
      // En una implementación real, aquí se haría una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Datos simulados
      const mockData = {
        totalSales: 15680.45,
        totalOrders: 124,
        totalCustomers: 89,
        totalProducts: 56,
        lowStockProducts: 8,
        pendingReviews: 12,
        recentOrders: [
          { id: 'ORD-2305-1234', customer: 'Juan Pérez', total: 125.99, status: 'completed', date: '2025-06-03' },
          { id: 'ORD-2305-1235', customer: 'María López', total: 89.50, status: 'processing', date: '2025-06-03' },
          { id: 'ORD-2305-1236', customer: 'Carlos Ruiz', total: 245.00, status: 'pending', date: '2025-06-02' },
          { id: 'ORD-2305-1237', customer: 'Ana Gómez', total: 76.25, status: 'completed', date: '2025-06-02' },
          { id: 'ORD-2305-1238', customer: 'Pedro Sánchez', total: 189.99, status: 'processing', date: '2025-06-01' },
        ],
        topProducts: [
          { id: 1, name: 'Smartphone X1', sales: 28, revenue: 13999.72 },
          { id: 2, name: 'Auriculares Bluetooth', sales: 45, revenue: 2249.55 },
          { id: 3, name: 'Smartwatch Pro', sales: 19, revenue: 3799.81 },
          { id: 4, name: 'Tablet Ultra', sales: 15, revenue: 4499.85 },
          { id: 5, name: 'Cámara Digital 4K', sales: 12, revenue: 3599.88 },
        ],
        salesData: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Ventas 2025',
              data: [12500, 15800, 14200, 16500, 18200, 15680],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Ventas 2024',
              data: [10200, 12500, 11800, 13500, 15200, 14100],
              borderColor: 'rgb(107, 114, 128)',
              backgroundColor: 'rgba(107, 114, 128, 0.5)',
              tension: 0.3,
            },
          ],
        },
        categoryData: {
          labels: ['Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Belleza'],
          datasets: [
            {
              label: 'Ventas por categoría',
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(239, 68, 68, 0.7)',
                'rgba(139, 92, 246, 0.7)',
              ],
              borderWidth: 1,
            },
          ],
        },
      };

      setStats(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: t('totalSales'),
      value: `$${stats.totalSales.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <FiDollarSign className="w-8 h-8 text-blue-500" />,
      change: '+12.5%',
      positive: true,
    },
    {
      title: t('totalOrders'),
      value: stats.totalOrders,
      icon: <FiShoppingCart className="w-8 h-8 text-green-500" />,
      change: '+8.2%',
      positive: true,
    },
    {
      title: t('totalCustomers'),
      value: stats.totalCustomers,
      icon: <FiUsers className="w-8 h-8 text-purple-500" />,
      change: '+15.3%',
      positive: true,
    },
    {
      title: t('totalProducts'),
      value: stats.totalProducts,
      icon: <FiShoppingBag className="w-8 h-8 text-yellow-500" />,
      change: '+5.7%',
      positive: true,
    },
  ];

  const alertCards = [
    {
      title: t('lowStock'),
      value: stats.lowStockProducts,
      icon: <FiAlertCircle className="w-8 h-8 text-red-500" />,
      link: '/admin/products?filter=low-stock',
    },
    {
      title: t('pendingReviews'),
      value: stats.pendingReviews,
      icon: <FiStar className="w-8 h-8 text-yellow-500" />,
      link: '/admin/reviews?filter=pending',
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard')}
          </h1>
          <div className="flex space-x-2">
            <select className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
              <option value="today">{t('today')}</option>
              <option value="yesterday">{t('yesterday')}</option>
              <option value="last7days">{t('last7days')}</option>
              <option value="last30days" selected>{t('last30days')}</option>
              <option value="thisMonth">{t('thisMonth')}</option>
              <option value="lastMonth">{t('lastMonth')}</option>
              <option value="custom">{t('custom')}</option>
            </select>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800">
              {t('export')}
            </button>
          </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full dark:bg-blue-900/20">
                  {card.icon}
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center text-sm font-medium ${
                    card.positive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  {card.change}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {t('vs')} {t('lastPeriod')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Alertas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {alertCards.map((card, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-full dark:bg-red-900/20">
                  {card.icon}
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={card.link}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {t('viewDetails')} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              {t('salesOverTime')}
            </h2>
            <div className="h-80">
              <Line
                data={stats.salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `$${value.toLocaleString()}`,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `$${context.raw.toLocaleString()}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              {t('salesByCategory')}
            </h2>
            <div className="flex items-center justify-center h-80">
              <Doughnut
                data={stats.categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.raw}%`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Tablas */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Pedidos recientes */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('recentOrders')}
              </h2>
              <a
                href="/admin/orders"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {t('viewAll')}
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    <th className="px-4 py-3">{t('orderId')}</th>
                    <th className="px-4 py-3">{t('customer')}</th>
                    <th className="px-4 py-3">{t('total')}</th>
                    <th className="px-4 py-3">{t('status')}</th>
                    <th className="px-4 py-3">{t('date')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {stats.recentOrders.map((order: any, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                        <a href={`/admin/orders/${order.id}`}>{order.id}</a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                        {order.customer}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Productos más vendidos */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('topProducts')}
              </h2>
              <a
                href="/admin/products"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {t('viewAll')}
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    <th className="px-4 py-3">{t('product')}</th>
                    <th className="px-4 py-3">{t('sales')}</th>
                    <th className="px-4 py-3">{t('revenue')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {stats.topProducts.map((product: any, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                        <a href={`/admin/products/${product.id}`}>{product.name}</a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                        {product.sales} {t('units')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                        ${product.revenue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'admin'])),
    },
  };
};

export default AdminDashboard;
