'use client';

import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Skontaktuj się z nami</h1>
        <p className="text-lg text-gray-600">Masz pytania? Chętnie na nie odpowiemy!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}