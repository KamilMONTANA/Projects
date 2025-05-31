'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartIcon, GlobeAltIcon, SparklesIcon, UsersIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animacja hero sekcji
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Animacje scroll-triggered
    gsap.fromTo(
      storyRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.value-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.team-member',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const values = [
    {
      icon: SparklesIcon,
      title: 'Naturalność',
      description: 'Wszystkie nasze herbaty pochodzą z certyfikowanych plantacji ekologicznych, bez dodatków chemicznych.'
    },
    {
      icon: HeartIcon,
      title: 'Pasja',
      description: 'Każda herbata jest wybierana z miłością i dbałością o najwyższą jakość smaku i aromatu.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Tradycja',
      description: 'Szanujemy wielowiekowe tradycje parzenia herbaty z różnych zakątków świata.'
    },
    {
      icon: UsersIcon,
      title: 'Społeczność',
      description: 'Budujemy społeczność miłośników herbaty, dzieląc się wiedzą i doświadczeniami.'
    }
  ];

  const teamMembers = [
    {
      name: 'Anna Kowalska',
      role: 'Założycielka & Mistrz Herbaty',
      image: '/herbata1.jpg',
      description: 'Z ponad 15-letnim doświadczeniem w branży herbacianej, Anna jest sercem naszej firmy.'
    },
    {
      name: 'Michał Nowak',
      role: 'Ekspert ds. Importu',
      image: '/herbata2.jpg',
      description: 'Michał podróżuje po świecie, aby znaleźć najlepsze herbaty z najdalszych zakątków ziemi.'
    },
    {
      name: 'Katarzyna Wiśniewska',
      role: 'Specjalista ds. Obsługi Klienta',
      image: '/herbata3.jpg',
      description: 'Katarzyna dba o to, aby każdy klient otrzymał najlepsze doradztwo w wyborze herbaty.'
    }
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Hero Section */}
      <div ref={heroRef} className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">O Nas</h1>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            Jesteśmy pasjonatami herbaty, którzy od ponad dekady dzielą się miłością do tego wyjątkowego napoju. 
            Nasza misja to dostarczanie najwyższej jakości herbat z całego świata prosto do Twojego domu.
          </p>
        </div>
      </div>

      {/* Historia Section */}
      <div ref={storyRef} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-emerald-800 mb-6">Nasza Historia</h2>
              <div className="space-y-4 text-emerald-700 leading-relaxed">
                <p>
                  Wszystko zaczęło się w 2010 roku, kiedy nasza założycielka Anna Kowalska, 
                  podczas podróży po Azji, zakochała się w bogactwie smaków i aromatów lokalnych herbat.
                </p>
                <p>
                  Po powrocie do Polski postanowiła podzielić się tym odkryciem z innymi, 
                  tworząc miejsce, gdzie każdy może doświadczyć magii prawdziwej herbaty.
                </p>
                <p>
                  Dziś jesteśmy dumni z tego, że możemy oferować ponad 100 różnych gatunków herbat 
                  z najlepszych plantacji świata, każda starannie wyselekcjonowana i przetestowana.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img 
                src="/herbata4.jpg" 
                alt="Historia herbaciarni" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-emerald-600 text-center italic">
                "Herbata to nie tylko napój, to rytuał, który łączy ludzi i kultury."
              </p>
              <p className="text-emerald-800 text-center font-semibold mt-2">
                - Anna Kowalska, Założycielka
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wartości Section */}
      <div ref={valuesRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-emerald-800 text-center mb-12">Nasze Wartości</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="value-card text-center p-6 bg-emerald-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">{value.title}</h3>
                  <p className="text-emerald-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zespół Section */}
      <div ref={teamRef} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-emerald-800 text-center mb-12">Nasz Zespół</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-emerald-700 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certyfikaty Section */}
      <div className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Certyfikaty i Nagrody</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Certyfikat Bio</h3>
              <p>Wszystkie nasze herbaty ekologiczne posiadają certyfikat Bio zgodny z normami UE.</p>
            </div>
            <div className="bg-emerald-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Fair Trade</h3>
              <p>Współpracujemy tylko z plantacjami, które zapewniają uczciwe warunki pracy.</p>
            </div>
            <div className="bg-emerald-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Nagroda Konsumentów</h3>
              <p>Zdobywca nagrody "Najlepsza Herbaciarnia Roku 2023" w plebiscycie konsumenckim.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}