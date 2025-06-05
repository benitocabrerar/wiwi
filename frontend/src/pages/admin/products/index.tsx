import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiSearch, 
  FiFilter, 
  FiChevronDown, 
  FiChevronUp, 
  FiX,
  FiAlertCircle
} from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  featured: boolean;
  createdAt: string;
}

const ProductsPage: NextPage = () => {
  const { t } = useTranslation('admin');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Product>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    minStock: '',
    maxStock: '',
    featured: '',
  });

  // Simular carga de datos
  useEffect(() => {
    const fetchProducts = async () => {
      // En una implementación real, aquí se haría una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Datos simulados
      const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
        id: `PRD-${(i + 1).toString().padStart(4, '0')}`,
        name: [
          'Smartphone X1',
          'Auriculares Bluetooth',
          'Smartwatch Pro',
          'Tablet Ultra',
          'Cámara Digital 4K',
          'Laptop Gaming',
          'Monitor Curvo',
          'Teclado Mecánico',
          'Mouse Inalámbrico',
          'Altavoces Bluetooth',
        ][i % 10],
        image: `/images/products/product-${(i % 10) + 1}.jpg`,
        category: [
          'Electrónicos',
          'Accesorios',
          'Computadoras',
          'Audio',
          'Fotografía',
        ][i % 5],
        price: Math.floor(Math.random() * 1000) + 50,
        stock: Math.floor(Math.random() * 100),
        status: Math.random() > 0.2 ? 'active' : 'inactive',
        featured: Math.random() > 0.7,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
        ).toISOString(),
      }));

      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // Filtrar productos
  useEffect(() => {
    let result = [...products];

    // Aplicar búsqueda
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros
    if (filters.category) {
      result = result.filter((product) => product.category === filters.category);
    }

    if (filters.status) {
      result = result.filter((product) => product.status === filters.status);
    }

    if (filters.minPrice) {
      result = result.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.minStock) {
      result = result.filter(
        (product) => product.stock >= parseInt(filters.minStock)
      );
    }

    if (filters.maxStock) {
      result = result.filter(
        (product) => product.stock <= parseInt(filters.maxStock)
      );
    }

    if (filters.featured) {
      result = result.filter(
        (product) =>
          (filters.featured === 'yes' && product.featured) ||
          (filters.featured === 'no' && !product.featured)
      );
    }

    // Ordenar productos
    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, filters, products, sortField, sortDirection]);

  // Obtener productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Ordenar productos
  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Seleccionar/deseleccionar todos los productos
  const handleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map((product) => product.id));
    }
  };

  // Seleccionar/deseleccionar un producto
  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Eliminar productos seleccionados
  const handleDeleteSelected = () => {
    if (window.confirm(t('confirmDeleteProducts'))) {
      // En una implementación real, aquí se haría una llamada a la API
      setProducts(
        products.filter((product) => !selectedProducts.includes(product.id))
      );
      setSelectedProducts([]);
    }
  };

  // Restablecer filtros
  const handleResetFilters = () => {
    setFilters({
      category: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      minStock: '',
      maxStock: '',
      featured: '',
    });
    setSearchTerm('');
    setShowFilters(false);
  };

  // Categorías únicas para el filtro
  const categories = [...new Set(products.map((product) => product.category))];

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('products')}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              {t('addProduct')}
            </Link>
            {selectedProducts.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                {t('deleteSelected')} ({selectedProducts.length})
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <FiFilter className="w-4 h-4 mr-2" />
            {t('filters')}
            {Object.values(filters).some((value) => value !== '') && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-600 rounded-full">
                {Object.values(filters).filter((value) => value !== '').length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="p-4 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('filters')}
              </h2>
              <button
                onClick={handleResetFilters}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {t('resetFilters')}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('category')}
                </label>
                <select
                  className="block w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">{t('allCategories')}</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('status')}
                </label>
                <select
                  className="block w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">{t('allStatuses')}</option>
                  <option value="active">{t('active')}</option>
                  <option value="inactive">{t('inactive')}</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('price')}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    className="block w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder={t('min')}
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="block w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder={t('max')}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('stock')}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    className="block w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder={t('min')}
                    value={filters.minStock}
                    onChange={(e) =>
                      setFilters({ ...filters, minStock: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="block w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder={t('max')}
                    value={filters.maxStock}
                    onChange={(e) =>
                      setFilters({ ...filters, maxStock: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('featured')}
                </label>
                <select
                  className="block w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  value={filters.featured}
                  onChange={(e) =>
                    setFilters({ ...filters, featured: e.target.value })
                  }
                >
                  <option value="">{t('all')}</option>
                  <option value="yes">{t('yes')}</option>
                  <option value="no">{t('no')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-600"
                          checked={
                            selectedProducts.length === currentProducts.length &&
                            currentProducts.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center">
                        {t('id')}
                        {sortField === 'id' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        {t('product')}
                        {sortField === 'name' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 cursor-pointer"
                      onClick={() => handleSort('category')}
                    >
                      <div className="flex items-center">
                        {t('category')}
                        {sortField === 'category' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 cursor-pointer"
                      onClick={() => handleSort('price')}
                    >
                      <div className="flex items-center">
                        {t('price')}
                        {sortField === 'price' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 cursor-pointer"
                      onClick={() => handleSort('stock')}
                    >
                      <div className="flex items-center">
                        {t('stock')}
                        {sortField === 'stock' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        {t('status')}
                        {sortField === 'status' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">{t('actions')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                      >
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-600"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleSelectProduct(product.id)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 relative">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </div>
                              {product.featured && (
                                <div className="text-xs text-primary-600 dark:text-primary-400">
                                  {t('featured')}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {product.category}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`${
                                product.stock <= 5
                                  ? 'text-red-600 dark:text-red-400'
                                  : product.stock <= 20
                                  ? 'text-yellow-600 dark:text-yellow-400'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {product.stock}
                            </span>
                            {product.stock <= 5 && (
                              <FiAlertCircle className="w-4 h-4 ml-1 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              product.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}
                          >
                            {product.status === 'active'
                              ? t('active')
                              : t('inactive')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                              <FiEye className="w-5 h-5" />
                              <span className="sr-only">{t('view')}</span>
                            </Link>
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <FiEdit2 className="w-5 h-5" />
                              <span className="sr-only">{t('edit')}</span>
                            </Link>
                            <button
                              onClick={() => {
                                if (window.confirm(t('confirmDeleteProduct'))) {
                                  // En una implementación real, aquí se haría una llamada a la API
                                  setProducts(
                                    products.filter((p) => p.id !== product.id)
                                  );
                                }
                              }}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <FiTrash2 className="w-5 h-5" />
                              <span className="sr-only">{t('delete')}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-8 text-sm text-center text-gray-500 dark:text-gray-400"
                      >
                        {t('noProductsFound')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Paginación */}
        {filteredProducts.length > productsPerPage && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('showing')} {indexOfFirstProduct + 1} {t('to')}{' '}
              {Math.min(indexOfLastProduct, filteredProducts.length)} {t('of')}{' '}
              {filteredProducts.length} {t('products')}
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {t('previous')}
              </button>
              {Array.from(
                { length: Math.ceil(filteredProducts.length / productsPerPage) },
                (_, i) => i + 1
              )
                .filter(
                  (number) =>
                    number === 1 ||
                    number === currentPage ||
                    number === Math.ceil(filteredProducts.length / productsPerPage) ||
                    (number >= currentPage - 1 && number <= currentPage + 1)
                )
                .map((number, index, array) => {
                  // Agregar puntos suspensivos si hay saltos en la paginación
                  if (index > 0 && array[index - 1] !== number - 1) {
                    return (
                      <React.Fragment key={`ellipsis-${number}`}>
                        <span className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
                          ...
                        </span>
                        <button
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 text-sm font-medium rounded-md ${
                            currentPage === number
                              ? 'bg-primary-600 text-white dark:bg-primary-700'
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                        >
                          {number}
                        </button>
                      </React.Fragment>
                    );
                  }
                  return (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        currentPage === number
                          ? 'bg-primary-600 text-white dark:bg-primary-700'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {number}
                    </button>
                  );
                })}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredProducts.length / productsPerPage)
                }
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  currentPage ===
                  Math.ceil(filteredProducts.length / productsPerPage)
                    ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {t('next')}
              </button>
            </div>
          </div>
        )}
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

export default ProductsPage;
