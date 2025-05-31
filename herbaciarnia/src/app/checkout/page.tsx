'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { CreditCardIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'transfer' | 'paypal';
  deliveryMethod: 'standard' | 'express' | 'pickup';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
};

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    deliveryMethod: 'standard',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const deliveryPrices = {
    standard: 9.99,
    express: 19.99,
    pickup: 0,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Email jest wymagany';
    if (!formData.firstName) newErrors.firstName = 'Imię jest wymagane';
    if (!formData.lastName) newErrors.lastName = 'Nazwisko jest wymagane';
    if (!formData.phone) newErrors.phone = 'Telefon jest wymagany';
    if (!formData.address) newErrors.address = 'Adres jest wymagany';
    if (!formData.city) newErrors.city = 'Miasto jest wymagane';
    if (!formData.postalCode) newErrors.postalCode = 'Kod pocztowy jest wymagany';
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Numer karty jest wymagany';
      if (!formData.expiryDate) newErrors.expiryDate = 'Data ważności jest wymagana';
      if (!formData.cvv) newErrors.cvv = 'CVV jest wymagany';
      if (!formData.cardName) newErrors.cardName = 'Imię na karcie jest wymagane';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Symulacja przetwarzania płatności
    setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 3000);
  };

  const totalPrice = getTotalPrice();
  const deliveryPrice = deliveryPrices[formData.deliveryMethod];
  const finalPrice = totalPrice + deliveryPrice;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-800 mb-8">Koszyk jest pusty</h1>
          <p className="text-gray-600 mb-6">Dodaj produkty do koszyka, aby kontynuować</p>
          <button
            onClick={() => router.push('/shop')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-300"
          >
            Przejdź do sklepu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-emerald-800 mb-8 text-center">Finalizacja zamówienia</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dane kontaktowe */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dane kontaktowe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Imię *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nazwisko *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Adres dostawy */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Adres dostawy</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Ulica i numer *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Miasto *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Kod pocztowy *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Sposób dostawy */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sposób dostawy</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="standard"
                    checked={formData.deliveryMethod === 'standard'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <TruckIcon className="h-5 w-5 mr-3 text-emerald-600" />
                  <div className="flex-1">
                    <div className="font-medium">Dostawa standardowa (3-5 dni)</div>
                    <div className="text-sm text-gray-600">9.99 zł</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="express"
                    checked={formData.deliveryMethod === 'express'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <TruckIcon className="h-5 w-5 mr-3 text-emerald-600" />
                  <div className="flex-1">
                    <div className="font-medium">Dostawa ekspresowa (1-2 dni)</div>
                    <div className="text-sm text-gray-600">19.99 zł</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === 'pickup'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <TruckIcon className="h-5 w-5 mr-3 text-emerald-600" />
                  <div className="flex-1">
                    <div className="font-medium">Odbiór osobisty</div>
                    <div className="text-sm text-gray-600">Bezpłatnie</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Sposób płatności */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sposób płatności</h2>
              <div className="space-y-3 mb-4">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <CreditCardIcon className="h-5 w-5 mr-3 text-emerald-600" />
                  <span className="font-medium">Karta płatnicza</span>
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <ShieldCheckIcon className="h-5 w-5 mr-3 text-emerald-600" />
                  <span className="font-medium">Przelew bankowy</span>
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <CreditCardIcon className="h-5 w-5 mr-3 text-emerald-600" />
                  <span className="font-medium">PayPal</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Imię i nazwisko na karcie *
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Numer karty *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Data ważności *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/RR"
                        className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={`w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isProcessing ? 'Przetwarzanie...' : `Zapłać ${finalPrice.toFixed(2)} zł`}
            </button>
          </form>
        </div>

        {/* Podsumowanie zamówienia */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Podsumowanie zamówienia</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">Ilość: {item.quantity}</p>
                    <p className="text-sm font-medium text-emerald-600">
                      {(item.product.price * item.quantity).toFixed(2)} zł
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Produkty:</span>
                <span>{totalPrice.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Dostawa:</span>
                <span>{deliveryPrice.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Łącznie:</span>
                <span className="text-emerald-600">{finalPrice.toFixed(2)} zł</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}