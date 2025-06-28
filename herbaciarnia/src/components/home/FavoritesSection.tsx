'use client';

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useFavorites } from '@/app/context/FavoritesContext';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/lib/products';
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * Favorites section component for the home page
 * Displays carousels with promotional and popular products
 */
export default function FavoritesSection() {
  const { favorites } = useFavorites();
  
  return (
    <div className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">Twoje ulubione</h2>
        <Link 
          href="/favorites" 
          className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-300 inline-flex items-center"
          aria-label="Zobacz wszystkie ulubione"
        >
          Zobacz wszystkie
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      {favorites.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="bg-emerald-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartIcon className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-emerald-800 mb-2">Nie masz jeszcze ulubionych herbat</h3>
          <p className="text-emerald-600 mb-4">
            Dodaj ulubione herbaty, klikając ikonę serca na karcie produktu.
          </p>
        </div>
      ) : (
        <Slider
          dots={true}
          infinite={false}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={false}
          autoplaySpeed={5000}
          centerMode={false}
          arrows={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {favorites.map((product) => (
            <div key={product.id} className="px-2 h-full">
              <div className="h-full max-w-xs">
                <ProductCard product={product as Product} />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}