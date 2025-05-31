'use client';

import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { categoryOptions, sortingOptions } from '@/lib/products';

/**
 * Interfejs właściwości komponentu Filters
 */
interface FiltersProps {
  wyszukiwanie: string;
  setWyszukiwanie: (value: string) => void;
  wybranaKategoria: string;
  setWybranaKategoria: (value: string) => void;
  wybraneSortowanie: string;
  setWybraneSortowanie: (value: string) => void;
  pokazPromocje: boolean;
  setPokazPromocje: (value: boolean) => void;
  filtrowanaCena: [number, number];
  setFiltrowanaCena: (value: [number, number]) => void;
  zakresyCen: [number, number];
  handleResetujFiltry: () => void;
}

/**
 * Filters component for the shop page
 * Enables filtering products by category, price and search
 * Also includes sorting options
 */
const Filters = ({
  wyszukiwanie,
  setWyszukiwanie,
  wybranaKategoria,
  setWybranaKategoria,
  wybraneSortowanie,
  setWybraneSortowanie,
  pokazPromocje,
  setPokazPromocje,
  filtrowanaCena,
  setFiltrowanaCena,
  zakresyCen,
  handleResetujFiltry
}: FiltersProps) => {
  const [pokazFiltry, setPokazFiltry] = useState(false);

  const handleZmianaCeny = (wartosci: [number, number]) => {
    setFiltrowanaCena(wartosci);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="relative flex-grow mb-4 md:mb-0">
          <input
            type="text"
            value={wyszukiwanie}
            onChange={(e) => setWyszukiwanie(e.target.value)}
            placeholder="Szukaj herbaty..."
            className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            aria-label="Search products"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-emerald-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPokazFiltry(!pokazFiltry)}
            className="flex items-center px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-md transition-colors duration-300"
            aria-expanded={pokazFiltry}
            aria-controls="panel-filtrow"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filtry
          </button>
          <div className="relative inline-block text-left">
            <select
              value={wybraneSortowanie}
              onChange={(e) => setWybraneSortowanie(e.target.value)}
              className="appearance-none bg-emerald-100 text-emerald-800 px-4 py-2 pr-8 rounded-md hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
              aria-label="Sort products"
            >
              {sortingOptions.map((opcja) => (
                <option key={opcja.id} value={opcja.id}>
                  {opcja.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-emerald-800">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Panel filtrów */}
      {pokazFiltry && (
        <div 
          id="panel-filtrow"
          className="mt-6 pt-6 border-t border-emerald-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filtr kategorii */}
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-3">Kategorie</h3>
              <div className="space-y-2">
                {categoryOptions.map((kategoria) => (
                  <label key={kategoria.id} className="flex items-center">
                    <input
                      type="radio"
                      name="kategoria"
                      value={kategoria.id}
                      checked={wybranaKategoria === kategoria.id}
                      onChange={() => setWybranaKategoria(kategoria.id)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-emerald-700">{kategoria.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtr ceny */}
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-3">Cena</h3>
              <div className="px-2">
                <div className="flex justify-between mb-2">
                  <span className="text-emerald-700">{filtrowanaCena[0]} zł</span>
                  <span className="text-emerald-700">{filtrowanaCena[1]} zł</span>
                </div>
                <input
                  type="range"
                  min={zakresyCen[0]}
                  max={zakresyCen[1]}
                  value={filtrowanaCena[0]}
                  onChange={(e) => handleZmianaCeny([parseInt(e.target.value), filtrowanaCena[1]])}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                  aria-label="Minimalna cena"
                />
                <input
                  type="range"
                  min={zakresyCen[0]}
                  max={zakresyCen[1]}
                  value={filtrowanaCena[1]}
                  onChange={(e) => handleZmianaCeny([filtrowanaCena[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer mt-4"
                  aria-label="Maksymalna cena"
                />
              </div>
            </div>

            {/* Inne filtry */}
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-3">Inne filtry</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pokazPromocje}
                    onChange={() => setPokazPromocje(!pokazPromocje)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-emerald-700">Tylko promocje</span>
                </label>
              </div>
              <button
                onClick={handleResetujFiltry}
                className="mt-6 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md transition-colors duration-300"
                aria-label="Reset all filters"
              >
                Resetuj filtry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;