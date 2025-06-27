'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  EnvelopeIcon,
  CheckCircleIcon,
  SparklesIcon,
  GiftIcon,
  NewspaperIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface NewsletterFormData {
  email: string;
  firstName: string;
  preferences: string[];
}

const newsletterBenefits = [
  {
    icon: SparklesIcon,
    title: 'Ekskluzywne promocje',
    description: 'Otrzymuj specjalne zniżki dostępne tylko dla subskrybentów'
  },
  {
    icon: GiftIcon,
    title: 'Darmowe próbki',
    description: 'Testuj nowe herbaty przed ich oficjalną premierą'
  },
  {
    icon: NewspaperIcon,
    title: 'Porady ekspertów',
    description: 'Dowiedz się więcej o świecie herbaty od naszych specjalistów'
  },
  {
    icon: BellIcon,
    title: 'Pierwsze informacje',
    description: 'Bądź pierwszy, który dowie się o nowościach i wydarzeniach'
  }
];

const preferenceOptions = [
  { id: 'new-products', label: 'Nowe produkty' },
  { id: 'promotions', label: 'Promocje i wyprzedaże' },
  { id: 'tea-tips', label: 'Porady o herbacie' },
  { id: 'recipes', label: 'Przepisy i inspiracje' },
  { id: 'events', label: 'Wydarzenia i warsztaty' },
  { id: 'seasonal', label: 'Oferty sezonowe' }
];

export default function NewsletterPage() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: '',
    firstName: '',
    preferences: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      benefitsRef.current?.children || [],
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power3.out' 
      },
      '-=0.5'
    )
    .fromTo(
      formRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );
  }, []);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Podaj prawidłowy adres email';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Animate success state
    gsap.fromTo(
      '.success-animation',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  };

  const handlePreferenceChange = (preferenceId: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preferenceId)
        ? prev.preferences.filter(p => p !== preferenceId)
        : [...prev.preferences, preferenceId]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center success-animation">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Dziękujemy za subskrypcję!
            </h2>
            <p className="text-gray-600 mb-6">
              Witaj w naszej społeczności miłośników herbaty! Sprawdź swoją skrzynkę email - wysłaliśmy Ci potwierdzenie subskrypcji.
            </p>
            <div className="bg-emerald-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-emerald-700">
                <strong>Bonus powitalny:</strong> Użyj kodu <span className="font-mono bg-emerald-100 px-2 py-1 rounded">WELCOME10</span> i otrzymaj 10% zniżki na pierwsze zamówienie!
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Wróć do sklepu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Hero Section */}
      <div ref={heroRef} className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
            <EnvelopeIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dołącz do naszego
            <span className="text-emerald-600 block">Newslettera</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Odkryj świat herbaty razem z nami. Otrzymuj ekskluzywne oferty, porady ekspertów i bądź na bieżąco z nowościami.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Co zyskujesz dołączając do nas?
          </h2>
          <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsletterBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
                    <IconComponent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter Form */}
      <div className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Zapisz się już dziś
              </h2>
              <p className="text-gray-600">
                Wypełnij formularz i dołącz do tysięcy zadowolonych subskrybentów
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name Field */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                  Imię *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white text-gray-900 placeholder-gray-600"
                  placeholder="Twoje imię"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white text-gray-900 placeholder-gray-600"
                  placeholder="Twój adres email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Jakie treści Cię interesują? (opcjonalne)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {preferenceOptions.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferences.includes(option.id)}
                        onChange={() => handlePreferenceChange(option.id)}
                        className="mr-3 text-emerald-600 focus:ring-emerald-500 rounded"
                      />
                      <span className="text-sm text-gray-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600">
                  Zapisując się do newslettera, wyrażasz zgodę na przetwarzanie danych osobowych w celu wysyłania informacji marketingowych. 
                  Możesz w każdej chwili zrezygnować z subskrypcji. 
                  <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
                    Polityka prywatności
                  </a>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Zapisywanie...
                  </div>
                ) : (
                  'Zapisz się do newslettera'
                )}
              </button>
            </form>

            {/* Social Proof */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Dołącz do <span className="font-semibold text-emerald-600">5,000+</span> zadowolonych subskrybentów
              </p>
              <div className="flex justify-center items-center mt-2 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-xs text-gray-500">4.9/5 średnia ocena</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}