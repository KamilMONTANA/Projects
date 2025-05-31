import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Herbaciarnia - Najlepsze herbaty świata',
  description: 'Odkryj wyjątkowe smaki herbat z całego świata. Szeroki wybór herbat zielonych, czarnych, białych i ziołowych.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <FavoritesProvider>
          <CartProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
