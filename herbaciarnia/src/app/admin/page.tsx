'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { getAllProducts } from '@/lib/products';

interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  items: number;
}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Jan Kowalski',
    email: 'jan@example.com',
    total: 89.99,
    status: 'pending',
    date: '2024-01-15',
    items: 3
  },
  {
    id: 'ORD-002',
    customerName: 'Anna Nowak',
    email: 'anna@example.com',
    total: 156.50,
    status: 'processing',
    date: '2024-01-14',
    items: 5
  },
  {
    id: 'ORD-003',
    customerName: 'Piotr Wiśniewski',
    email: 'piotr@example.com',
    total: 45.00,
    status: 'shipped',
    date: '2024-01-13',
    items: 2
  },
  {
    id: 'ORD-004',
    customerName: 'Maria Kowalczyk',
    email: 'maria@example.com',
    total: 234.75,
    status: 'delivered',
    date: '2024-01-12',
    items: 8
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
    totalCustomers: 156,
    totalProducts: products.length
  });
  
  const dashboardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      dashboardRef.current,
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

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Zamówienia</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Przychody</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalRevenue.toFixed(2)} zł</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <UsersIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Klienci</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCustomers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-emerald-500 p-3 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Produkty</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ostatnie zamówienia</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Zamówienia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kwota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.total.toFixed(2)} zł
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Zarządzanie zamówieniami</h2>
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option value="all">Wszystkie statusy</option>
              <option value="pending">Oczekujące</option>
              <option value="processing">Przetwarzane</option>
              <option value="shipped">Wysłane</option>
              <option value="delivered">Dostarczone</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Klient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produkty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kwota
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.items} produktów
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.total.toFixed(2)} zł
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={order.status}
                    onChange={(e) => {
                      const newOrders = orders.map(o => 
                        o.id === order.id ? { ...o, status: e.target.value as Order['status'] } : o
                      );
                      setOrders(newOrders);
                    }}
                    className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(order.status)}`}
                  >
                    <option value="pending">Oczekujące</option>
                    <option value="processing">Przetwarzane</option>
                    <option value="shipped">Wysłane</option>
                    <option value="delivered">Dostarczone</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-900">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Zarządzanie produktami</h2>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            Dodaj produkt
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produkt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cena
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.slice(0, 10).map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">ID: {product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.price.toFixed(2)} zł
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Dostępny
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-900">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Panel Administracyjny</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Witaj, Admin</span>
              <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6 mr-8">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 inline mr-3" />
                Dashboard
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
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'products' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CurrencyDollarIcon className="h-5 w-5 inline mr-3" />
                Produkty
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'customers' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <UsersIcon className="h-5 w-5 inline mr-3" />
                Klienci
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'customers' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Zarządzanie klientami</h2>
                <p className="text-gray-600">Funkcjonalność w przygotowaniu...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}