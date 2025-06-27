'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { CalendarIcon, UserIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';


interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Jak prawidłowo parzyć herbatę zieloną',
    excerpt: 'Poznaj sekrety parzenia idealnej herbaty zielonej. Temperatura wody, czas parzenia i inne wskazówki od ekspertów.',
    content: 'Parzenie herbaty zielonej to sztuka, która wymaga precyzji...',
    author: 'Anna Kowalska',
    date: '2024-01-15',
    readTime: '5 min',
    category: 'Poradniki',
    image: '/herbata1.jpg',
    tags: ['herbata zielona', 'parzenie', 'poradnik']
  },
  {
    id: 2,
    title: 'Historia herbaty Earl Grey',
    excerpt: 'Odkryj fascynującą historię jednej z najpopularniejszych herbat na świecie i poznaj jej unikalne właściwości.',
    content: 'Earl Grey to jedna z najbardziej rozpoznawalnych herbat...',
    author: 'Michał Nowak',
    date: '2024-01-10',
    readTime: '7 min',
    category: 'Historia',
    image: '/herbata2.jpg',
    tags: ['earl grey', 'historia', 'bergamotka']
  },
  {
    id: 3,
    title: 'Właściwości zdrowotne herbaty białej',
    excerpt: 'Herbata biała to prawdziwy skarb natury. Dowiedz się, jakie ma właściwości zdrowotne i dlaczego warto ją pić.',
    content: 'Herbata biała jest najmniej przetworzoną formą herbaty...',
    author: 'Katarzyna Wiśniewska',
    date: '2024-01-05',
    readTime: '6 min',
    category: 'Zdrowie',
    image: '/herbata3.jpg',
    tags: ['herbata biała', 'zdrowie', 'antyoksydanty']
  },
  {
    id: 4,
    title: 'Ceremonia parzenia herbaty w Japonii',
    excerpt: 'Poznaj tradycyjną japońską ceremonię herbaty i jej głębokie znaczenie kulturowe.',
    content: 'Japońska ceremonia herbaty, znana jako chanoyu...',
    author: 'Anna Kowalska',
    date: '2023-12-28',
    readTime: '8 min',
    category: 'Kultura',
    image: '/herbata4.jpg',
    tags: ['japonia', 'ceremonia', 'tradycja']
  },
  {
    id: 5,
    title: 'Najlepsze herbaty na zimę',
    excerpt: 'Rozgrzewające herbaty, które idealnie sprawdzą się w chłodne dni. Nasze rekomendacje na zimową porę.',
    content: 'Zima to czas, kiedy szczególnie cenimy ciepłe napoje...',
    author: 'Michał Nowak',
    date: '2023-12-20',
    readTime: '4 min',
    category: 'Sezonowe',
    image: '/herbata5.jpg',
    tags: ['zima', 'rozgrzewające', 'przyprawy']
  },
  {
    id: 6,
    title: 'Jak przechowywać herbatę',
    excerpt: 'Praktyczne wskazówki dotyczące przechowywania herbaty, aby zachować jej świeżość i aromat na długo.',
    content: 'Właściwe przechowywanie herbaty jest kluczowe...',
    author: 'Katarzyna Wiśniewska',
    date: '2023-12-15',
    readTime: '5 min',
    category: 'Poradniki',
    image: '/herbata1.jpg',
    tags: ['przechowywanie', 'świeżość', 'poradnik']
  }
];

const categories = ['Wszystkie', 'Poradniki', 'Historia', 'Zdrowie', 'Kultura', 'Sezonowe'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const heroRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animacja hero sekcji
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Animacja postów
    gsap.fromTo(
      '.blog-post',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3
      }
    );
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Wszystkie') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }

    // Animacja po filtrowaniu
    gsap.fromTo(
      '.blog-post',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1
      }
    );
  }, [selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Hero Section */}
      <div ref={heroRef} className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Blog Herbaciarni</h1>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            Odkryj świat herbaty razem z nami. Dzielimy się wiedzą, poradnikami i fascynującymi historiami 
            o tym wyjątkowym napoju, który łączy kultury i pokolenia.
          </p>
        </div>
      </div>

      {/* Filtry kategorii */}
      <div className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista postów */}
      <div ref={postsRef} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-post bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col">
                  <div className="h-32 overflow-hidden relative mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto h-12">
                    <div className="flex items-center text-emerald-600 text-sm">
                      <TagIcon className="h-4 w-4 mr-1" />
                      <span>{post.category}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200">
                      Czytaj więcej
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-emerald-600 text-lg">
                Brak postów w wybranej kategorii.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}