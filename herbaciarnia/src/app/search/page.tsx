'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';

interface FilterOptions {
  category: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
}

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'name-asc', label: 'Nazwa A-Z' },
  { value: 'name-desc', label: 'Nazwa Z-A' },
  { value: 'price-asc', label: 'Cena rosnąco' },
  { value: 'price-desc', label: 'Cena malejąco' },
  { value: 'newest', label: 'Najnowsze' },
  { value: 'popular', label: 'Najpopularniejsze' }
];

const categories = [
  'Herbata czarna',
  'Herbata zielona',
  'Herbata biała',
  'Herbata oolong',
  'Herbata pu-erh',
  'Rooibos',
  'Yerba mate',
  'Herbatki ziołowe',
  'Akcesoria'
];

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    priceRange: [0, 500],
    inStock: false,
    onSale: false
  });
  const products = getAllProducts();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      searchRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      resultsRef.current?.children || [],
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power3.out' 
      }
    );
  }, [searchQuery, sortBy, filters]);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = filters.category.length === 0 || 
      filters.category.includes(product.category);
    
    // Price range filter
    const matchesPrice = product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1];
    
    // Stock filter
    const matchesStock = !filters.inStock || product.inStock;
    
    // Sale filter
    const matchesSale = !filters.onSale || product.isOnSale;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesSale;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      case 'popular':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 500],
      inStock: false,
      onSale: false
    });
  };

  const activeFiltersCount = 
    filters.category.length + 
    (filters.inStock ? 1 : 0) + 
    (filters.onSale ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);

  return (
    <div ref={searchRef} className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj herbat, akcesoriów..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  showFilters || activeFiltersCount > 0
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filtry
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-white text-emerald-600 text-xs rounded-full px-2 py-1">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Search Results Info */}
          <div className="mt-4 text-sm text-gray-600">
            {searchQuery && (
              <p>
                Wyniki wyszukiwania dla: <span className="font-semibold">"{searchQuery}"</span>
              </p>
            )}
            <p className="mt-1">
              Znaleziono {sortedProducts.length} {sortedProducts.length === 1 ? 'produkt' : 'produktów'}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtry</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    Wyczyść
                  </button>
                )}
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Kategoria</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Zakres cen</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [Number(e.target.value), prev.priceRange[1]]
                      }))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      min="0"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], Number(e.target.value)]
                      }))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      min="0"
                    />
                    <span className="text-sm text-gray-500">zł</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)]
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Other Filters */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="mr-2 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">Tylko dostępne</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => setFilters(prev => ({ ...prev, onSale: e.target.checked }))}
                    className="mr-2 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">W promocji</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nie znaleziono produktów
                </h3>
                <p className="text-gray-600 mb-6">
                  Spróbuj zmienić kryteria wyszukiwania lub filtry
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    clearFilters();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
                >
                  Wyczyść wyszukiwanie
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}