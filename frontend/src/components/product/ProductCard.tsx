import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  sku: string;
  stock: number;
  discount?: number;
  categoryId?: string;
  rating?: number;
  reviews?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  slug,
  sku,
  stock,
  discount = 0,
  rating,
  reviews,
}) => {
  const { t } = useTranslation('common');
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(id);
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
  }).format(discountedPrice);
  const formattedOriginalPrice = discount > 0 
    ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(price)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price: discountedPrice,
      image,
      slug,
      sku,
      quantity: 1,
      stock,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name,
        price: discountedPrice,
        image,
        slug,
        sku,
        stock,
        discount,
      });
    }
  };

  return (
    <Link
      href={`/productos/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Etiqueta de descuento */}
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        
        {/* Botones de acción */}
        <div className="absolute right-2 top-2 flex flex-col space-y-2">
          <button
            onClick={handleToggleWishlist}
            className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label={inWishlist ? t('product.remove_from_wishlist') : t('product.add_to_wishlist')}
          >
            {inWishlist ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      {/* Información del producto */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">{name}</h3>
        
        {/* Precios */}
        <div className="mb-2 flex items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through dark:text-gray-400">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
        
        {/* Valoraciones */}
        {rating !== undefined && reviews !== undefined && (
          <div className="mb-3 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
              ({reviews})
            </span>
          </div>
        )}
        
        {/* Botón de añadir al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className="mt-auto flex w-full items-center justify-center rounded-md bg-primary-600 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 dark:focus:ring-offset-gray-900"
        >
          {stock > 0 ? (
            <>
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
              {t('product.add_to_cart')}
            </>
          ) : (
            t('product.out_of_stock')
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
