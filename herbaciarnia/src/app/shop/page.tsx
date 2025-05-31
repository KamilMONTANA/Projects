'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Importy komponentów

import ShopHeader from '@/components/shop/ShopHeader';
import Filters from '@/components/shop/Filters';
import ProductCard from '@/components/products/ProductCard';

// Importy funkcji i typów z bazy danych
import { 
  getAllProducts, 
  filterProducts, 
  getPriceRange, // Zmieniono nazwę importu
  Product 
} from '@/lib/products';

/**
 * Tea shop page
 * Displays list of products with filtering and sorting capabilities
 */
export default function ShopPage() {
  // State for products and filters
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSorting, setSelectedSorting] = useState('popularnosc-desc');
  const [showPromotions, setShowPromotions] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 100]);
  
  // Referencje do elementów DOM dla animacji
  const productsRef = useRef<HTMLDivElement>(null);

  // Initialization effect - fetching products and setting price ranges
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);

    // Set price range based on available products
    const [minPrice, maxPrice] = getPriceRange(); // Poprawiono wywołanie funkcji
    setPriceRange([minPrice, maxPrice]);
    setSelectedPriceRange([minPrice, maxPrice]);

    // Animation for products on first render
    if (productsRef.current) {
      gsap.fromTo(
        productsRef.current.querySelectorAll('.product-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, []);

  // Product filtering effect
  useEffect(() => {
    const filtered: Product[] = filterProducts(getAllProducts(), {
      wyszukiwanie: searchTerm,
      kategoria: selectedCategory,
      pokazPromocje: showPromotions,
      zakresyCen: selectedPriceRange,
      sortowanie: selectedSorting
    });
    
    setProducts(filtered);
    
    // Animation for products after filtering
    if (productsRef.current) {
      gsap.fromTo(
        productsRef.current.querySelectorAll('.product-item'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [searchTerm, selectedCategory, selectedSorting, showPromotions, selectedPriceRange]);

  // Function to reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSorting('popularnosc-desc');
    setShowPromotions(false);
    setSelectedPriceRange(priceRange);
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Nagłówek strony */}
      <ShopHeader />

      {/* Zawartość strony */}
      <div className="max-w-7xl mx-auto py-8 px-6 md:px-12">
        {/* Filtry */}
        <Filters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSorting={selectedSorting}
          setSelectedSorting={setSelectedSorting}
          showPromotions={showPromotions}
          setShowPromotions={setShowPromotions}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          priceRange={priceRange}
          handleResetFilters={handleResetFilters}
        />

        {/* Product list */}
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
          <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No products message */}
        {products.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center mt-8">
            <h2 className="text-xl font-medium text-emerald-800 mb-2">Brak produktów</h2>
            <p className="text-emerald-600">Nie znaleziono produktów spełniających kryteria wyszukiwania.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
              aria-label="Reset filters"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}