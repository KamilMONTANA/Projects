'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  MagnifyingGlassIcon, 
  UserIcon 
} from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CartContext';

/**
 * Main navigation component
 * Contains logo, page links and action icons (search, account, favorites, cart)
 */
const Nawigacja = () => {
  const navRef = useRef<HTMLElement>(null);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  // Efekt animacji przy montowaniu komponentu
  useEffect(() => {
    // Animacja dla nawigacji
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <nav 
      ref={navRef}
      className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold text-emerald-700 flex items-center"
          aria-label="Strona główna Herbaciarnia"
        >
          <span className="text-3xl mr-2">🍃</span> Herbaciarnia
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-emerald-800 hover:text-emerald-600 transition-colors duration-300">Herbaty</Link>
          <Link href="/about" className="text-emerald-800 hover:text-emerald-600 transition-colors duration-300">O nas</Link>
          <Link href="/blog" className="text-emerald-800 hover:text-emerald-600 transition-colors duration-300">Blog</Link>
          <Link href="/contact" className="text-emerald-800 hover:text-emerald-600 transition-colors duration-300">Kontakt</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
             href="/search" 
             className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors duration-300"
             aria-label="Wyszukaj"
           >
             <MagnifyingGlassIcon className="h-6 w-6" />
           </Link>
          <div className="relative group">
            <button className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors duration-300">
              <UserIcon className="h-6 w-6" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mój profil
              </Link>
              <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Panel admin
              </Link>
              <hr className="my-1" />
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Wyloguj się
              </button>
            </div>
          </div>
          <Link 
            href="/favorites" 
            className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors duration-300"
            aria-label="Favorite products"
          >
            <HeartIcon className="h-6 w-6" />
          </Link>
          <Link 
            href="/cart" 
            className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors duration-300 relative"
            aria-label="Koszyk"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nawigacja;