'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon, 
  UserIcon, 
  HeartIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CartContext';

/**
 * Main navigation component
 * Contains logo, page links and action icons (search, account, favorites, cart)
 */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Atrapa stanu logowania
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogin = () => {
    // Przekierowanie do strony logowania
    window.location.href = '/login';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Atrapa - w rzeczywistej aplikacji byłaby tu logika wylogowania
    alert('Wylogowano pomyślnie! (Atrapa dla portfolio)');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-emerald-700 flex items-center">
            <span className="mr-2">🍃</span>
            Herbaciarnia
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-emerald-800 hover:text-emerald-600 transition-colors duration-300">Herbaty</Link>
            <Link href="/about" className="text-emerald-800 hover:text-emerald-600 transition-colors duration-300">O nas</Link>
            <Link href="/blog" className="text-emerald-800 hover:text-emerald-600 transition-colors duration-300">Blog</Link>
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
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mój profil
                    </Link>
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Panel admin
                    </Link>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Wyloguj się
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Zaloguj się
                  </button>
                )}
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
              aria-label="Shopping cart"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-700 hover:text-emerald-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link 
              href="/shop" 
              className="block px-3 py-2 text-emerald-800 hover:text-emerald-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Herbaty
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-emerald-800 hover:text-emerald-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              O nas
            </Link>
            <Link 
              href="/blog" 
              className="block px-3 py-2 text-emerald-800 hover:text-emerald-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <div className="border-t border-gray-200 pt-2">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/profile" 
                    className="block px-3 py-2 text-emerald-800 hover:text-emerald-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Mój profil
                  </Link>
                  <Link 
                    href="/admin" 
                    className="block px-3 py-2 text-emerald-800 hover:text-emerald-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Panel admin
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-emerald-800 hover:text-emerald-600 transition-colors duration-300"
                  >
                    Wyloguj się
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    handleLogin();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-emerald-800 hover:text-emerald-600 transition-colors duration-300"
                >
                  Zaloguj się
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;