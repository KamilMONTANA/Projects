'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  CogIcon,
  PencilIcon,
  EyeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CartContext';
import { useFavorites } from '@/app/context/FavoritesContext';
import { getAllProducts } from '@/lib/products';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

const mockUser: UserProfile = {
  id: 'user-001',
  firstName: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@example.com',
  phone: '+48 123 456 789',
  address: {
    street: 'ul. Herbaciana 15/3',
    city: 'Warszawa',
    postalCode: '00-001',
    country: 'Polska'
  },
  joinDate: '2023-06-15',
  totalOrders: 12,
  totalSpent: 1247.50
};

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 89.99,
    items: [
      {
        productId: '1',
        name: 'Earl Grey Premium',
        price: 45.00,
        quantity: 1,
        image: '/images/earl-grey.jpg'
      },
      {
        productId: '2',
        name: 'Zielona Sencha',
        price: 44.99,
        quantity: 1,
        image: '/images/sencha.jpg'
      }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'shipped',
    total: 156.50,
    items: [
      {
        productId: '3',
        name: 'Oolong Formosa',
        price: 78.25,
        quantity: 2,
        image: '/images/oolong.jpg'
      }
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'processing',
    total: 234.75,
    items: [
      {
        productId: '4',
        name: 'Pu-erh Aged',
        price: 89.00,
        quantity: 1,
        image: '/images/puerh.jpg'
      },
      {
        productId: '5',
        name: 'Jasmine Phoenix Pearls',
        price: 145.75,
        quantity: 1,
        image: '/images/jasmine.jpg'
      }
    ]
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);
  
  const { favorites } = useFavorites();
  const profileRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      profileRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, [activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Oczekujące';
      case 'processing': return 'Przetwarzane';
      case 'shipped': return 'Wysłane';
      case 'delivered': return 'Dostarczone';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  const handleSaveProfile = () => {
    setUser(editForm);
    setIsEditing(false);
    // Here you would typically send the data to your API
  };

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-20 w-20 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Członek od {formatDate(user.joinDate)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            {isEditing ? 'Anuluj' : 'Edytuj profil'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{user.totalOrders}</div>
            <div className="text-sm text-gray-600">Zamówień</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{user.totalSpent.toFixed(2)} zł</div>
            <div className="text-sm text-gray-600">Wydano łącznie</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{favorites.length}</div>
            <div className="text-sm text-gray-600">Ulubionych</div>
          </div>
        </div>

        {/* Profile Form */}
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imię
                </label>
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwisko
                </label>
                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adres
              </label>
              <input
                type="text"
                value={editForm.address.street}
                onChange={(e) => setEditForm({
                  ...editForm, 
                  address: {...editForm.address, street: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                placeholder="Ulica i numer"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={editForm.address.city}
                  onChange={(e) => setEditForm({
                    ...editForm, 
                    address: {...editForm.address, city: e.target.value}
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Miasto"
                />
                <input
                  type="text"
                  value={editForm.address.postalCode}
                  onChange={(e) => setEditForm({
                    ...editForm, 
                    address: {...editForm.address, postalCode: e.target.value}
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Kod pocztowy"
                />
                <input
                  type="text"
                  value={editForm.address.country}
                  onChange={(e) => setEditForm({
                    ...editForm, 
                    address: {...editForm.address, country: e.target.value}
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Kraj"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSaveProfile}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md"
              >
                Zapisz zmiany
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(user);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md"
              >
                Anuluj
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user.phone}</span>
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div className="text-gray-900">
                    <div>{user.address.street}</div>
                    <div>{user.address.postalCode} {user.address.city}</div>
                    <div>{user.address.country}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Historia zamówień</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Zamówienie {order.id}</h3>
                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{order.total.toFixed(2)} zł</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Ilość: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} zł
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Zobacz szczegóły
                </button>
                {order.status === 'delivered' && (
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Zamów ponownie
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ulubione produkty</h2>
        </div>
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-emerald-600 font-semibold mb-3">{product.price.toFixed(2)} zł</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md text-sm">
                    Dodaj do koszyka
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-2">
                    <HeartIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Brak ulubionych produktów</h3>
            <p className="text-gray-500">Dodaj produkty do ulubionych, aby je tutaj zobaczyć.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div ref={profileRef} className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6 mr-8 h-fit">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'profile' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <UserIcon className="h-5 w-5 inline mr-3" />
                Profil
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'orders' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBagIcon className="h-5 w-5 inline mr-3" />
                Zamówienia
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'favorites' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HeartIcon className="h-5 w-5 inline mr-3" />
                Ulubione
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'settings' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CogIcon className="h-5 w-5 inline mr-3" />
                Ustawienia
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="flex-1">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'favorites' && renderFavorites()}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ustawienia konta</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Powiadomienia</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Powiadomienia o zamówieniach
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Newsletter z nowościami
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Promocje i oferty specjalne
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Bezpieczeństwo</h3>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md">
                      Zmień hasło
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Konto</h3>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                      Usuń konto
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}