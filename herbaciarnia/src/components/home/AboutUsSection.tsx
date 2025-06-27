'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Komponent sekcji "O nas" dla strony głównej
 */
export default function AboutUsSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-emerald-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6">O nas</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/herbaciarnia.webp"
              alt="Wnętrze herbaciarni"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-lg text-emerald-700 leading-relaxed mb-4">
              Jesteśmy pasjonatami herbaty, którzy chcą dzielić się miłością do tego niezwykłego napoju. W naszej ofercie znajdziesz starannie wyselekcjonowane herbaty z całego świata, od klasycznych czarnych i zielonych, przez egzotyczne oolongi i pu-erhy, po aromatyczne mieszanki ziołowe i owocowe.
            </p>
            <p className="text-lg text-emerald-700 leading-relaxed mb-4">
              Dbamy o najwyższą jakość naszych produktów, współpracując bezpośrednio z plantatorami i wybierając tylko najlepsze liście. Naszym celem jest zapewnienie Ci niezapomnianych doznań smakowych i zapachowych, które sprawią, że każda filiżanka herbaty stanie się wyjątkowym momentem relaksu i przyjemności.
            </p>
            <Link 
              href="/about" 
              className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-300 inline-flex items-center"
              aria-label="Dowiedz się więcej o nas"
            >
              Zapraszamy do odkrywania świata herbaty razem z nami!
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Usunięcie zduplikowanego eksportu domyślnego