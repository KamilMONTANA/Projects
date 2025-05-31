'use client';

import Link from 'next/link';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Product, useFavorites } from '@/app/context/FavoritesContext';

interface FavoriteProductCardProps {
  product: Product;
}

export default function FavoriteProductCard({ product }: FavoriteProductCardProps) {
  const { removeFromFavorites } = useFavorites();

  return (
    <div 
      key={product.id} 
      className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
    >
      <Link 
        href={`/product/${product.id}`} 
        className="group block"
        aria-label={`View product details ${product.name}`}
      >
        <div className="relative h-48 w-full bg-emerald-100 flex items-center justify-center">
          {/* Placeholder for product image, replace with actual image if available */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-50 to-transparent z-0" />
          <span className="text-emerald-700 font-medium">Product image</span>
          {product.promotion && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Sale
            </span>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              removeFromFavorites(product.id);
            }}
            className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-300 z-10"
            aria-label="Remove from favorites"
          >
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">{product.name}</h3>
          <div className="flex items-end mb-4">
            {product.promotion && product.priceBeforePromotion ? (
              <>
                <span className="text-lg font-bold text-emerald-700">{product.price.toFixed(2)} zł</span>
                <span className="ml-2 text-sm line-through text-gray-500">
                  {product.priceBeforePromotion.toFixed(2)} zł
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-emerald-700">{product.price.toFixed(2)} zł</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking add to cart
        >
          <ShoppingBagIcon className="h-5 w-5 mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
}