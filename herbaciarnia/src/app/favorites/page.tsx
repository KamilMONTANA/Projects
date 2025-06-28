'use client';

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '../context/FavoritesContext';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import FavoriteProductCard from '@/components/products/FavoriteProductCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animacja nagłówka
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Animacja dla pustego stanu
    if (favorites.length === 0 && emptyStateRef.current) {
      gsap.fromTo(
        emptyStateRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    } else if (contentRef.current) {
      // Animacja dla listy produktów
      gsap.fromTo(
        contentRef.current.querySelectorAll('.product-card'),
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [favorites.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Nagłówek strony */}
      <div 
        ref={headerRef}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 py-16 px-6 md:px-12"
      >
        {/* Dekoracyjne elementy tła */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <HeartSolidIcon className="h-10 w-10 text-red-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Twoje ulubione
            <span className="block text-emerald-200">herbaty</span>
          </h1>
          
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Kolekcja Twoich najcenniejszych smaków, starannie wyselekcjonowanych 
            dla wyjątkowych chwil relaksu i przyjemności
          </p>
        </div>
      </div>

      {/* Zawartość strony */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12">
        {favorites.length === 0 ? (
          <div 
            ref={emptyStateRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-12 text-center max-w-2xl mx-auto"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-emerald-100 to-emerald-200 h-32 w-32 rounded-full flex items-center justify-center mx-auto">
                <HeartIcon className="h-16 w-16 text-emerald-600" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">
              Twoja kolekcja jest pusta
            </h2>
            
            <p className="text-emerald-600 text-lg mb-10 leading-relaxed">
              Rozpocznij swoją podróż przez świat herbat i dodaj pierwsze ulubione smaki. 
              Każda herbata to nowa historia do odkrycia.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/shop"
                className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-8 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                aria-label="Przeglądaj herbaty"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Przeglądaj herbaty
              </Link>
              
              <div className="text-sm text-emerald-500">
                Kliknij ikonę serca przy każdej herbacie, aby dodać ją do ulubionych
              </div>
            </div>
          </div>
        ) : (
          <div ref={contentRef}>
            {/* Statystyki */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 text-center">
                <div className="text-3xl font-bold text-emerald-700 mb-2">{favorites.length}</div>
                <div className="text-emerald-600">Ulubione herbaty</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 text-center">
                <div className="text-3xl font-bold text-emerald-700 mb-2">
                  {favorites.filter(p => p.promotion).length}
                </div>
                <div className="text-emerald-600">W promocji</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 text-center">
                <div className="text-3xl font-bold text-emerald-700 mb-2">
                  {favorites.length > 0 ? 
                    (favorites.reduce((sum, p) => sum + p.price, 0) / favorites.length).toFixed(2) : 
                    '0.00'
                  } zł
                </div>
                <div className="text-emerald-600">Średnia cena</div>
              </div>
            </div>

            {/* Lista produktów */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((product) => (
                <FavoriteProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Akcje */}
            <div className="mt-16 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                  Chcesz więcej herbat?
                </h3>
                <p className="text-emerald-600 mb-6">
                  Odkryj nasze nowe smaki i rozszerz swoją kolekcję ulubionych
                </p>
                <Link 
                  href="/shop"
                  className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  aria-label="Przejdź do sklepu"
                >
                  Przejdź do sklepu
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}