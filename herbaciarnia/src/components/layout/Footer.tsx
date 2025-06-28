'use client';

import Link from 'next/link';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const footerLinks = {
  shop: [
    { name: 'Wszystkie produkty', href: '' },
    { name: 'Herbata czarna', href: '' },
    { name: 'Herbata zielona', href: '' },
    { name: 'Herbata biała', href: '' },
    { name: 'Akcesoria', href: '' }
  ],
  company: [
    { name: 'O nas', href: '' },
    { name: 'Blog', href: '' },
    { name: 'Kontakt', href: '' },
    { name: 'Newsletter', href: '' },
    { name: 'Kariera', href: '' }
  ],
  customer: [
    { name: 'Mój profil', href: '' },
    { name: 'Historia zamówień', href: '' },
    { name: 'Ulubione', href: '' },
    { name: 'Koszyk', href: '' },
    { name: 'Pomoc', href: '' }
  ],
  legal: [
    { name: 'Regulamin', href: '' },
    { name: 'Polityka prywatności', href: '' },
    { name: 'Polityka cookies', href: '' },
    { name: 'Zwroty i reklamacje', href: '' },
    { name: 'Dostawa i płatność', href: '' }
  ]
};

const socialLinks = [
  {
    name: 'Facebook',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.876-.875-1.366-2.026-1.366-3.323s.49-2.448 1.366-3.323c.875-.876 2.026-1.366 3.323-1.366s2.448.49 3.323 1.366c.876.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  {
    name: 'Twitter',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Zostań na bieżąco z nowościami
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Zapisz się do naszego newslettera i otrzymuj ekskluzywne oferty, porady o herbacie i informacje o nowych produktach.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center bg-white text-emerald-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              Zapisz się do newslettera
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <div className="bg-emerald-600 p-2 rounded-lg mr-3">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold">Herbaciarnia</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Odkryj świat wyjątkowych herbat z całego świata. Od ponad 15 lat dostarczamy najwyższej jakości herbaty prosto do Twojego domu.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">ul. Herbaciana 15, 00-001 Warszawa</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">+48 123 456 789</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">kontakt@herbaciarnia.pl</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">Pn-Pt: 9:00-18:00, Sb: 10:00-16:00</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Sklep</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <span
                    className="text-gray-300 cursor-default"
                  >
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Firma</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <span
                    className="text-gray-300 cursor-default"
                  >
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Klient</h4>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <span
                    className="text-gray-300 cursor-default"
                  >
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social Media & Legal */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <span className="text-gray-300 font-medium">Śledź nas:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {footerLinks.legal.map((link) => (
                <span
                  key={link.name}
                  className="text-sm text-gray-400 cursor-default"
                >
                  {link.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} WebDev13 - Profesjonalne strony internetowe. Wszystkie prawa zastrzeżone.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Sklep internetowy stworzony z pasją do herbaty i najwyższej jakości obsługi klienta.
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
            <div className="flex items-center">
              <div className="bg-green-600 p-2 rounded-full mr-3">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-300">Bezpieczne płatności</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-full mr-3">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                </svg>
              </div>
              <span className="text-sm text-gray-300">Darmowa dostawa od 150 zł</span>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-600 p-2 rounded-full mr-3">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-300">30 dni na zwrot</span>
            </div>
            <div className="flex items-center">
              <div className="bg-orange-600 p-2 rounded-full mr-3">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-300">Pomoc 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}