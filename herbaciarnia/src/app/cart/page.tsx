'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Tutaj będzie logika przekierowania do płatności
    setTimeout(() => {
      setIsCheckingOut(false);
      // Przekierowanie do strony płatności
      window.location.href = '/checkout';
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-800 mb-8">Koszyk zakupowy</h1>
          <div className="bg-white p-12 rounded-lg shadow-md">
            <div className="text-gray-500 mb-6">
              <svg className="mx-auto h-24 w-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Twój koszyk jest pusty</h2>
              <p className="text-gray-600">Dodaj produkty do koszyka, aby kontynuować zakupy</p>
            </div>
            <Link 
              href="/shop" 
              className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-300"
            >
              Przejdź do sklepu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-emerald-800">Koszyk zakupowy</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 transition-colors duration-300 flex items-center"
        >
          <TrashIcon className="h-5 w-5 mr-2" />
          Wyczyść koszyk
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-24 h-24 relative">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            <Link href={`/product/${item.product.id}`} className="hover:text-emerald-600">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{item.product.category}</p>
                          <div className="flex items-center mt-2">
                            {item.product.promotion ? (
                              <>
                                <span className="text-lg font-bold text-emerald-600">
                                  {item.product.price.toFixed(2)} zł
                                </span>
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  {item.product.priceBeforePromotion?.toFixed(2)} zł
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">
                                {item.product.price.toFixed(2)} zł
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors duration-200"
                              aria-label="Zmniejsz ilość"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors duration-200"
                              aria-label="Zwiększ ilość"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-300 p-2"
                            aria-label="Usuń z koszyka"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Podsumowanie zamówienia</h2>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900">
                    {(item.product.price * item.quantity).toFixed(2)} zł
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Łącznie:</span>
                <span className="text-emerald-600">{getTotalPrice().toFixed(2)} zł</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isCheckingOut ? 'Przekierowywanie...' : 'Przejdź do płatności'}
            </button>
            
            <Link 
              href="/shop" 
              className="block w-full text-center text-emerald-600 hover:text-emerald-800 mt-4 transition-colors duration-300"
            >
              Kontynuuj zakupy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}