'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Shop page header component
 * Displays title and description of the shop section
 */
const ShopHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Efekt animacji przy montowaniu komponentu
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div 
      ref={headerRef}
      className="bg-emerald-700 py-12 px-6 md:px-12 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Herbaty</h1>
        <p className="text-emerald-100 text-lg">
          Odkryj naszą bogatą kolekcję herbat premium z całego świata.
        </p>
      </div>
    </div>
  );
};

export default ShopHeader;