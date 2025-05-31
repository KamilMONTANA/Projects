'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites, Product } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { getProductById } from '@/lib/products'; // Import funkcji getProductById


export default function ProductPage() {
  const { id } = useParams();
  const productId = parseInt(id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  
  const produktRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      // Upewnij się, że typy są zgodne. Może być konieczne dostosowanie Product w FavoritesContext
      // lub dodanie mapowania, jeśli struktury Product się różnią.
      setProduct(foundProduct as Product); 
    }
  }, [productId]);
  
  useEffect(() => {
    if (produktRef.current && product) {
      // Animacja dla całej strony produktu
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [product]);
  
  const handleToggleFavorite = () => {
    if (!product) return;
    
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    setIsAddingToCart(true);
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        description: product.description || '', // Ensure description is never undefined
        availability: product.availability ?? true // Ensure availability is always boolean
      });
    }
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };
  
  if (!product) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4">Product not found</h1>
          <p className="text-emerald-600 mb-6">Sorry, but the product with the given ID does not exist.</p>
          <Link 
            href="/"
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition-colors duration-300 inline-flex items-center"
            aria-label="Wróć na stronę główną"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }
  
  const isCurrentlyFavorite = isFavorite(product.id);
  
  return (
    <div className="min-h-screen bg-emerald-50" ref={produktRef}>
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Przycisk powrotu */}
        <Link 
          href="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors duration-300 mb-8 group"
          aria-label="Wróć na stronę główną"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Wróć do sklepu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Obraz produktu */}
          <div ref={imageRef} className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-md transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          {/* Informacje o produkcie */}
          <div ref={contentRef} className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-emerald-800 mb-4">{product.name}</h1>
            
            {/* Cena */}
            <div className="mb-6">
              {product.promotion && product.priceBeforePromotion && (
                <span className="text-gray-500 line-through mr-2 text-lg">
                  {product.priceBeforePromotion.toFixed(2)} zł
                </span>
              )}
              <span className={`text-3xl font-semibold ${product.promotion ? 'text-red-600' : 'text-emerald-700'}`}>
                {product.price.toFixed(2)} zł
              </span>
              {product.promotion && (
                <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  PROMOCJA
                </span>
              )}
            </div>

            {/* Opis */}
            <p className="text-emerald-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Wybór ilości */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Ilość:
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-200"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-emerald-800 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Przyciski akcji */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 ${
                  isInCart(product.id) 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
                aria-label="Dodaj do koszyka"
              >
                <ShoppingBagIcon className="h-6 w-6 mr-2" />
                {isAddingToCart ? 'Dodawanie...' : isInCart(product.id) ? 'Dodaj więcej' : 'Dodaj do koszyka'}
              </button>
              <button 
                onClick={handleToggleFavorite}
                className={`p-3 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${isCurrentlyFavorite ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                aria-label={isCurrentlyFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
              >
                {isCurrentlyFavorite ? (
                  <HeartSolidIcon className="h-6 w-6" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}