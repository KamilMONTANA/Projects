'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { CalendarIcon, UserIcon, ClockIcon, ArrowLeftIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';


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
  fullContent: string;
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
    tags: ['herbata zielona', 'parzenie', 'poradnik'],
    fullContent: `
      <h2>Wprowadzenie</h2>
      <p>Herbata zielona to jeden z najzdrowszych napojów na świecie, ale aby w pełni wykorzystać jej potencjał, musimy wiedzieć, jak ją prawidłowo parzyć. Nieprawidłowe parzenie może sprawić, że herbata stanie się gorzka i straci swoje cenne właściwości.</p>
      
      <h2>Temperatura wody</h2>
      <p>Najważniejszym czynnikiem przy parzeniu herbaty zielonej jest temperatura wody. Nigdy nie używaj wrzącej wody! Idealna temperatura to:</p>
      <ul>
        <li><strong>70-80°C</strong> - dla delikatnych herbat zielonych</li>
        <li><strong>80-85°C</strong> - dla mocniejszych gatunków</li>
        <li><strong>60-70°C</strong> - dla najwyższej jakości herbat premium</li>
      </ul>
      
      <h2>Czas parzenia</h2>
      <p>Czas parzenia jest równie ważny jak temperatura:</p>
      <ul>
        <li><strong>1-2 minuty</strong> - pierwsze parzenie</li>
        <li><strong>2-3 minuty</strong> - drugie parzenie</li>
        <li><strong>3-4 minuty</strong> - trzecie parzenie</li>
      </ul>
      
      <h2>Proporcje</h2>
      <p>Używaj około 1 łyżeczki suchej herbaty na 200ml wody. Dla mocniejszego smaku możesz zwiększyć ilość herbaty, ale nie wydłużaj czasu parzenia.</p>
      
      <h2>Wielokrotne parzenie</h2>
      <p>Wysokiej jakości herbaty zielone można parzyć nawet 3-5 razy. Każde parzenie ujawnia inne nuty smakowe i aromatyczne.</p>
      
      <h2>Podsumowanie</h2>
      <p>Pamiętaj: cierpliwość i precyzja to klucz do idealnej herbaty zielonej. Eksperymentuj z temperaturą i czasem, aby znaleźć swój idealny smak.</p>
    `
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
    tags: ['earl grey', 'historia', 'bergamotka'],
    fullContent: `
      <h2>Pochodzenie nazwy</h2>
      <p>Earl Grey zawdzięcza swoją nazwę Charles'owi Grey, 2. hrabiemu Grey, który był premierem Wielkiej Brytanii w latach 1830-1834. Legenda głosi, że mieszanka została stworzona specjalnie dla niego przez chińskiego mandaryna jako podziękowanie za uratowanie jego syna.</p>
      
      <h2>Charakterystyczny aromat</h2>
      <p>Unikalny smak Earl Grey pochodzi od olejku bergamotowego, otrzymywanego ze skórki bergamotki - cytrusu rosnącego głównie w południowych Włoszech. Ten olejek nadaje herbacie charakterystyczny, cytrusowy aromat.</p>
      
      <h2>Ewolucja receptury</h2>
      <p>Pierwotnie Earl Grey był mieszanką herbat czarnych z Chin i Indii. Dziś istnieje wiele wariantów:</p>
      <ul>
        <li><strong>Klasyczny Earl Grey</strong> - czarna herbata z bergamotką</li>
        <li><strong>Earl Grey Green</strong> - zielona herbata z bergamotką</li>
        <li><strong>Lady Grey</strong> - delikatniejsza wersja z dodatkiem skórki pomarańczy i cytryny</li>
        <li><strong>Earl Grey Blue Flower</strong> - z dodatkiem płatków bławatka</li>
      </ul>
      
      <h2>Właściwości zdrowotne</h2>
      <p>Earl Grey łączy w sobie właściwości herbaty czarnej z korzyściami płynącymi z bergamotki:</p>
      <ul>
        <li>Wysoka zawartość antyoksydantów</li>
        <li>Wspomaga trawienie</li>
        <li>Ma właściwości relaksujące</li>
        <li>Może pomagać w obniżaniu cholesterolu</li>
      </ul>
      
      <h2>Jak parzyć Earl Grey</h2>
      <p>Earl Grey najlepiej parzyć wodą o temperaturze 95-100°C przez 3-5 minut. Można go pić z mlekiem i cukrem lub samego, z plasterkiem cytryny.</p>
    `
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
    tags: ['herbata biała', 'zdrowie', 'antyoksydanty'],
    fullContent: `
      <h2>Co to jest herbata biała?</h2>
      <p>Herbata biała to najmniej przetworzona forma herbaty, otrzymywana z młodych pąków i liści krzewu herbacianego. Nazwa pochodzi od srebrzysto-białych włosków pokrywających młode pąki.</p>
      
      <h2>Proces produkcji</h2>
      <p>Herbata biała przechodzi minimalną obróbkę:</p>
      <ol>
        <li>Zbiór młodych pąków i liści</li>
        <li>Naturalne więdnięcie na słońcu</li>
        <li>Delikatne suszenie</li>
      </ol>
      <p>Brak fermentacji i minimalnej obróbki sprawia, że zachowuje maksimum naturalnych składników.</p>
      
      <h2>Właściwości zdrowotne</h2>
      <h3>Antyoksydanty</h3>
      <p>Herbata biała zawiera najwyższą koncentrację antyoksydantów spośród wszystkich rodzajów herbat. Główne to:</p>
      <ul>
        <li><strong>Katechiny</strong> - chronią przed chorobami serca</li>
        <li><strong>EGCG</strong> - ma właściwości przeciwnowotworowe</li>
        <li><strong>Polifenole</strong> - spowalniają procesy starzenia</li>
      </ul>
      
      <h3>Wpływ na zdrowie</h3>
      <ul>
        <li><strong>Wzmacnia odporność</strong> - dzięki wysokiej zawartości witaminy C</li>
        <li><strong>Chroni skórę</strong> - antyoksydanty chronią przed szkodliwym działaniem UV</li>
        <li><strong>Wspomaga serce</strong> - może obniżać ciśnienie krwi</li>
        <li><strong>Pomaga w odchudzaniu</strong> - przyspiesza metabolizm</li>
        <li><strong>Ma właściwości antybakteryjne</strong> - chroni przed infekcjami</li>
      </ul>
      
      <h2>Jak parzyć herbatę białą</h2>
      <p>Herbata biała wymaga delikatnego traktowania:</p>
      <ul>
        <li><strong>Temperatura:</strong> 70-80°C</li>
        <li><strong>Czas:</strong> 2-4 minuty</li>
        <li><strong>Proporcje:</strong> 1 łyżeczka na 200ml wody</li>
      </ul>
      
      <h2>Najlepsze gatunki</h2>
      <ul>
        <li><strong>Bai Hao Yin Zhen</strong> (Silver Needle) - najwyższej jakości</li>
        <li><strong>Bai Mu Dan</strong> (White Peony) - bardziej dostępny</li>
        <li><strong>Shou Mei</strong> - mocniejszy w smaku</li>
      </ul>
    `
  }
];

export default function BlogPostPage() {
  const { id } = useParams();
  const postId = parseInt(id as string);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
      setLikes(Math.floor(Math.random() * 50) + 10); // Symulacja liczby polubień
    }
  }, [postId]);

  useEffect(() => {
    if (post) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );
    }
  }, [post]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link skopiowany do schowka!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4">Artykuł nie znaleziony</h1>
          <p className="text-emerald-600 mb-6">Przepraszamy, ale artykuł o podanym ID nie istnieje.</p>
          <Link 
            href="/blog"
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition-colors duration-300 inline-flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Powrót do bloga
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative">
        <div className="h-96 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative max-w-4xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <Link 
                href="/blog"
                className="inline-flex items-center text-emerald-200 hover:text-white transition-colors duration-300 mb-4"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Powrót do bloga
              </Link>
              <div className="mb-4">
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <p className="text-xl text-emerald-100 mb-6">{post.excerpt}</p>
              
              <div className="flex items-center text-emerald-200 space-x-6">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Social Actions */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300 ${
                      isLiked 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="h-5 w-5" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                    <span>{likes}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                  >
                    <ShareIcon className="h-5 w-5" />
                    <span>Udostępnij</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              <div 
                className="prose prose-emerald max-w-none"
                dangerouslySetInnerHTML={{ __html: post.fullContent }}
                style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#047857'
                }}
              />
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">Powiązane artykuły</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-emerald-800 mb-2">{relatedPost.title}</h3>
                        <p className="text-emerald-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}