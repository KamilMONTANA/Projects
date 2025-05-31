'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

/**
 * Hero Section component with GSAP animations
 */
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations for text content
    const heroContent = heroRef.current?.querySelector('.hero-content');

    
    if (heroContent) {
      gsap.fromTo(
        heroContent.children,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2, 
          delay: 0.3, 
          ease: 'power3.out',
          stagger: 0.2
        }
      );
    }

    // GSAP animation for image
    const heroImage = heroRef.current?.querySelector('.hero-image');

    if (heroImage) {
      gsap.fromTo(
        heroImage,
        {
          opacity: 0,
          scale: 0.98
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out'
        }
      );
    }


    return () => {

    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative py-16 px-6 md:px-12 bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden min-h-screen flex items-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="hero-content space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 leading-tight">
            Odkryj świat wyjątkowych herbat
          </h1>
          <p className="text-lg md:text-xl text-emerald-700 leading-relaxed">
            Herbaty najwyższej jakości z całego świata, starannie wyselekcjonowane dla prawdziwych koneserów.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/shop" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-lg text-lg font-medium transition-all duration-300 inline-block text-center transform hover:scale-105 hover:shadow-lg"
              aria-label="Przejdź do sklepu"
            >
              Odkryj nasze herbaty
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white py-4 px-8 rounded-lg text-lg font-medium transition-all duration-300 inline-block text-center transform hover:scale-105"
              aria-label="Dowiedz się więcej o nas"
            >
              Dowiedz się więcej
            </Link>
          </div>
        </div>
        
        <div className="hero-image relative">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 p-4">
            <Image
              src="/kolekcja-premium-herbat.webp"
              alt="Kolekcja Premium Herbat"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-emerald-300/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-emerald-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 border-2 border-emerald-200/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 border-2 border-emerald-300/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/4 right-1/4 w-12 h-12 border-2 border-emerald-400/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-20 w-10 h-10 border-2 border-emerald-200/50 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
    </section>
  );
};

export default HeroSection;