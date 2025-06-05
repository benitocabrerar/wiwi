import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  featured?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  description,
  image,
  slug,
}) => {
  const { t } = useTranslation('common');

  return (
    <Link
      href={`/categorias/${slug}`}
      className="group relative block h-64 overflow-hidden rounded-lg bg-gray-100 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="mb-1 text-xl font-bold">{name}</h3>
        <p className="mb-3 text-sm opacity-90">{description}</p>
        <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm transition-colors group-hover:bg-primary-500">
          {t('category.explore')} →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
