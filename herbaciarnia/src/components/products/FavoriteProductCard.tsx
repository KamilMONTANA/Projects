'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline';
import { Product, useFavorites } from '@/app/context/FavoritesContext';
import { useState } from 'react';

interface FavoriteProductCardProps {
  product: Product;
}

export default function FavoriteProductCard({ product }: FavoriteProductCardProps) {
  const { removeFromFavorites } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const handleRemoveFromFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromFavorites(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Tutaj można dodać logikę dodawania do koszyka
    alert(`${product.name} został dodany do koszyka!`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="product-card group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-emerald-200"
    >
      <Link 
        href={`/product/${product.id}`} 
        className="block relative"
        aria-label={`Zobacz szczegóły produktu ${product.name}`}
      >
        {/* Obraz produktu */}
        <div className="relative h-56 w-full bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden">
          {!imageError ? (
            <>
              {/* Prawdziwy obrazek produktu */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                onError={handleImageError}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/30 to-transparent" />
            </>
          ) : (
            <>
              {/* Placeholder dla brakującego obrazka */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-emerald-700 font-medium text-sm">Obraz produktu</span>
                </div>
              </div>
            </>
          )}
          
          {/* Badge promocji */}
          {product.promotion && (
            <div className="absolute top-3 right-3 z-20">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{product.priceBeforePromotion ? Math.round(((product.priceBeforePromotion - product.price) / product.priceBeforePromotion) * 100) : 20}%
              </span>
            </div>
          )}
          
          {/* Przycisk usuwania z ulubionych */}
          <button 
            onClick={handleRemoveFromFavorites}
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-all duration-300 z-20 group-hover:scale-110"
            aria-label="Usuń z ulubionych"
          >
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>

        {/* Informacje o produkcie */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg text-emerald-900 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center text-emerald-600">
              <StarIcon className="h-4 w-4 fill-current" />
              <span className="text-sm ml-1">{product.popularity?.toFixed(1) || '4.5'}</span>
            </div>
          </div>
          
          {/* Cena */}
          <div className="flex items-baseline gap-2 mb-4">
            {product.promotion && product.priceBeforePromotion ? (
              <>
                <span className="text-2xl font-bold text-emerald-700">
                  {product.price.toFixed(2)} zł
                </span>
                <span className="text-sm line-through text-gray-400">
                  {product.priceBeforePromotion.toFixed(2)} zł
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-emerald-700">
                {product.price.toFixed(2)} zł
              </span>
            )}
          </div>
          
          {/* Kategoria */}
          <div className="mb-4">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Przycisk dodawania do koszyka */}
      <div className="px-6 pb-6">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center group-hover:shadow-lg transform group-hover:scale-105"
          aria-label={`Dodaj ${product.name} do koszyka`}
        >
          <ShoppingBagIcon className="h-5 w-5 mr-2" />
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}