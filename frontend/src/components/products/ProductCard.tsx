import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useCart, CartItem } from '@/context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isFeatured?: boolean;
    isOnSale?: boolean;
    stock: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation('common');
  const { addToCart, cartItems } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Verificar si el producto está en el carrito
  const isInCart = cartItems.some(item => item.id === product.id);
  
  // Calcular el descuento si hay un precio original
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  // Manejar clic en el botón de añadir al carrito
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
      stock: product.stock
    };
    
    addToCart(cartItem);
  };
  
  // Manejar clic en el botón de favorito
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <motion.div 
      className="group relative bg-white dark:bg-secondary-900 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {t('product.new')}
          </span>
        )}
        
        {product.isOnSale && product.originalPrice && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            -{discountPercentage}%
          </span>
        )}
      </div>
      
      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 dark:bg-secondary-800/80 text-secondary-500 hover:text-red-500 dark:text-secondary-400 dark:hover:text-red-400 transition-colors"
        aria-label={isFavorite ? t('product.remove_from_favorites') : t('product.add_to_favorites')}
      >
        {isFavorite ? (
          <HeartIconSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5" />
        )}
      </button>
      
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block relative pt-[100%]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/products/${product.slug}`}
            className="px-4 py-2 bg-white/90 dark:bg-secondary-800/90 rounded-full text-secondary-900 dark:text-white text-sm font-medium flex items-center shadow-md hover:bg-white dark:hover:bg-secondary-800 transition-colors"
          >
            <EyeIcon className="h-4 w-4 mr-1.5" />
            {t('product.quick_view')}
          </Link>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? (
                  <StarIconSolid className="h-4 w-4 text-yellow-400" />
                ) : i < product.rating ? (
                  <span className="relative">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <StarIconSolid className="absolute top-0 left-0 h-4 w-4 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                  </span>
                ) : (
                  <StarIcon className="h-4 w-4 text-secondary-300 dark:text-secondary-600" />
                )}
              </span>
            ))}
          </div>
          <span className="ml-1 text-xs text-secondary-500 dark:text-secondary-400">
            ({product.reviewCount})
          </span>
        </div>
        
        <h3 className="text-secondary-900 dark:text-white font-medium mb-1 line-clamp-2">
          <Link href={`/products/${product.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-primary-600 dark:text-primary-400 font-semibold">
              ${product.price.toFixed(2)}
            </span>
            
            {product.originalPrice && (
              <span className="ml-2 text-sm text-secondary-500 dark:text-secondary-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isInCart || product.stock <= 0}
            className={`p-2 rounded-full transition-colors ${
              isInCart 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 cursor-default' 
                : product.stock <= 0
                  ? 'bg-secondary-100 text-secondary-400 dark:bg-secondary-800 dark:text-secondary-600 cursor-not-allowed'
                  : 'bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50'
            }`}
            aria-label={
              isInCart 
                ? t('product.in_cart') 
                : product.stock <= 0 
                  ? t('product.out_of_stock') 
                  : t('product.add_to_cart')
            }
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Stock Status */}
        {product.stock <= 0 && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            {t('product.out_of_stock')}
          </p>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            {t('product.low_stock', { count: product.stock })}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
