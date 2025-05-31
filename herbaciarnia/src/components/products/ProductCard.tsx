'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
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

  const isCurrentlyFavorite = isFavorite(product.id);

  return (
    <div className="flex flex-col p-4 rounded-lg shadow-md transition-all duration-300 hover:z-10 hover:shadow-lg hover:translate-y-[-5px] hover:translate-x-[-5px] bg-white relative h-full product-item border border-gray-200">
      <Link 
        href={`/product/${product.id}`} 
        className="group flex flex-col flex-grow"
        aria-label={`View product details ${product.name}`}
      >
        <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent z-0" />
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            {/* Placeholder background for missing images */}
            <span className="text-gray-700 font-medium">Product image</span>
          </div>
          <button 
            onClick={handleToggleFavorite}
            className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-300 z-10"
            aria-label={isCurrentlyFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          >
            {isCurrentlyFavorite ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
            )}
          </button>
        </div>
        {product.promotion && (
          <span
            ref={promocjaRef}
            className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            Promocja
          </span>
        )}
        <h3 className="font-medium text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 pl-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 mb-2 flex-grow pl-2">{product.description.substring(0, 80)}...</p>
        <div className="flex items-end mt-2 pl-2">
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
           {product.lowestPrice30Days && (
             <span className="text-xs text-red-500 ml-2">Najniższa cena (30 dni): {product.lowestPrice30Days.toFixed(2)} zł</span>
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
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingBagIcon className="h-5 w-5 mr-2" />
        {isAddingToCart ? 'Dodawanie...' : isInCart(product.id) ? 'W koszyku' : 'Dodaj do koszyka'}
      </button>
    </div>
  );
};

export default ProductCard;