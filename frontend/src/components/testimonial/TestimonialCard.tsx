import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  avatar,
  rating,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800">
      <div className="mb-4 flex items-center">
        <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt={name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      
      <p className="mb-4 text-gray-600 dark:text-gray-300">{content}</p>
      
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
