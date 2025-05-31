'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Type for Product
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  promotion: boolean;
  priceBeforePromotion?: number;
  description?: string; // Dodane opcjonalne pole
  availability?: boolean; // Dodane opcjonalne pole
  popularity?: number; // Dodane opcjonalne pole
  lowestPrice30Days?: number;
};

// Type for Favorites Context
type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
};

// Utworzenie kontekstu z wartością domyślną
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

// Provider for the favorites context
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() => {
    // Initialize state from localStorage
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favoriteProducts');
      if (storedFavorites) {
        try {
          setFavoriteProducts
          const parsedFavorites: Product[] = JSON.parse(storedFavorites);
          // Basic validation to ensure it's an array of products
          if (Array.isArray(parsedFavorites) && parsedFavorites.every(p => p && typeof p.id === 'number' && typeof p.name === 'string')) {
            return parsedFavorites;
          }
          console.warn('Invalid data in localStorage for favoriteProducts, resetting.');
          return []; // Return empty if validation fails or data is not as expected
        } catch (e) {
          console.error('Failed to parse favorites from localStorage', e);
          return []; // Return empty array on error
        }
      }
      return [];
    }
    return [];
  });

  // Saving favorites to localStorage on every change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  // Adding a product to favorites
  const addToFavorites = (product: Product) => {
    setFavoriteProducts((prev) => {
      // Check if the product already exists in favorites
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  // Removing a product from favorites
  const removeFromFavorites = (productId: number) => {
    setFavoriteProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  // Checking if a product is in favorites
  const isFavorite = (productId: number) => {
    return favoriteProducts.some((product) => product.id === productId);
  };

  // Context value
  const value = {
    favorites: favoriteProducts,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

<p className="text-emerald-600">Nie znaleziono produktów spełniających kryteria wyszukiwania.</p>