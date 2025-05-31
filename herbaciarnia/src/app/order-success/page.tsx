'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, TruckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';

export default function OrderSuccessPage() {
  useEffect(() => {
    // Animacja potwierdzenia
    gsap.fromTo(
      '.success-icon',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
    );
    
    gsap.fromTo(
      '.success-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="success-icon mb-8">
          <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto" />
        </div>
        
        <div className="success-content">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dziękujemy za zamówienie!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Twoje zamówienie zostało pomyślnie złożone i jest obecnie przetwarzane.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Szczegóły zamówienia</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <EnvelopeIcon className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Potwierdzenie email</h3>
                <p className="text-sm text-gray-600">
                  Wysłaliśmy potwierdzenie zamówienia na Twój adres email
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <TruckIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Czas dostawy</h3>
                <p className="text-sm text-gray-600">
                  Twoje zamówienie zostanie dostarczone w ciągu 3-5 dni roboczych
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <CheckCircleIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Status zamówienia</h3>
                <p className="text-sm text-gray-600">
                  Możesz śledzić status swojego zamówienia w panelu klienta
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">
              Numer zamówienia: #HRB{Math.floor(Math.random() * 100000)}
            </h3>
            <p className="text-emerald-700">
              Zachowaj ten numer do śledzenia statusu zamówienia
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/shop" 
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-300"
            >
              Kontynuuj zakupy
            </Link>
            <Link 
              href="/" 
              className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              Powrót do strony głównej
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Potrzebujesz pomocy?
            </h3>
            <p className="text-gray-600 mb-4">
              Jeśli masz pytania dotyczące zamówienia, skontaktuj się z nami:
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> kontakt@herbaciarnia.pl
              </p>
              <p className="text-gray-700">
                <strong>Telefon:</strong> +48 123 456 789
              </p>
              <p className="text-gray-700">
                <strong>Godziny pracy:</strong> Pon-Pt 9:00-17:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}