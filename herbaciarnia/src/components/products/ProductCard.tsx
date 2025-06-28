'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/lib/products';

/**
 * Product card component displaying a single product in the store
 * 
 * @param product - Object containing product data to display
 */
const ProductCard = ({ product }: { product: Product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const promocjaRef = useRef<HTMLSpanElement>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Animation for promotion
    if (product.promotion && promocjaRef.current) {
      gsap.fromTo(
        promocjaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [product.promotion]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents default link action
    e.stopPropagation(); // Stop propagation to avoid navigating to the product page
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    addToCart(product);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const isCurrentlyFavorite = isFavorite(product.id);

  return (
    <div className="flex flex-col p-4 rounded-lg shadow-md transition-all duration-300 hover:z-10 hover:shadow-lg hover:translate-y-[-5px] hover:translate-x-[-5px] bg-white relative h-full product-item border border-gray-200">
      <Link 
        href={`/product/${product.id}`} 
        className="group flex flex-col flex-grow"
        aria-label={`Zobacz szczegóły produktu ${product.name}`}
      >
        <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
          {!imageError ? (
            <>
              {/* Prawdziwy obrazek produktu */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                onError={handleImageError}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50/30 to-transparent z-0" />
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
          
          <button 
            onClick={handleToggleFavorite}
            className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-300 z-10"
            aria-label={isCurrentlyFavorite ? `Usuń ${product.name} z ulubionych` : `Dodaj ${product.name} do ulubionych`}
          >
            {isCurrentlyFavorite ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
            )}
          </button>
          
          {/* Badge promocji */}
          {product.promotion && (
            <span
              ref={promocjaRef}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
            >
              Promocja
            </span>
          )}
        </div>
        
        <h3 className="font-medium text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 pl-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 mb-2 flex-grow pl-2">{product.description.substring(0, 80)}...</p>
        <div className="flex flex-col mt-2 pl-2">
           <div className="flex items-center">
             {product.promotion ? (
               <>
                 <span className="text-lg font-bold text-gray-700">{product.price.toFixed(2)} zł</span>
                 <span className="ml-2 text-sm line-through text-gray-500">
                   {product.priceBeforePromotion?.toFixed(2)} zł
                 </span>
               </>
             ) : (
               <span className="text-lg font-bold text-gray-700">{product.price.toFixed(2)} zł</span>
             )}
           </div>
           {product.lowestPrice30Days && (
             <div className="text-xs text-red-500 mt-1 whitespace-nowrap">
               Najniższa cena (30 dni): {product.lowestPrice30Days.toFixed(2)} zł
             </div>
           )}
        </div>
      </Link>
      
      <button 
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className={`mt-3 py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center ${
          isInCart(product.id) 
            ? 'bg-green-700 text-white hover:bg-green-800' 
            : 'bg-emerald-700 text-white hover:bg-emerald-800'
        } disabled:opacity-50`}
        aria-label={`Dodaj ${product.name} do koszyka`}
      >
        <ShoppingBagIcon className="h-5 w-5 mr-2" />
        {isAddingToCart ? 'Dodawanie...' : isInCart(product.id) ? 'W koszyku' : 'Dodaj do koszyka'}
      </button>
    </div>
  );
};

export default ProductCard;