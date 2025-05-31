import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Dane kontaktowe</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPinIcon className="h-6 w-6 text-emerald-600 mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Adres</h3>
              <p className="text-gray-600">ul. Herbaciana 123<br />00-001 Warszawa</p>
            </div>
          </div>

          <div className="flex items-start">
            <EnvelopeIcon className="h-6 w-6 text-emerald-600 mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">kontakt@herbaciarnia.pl</p>
            </div>
          </div>

          <div className="flex items-start">
            <PhoneIcon className="h-6 w-6 text-emerald-600 mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Telefon</h3>
              <p className="text-gray-600">+48 123 456 789</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Godziny otwarcia</h2>
        <div className="space-y-2 text-gray-600">
          <p>Poniedziałek - Piątek: 9:00 - 18:00</p>
          <p>Sobota: 10:00 - 16:00</p>
          <p>Niedziela: Zamknięte</p>
        </div>
      </div>
    </div>
  );
};