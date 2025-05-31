'use client';

import { Product, getAllProducts } from '@/lib/products';
import HeroSection from '@/components/home/HeroSection';
import FavoritesSection from '@/components/home/FavoritesSection';
import AboutUsSection from '@/components/home/AboutUsSection';
import ProductCarousel from '@/components/products/ProductCarousel';

/**
 * Strona główna herbaciarni
 */
export default function Home() {
  const products = getAllProducts();
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Sekcja Hero */}
      <HeroSection />

      {/* Sekcja z karuzelami produktów */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Karuzela ulubionych */}
          <FavoritesSection />
          
          {/* Karuzele produktów */}
          <ProductCarousel title="Polecane dla Ciebie" products={products} />
          <ProductCarousel title="Promocje" products={products.filter(p => p.promotion)} />
        </div>
      </section>

      {/* Sekcja O nas */}
      <AboutUsSection />
    </div>
  );
}
