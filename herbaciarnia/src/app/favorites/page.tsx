'use client';

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '../context/FavoritesContext';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import FavoriteProductCard from '@/components/products/FavoriteProductCard'; // Import nowego komponentu

export default function FavoritesPage() {
  const { favorites } = useFavorites(); // Usunięto removeFromFavorites, bo jest w komponencie
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animacja dla pustego stanu lub listy produktów
    if (favorites.length === 0 && emptyStateRef.current) {
      gsap.fromTo(
        emptyStateRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    } else if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.product-card'), // Klasa .product-card jest w FavoriteProductCard
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [favorites.length]);

  return (
    <div className="min-h-screen bg-emerald-50 pb-16">
      {/* Nagłówek strony */}
      <div className="bg-emerald-700 py-12 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
            <HeartSolidIcon className="h-8 w-8 mr-3 text-red-400" />
            Twoje ulubione herbaty
          </h1>
          <p className="text-emerald-100 text-lg">
            Tutaj znajdziesz wszystkie herbaty, które dodałeś do ulubionych.
          </p>
        </div>
      </div>

      {/* Zawartość strony */}
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12">
        {favorites.length === 0 ? (
          <div 
            ref={emptyStateRef}
            className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto"
          >
            <div className="bg-emerald-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="h-12 w-12 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-4">Twoja lista ulubionych jest pusta</h2>
            <p className="text-emerald-600 mb-8">
              Dodaj swoje ulubione herbaty, aby mieć do nich szybki dostęp i nie przegapić żadnych promocji.
            </p>
            <Link 
              href="/shop" // Zmieniono link na /shop
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-md text-lg font-medium transition-colors duration-300 inline-block"
              aria-label="Przeglądaj herbaty"
            >
              Przeglądaj herbaty
            </Link>
          </div>
        ) : (
          <div ref={contentRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product) => (
                <FavoriteProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}