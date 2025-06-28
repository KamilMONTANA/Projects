// File containing functions for handling the product database

// Type for Product
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  promotion: boolean;
  priceBeforePromotion?: number;
  description: string;
  availability: boolean;
  popularity: number;
  lowestPrice30Days?: number;
};

// Przykładowe dane produktów (w rzeczywistej aplikacji byłyby pobierane z API/bazy danych)
const allProducts: Product[] = [
  {
    id: 1,
    name: 'Zielona herbata Sencha',
    price: 24.99,
    image: '/images/herbata1.jpg',
    category: 'zielona',
    promotion: false,
    description: 'Klasyczna japońska zielona herbata o świeżym, trawiastym aromacie i łagodnym smaku.',
    availability: true,
    popularity: 4.5,
    lowestPrice30Days: 22.50,
  },
  {
    id: 2,
    name: 'Czarna herbata Earl Grey',
    price: 19.99,
    image: '/images/herbata2.jpg',
    category: 'czarna',
    promotion: false,
    description: 'Aromatyczna czarna herbata z dodatkiem olejku bergamotowego, idealna na popołudnie.',
    availability: true,
    popularity: 4.8,
    lowestPrice30Days: 18.00,
  },
  {
    id: 3,
    name: 'Biała herbata Silver Needle',
    price: 29.99,
    image: '/images/herbata3.jpg',
    category: 'biała',
    promotion: true,
    priceBeforePromotion: 39.99,
    description: 'Ekskluzywna biała herbata składająca się z młodych pączków, o subtelnym, słodkawym smaku.',
    availability: true,
    popularity: 4.2,
    lowestPrice30Days: 28.00,
  },
  {
    id: 4,
    name: 'Herbata Oolong',
    price: 27.99,
    image: '/images/herbata4.jpg',
    category: 'oolong',
    promotion: false,
    description: 'Półfermentowana herbata o złożonym smaku, łącząca cechy herbat zielonych i czarnych.',
    availability: true,
    popularity: 4.0,
    lowestPrice30Days: 25.00,
  },
  {
    id: 5,
    name: 'Herbata Rooibos',
    price: 22.99,
    image: '/images/herbata5.jpg',
    category: 'ziołowa',
    promotion: true,
    priceBeforePromotion: 29.99,
    description: 'Bezkofeinowa czerwona herbata z Południowej Afryki, o naturalnie słodkim smaku.',
    availability: true,
    popularity: 4.3,
    lowestPrice30Days: 20.00,
  },
  {
    id: 6,
    name: 'Matcha Premium',
    price: 49.99,
    image: '/images/herbata6.jpg',
    category: 'zielona',
    promotion: false,
    description: 'Wysokiej jakości sproszkowana zielona herbata, tradycyjnie używana w japońskiej ceremonii parzenia herbaty.',
    availability: true,
    popularity: 4.7,
    lowestPrice30Days: 45.00,
  },
  {
    id: 7,
    name: 'Czarna herbata Assam',
    price: 18.99,
    image: '/images/herbata7.jpg',
    category: 'czarna',
    promotion: false,
    description: 'Mocna czarna herbata z regionu Assam w Indiach, idealna na poranną filiżankę.',
    availability: true,
    popularity: 4.4,
    lowestPrice30Days: 17.50,
  },
  {
    id: 8,
    name: 'Ziołowa herbata miętowa',
    price: 15.99,
    image: '/images/herbata8.jpg',
    category: 'ziołowa',
    promotion: false,
    description: 'Orzeźwiająca herbata miętowa, doskonała na trawienie i relaks.',
    availability: true,
    popularity: 4.1,
    lowestPrice30Days: 14.00,
  },
  {
    id: 9,
    name: 'Herbata jaśminowa',
    price: 26.99,
    image: '/images/herbata9.jpg',
    category: 'zielona',
    promotion: true,
    priceBeforePromotion: 32.99,
    description: 'Zielona herbata aromatyzowana kwiatami jaśminu, o subtelnym, kwiatowym aromacie.',
    availability: true,
    popularity: 4.6,
    lowestPrice30Days: 25.00,
  },
  {
    id: 10,
    name: 'Herbata Chai',
    price: 23.99,
    image: '/images/herbata10.jpg',
    category: 'czarna',
    promotion: false,
    description: 'Indyjska herbata korzenna z cynamonem, kardamonem, imbirem i goździkami.',
    availability: true,
    popularity: 4.9,
    lowestPrice30Days: 22.00,
  },
  {
    id: 11,
    name: 'Herbata Pu-erh',
    price: 34.99,
    image: '/images/herbata11.jpg',
    category: 'pu-erh',
    promotion: false,
    description: 'Fermentowana herbata o ziemistym smaku, ceniona za właściwości wspomagające trawienie.',
    availability: true,
    popularity: 3.9,
    lowestPrice30Days: 33.00,
  },
  {
    id: 12,
    name: 'Herbata z owoców leśnych',
    price: 17.99,
    image: '/images/herbata12.jpg',
    category: 'owocowa',
    promotion: true,
    priceBeforePromotion: 21.99,
    description: 'Aromatyczna mieszanka suszonych owoców leśnych, doskonała na gorąco i na zimno.',
    availability: true,
    popularity: 4.2,
    lowestPrice30Days: 16.50,
   }
  ]

// Opcje sortowania
export const sortingOptions = [
  { id: 'popularnosc-desc', name: 'Najpopularniejsze' },
  { id: 'price-asc', name: 'Cena: od najniższej' },
  { id: 'price-desc', name: 'Cena: od najwyższej' },
  { id: 'name-asc', name: 'Nazwa: A-Z' },
  { id: 'name-desc', name: 'Nazwa: Z-A' },
];

// Opcje kategorii
export const categoryOptions = [
  { id: 'all', name: 'Wszystkie' },
  { id: 'zielona', name: 'Zielona' },
  { id: 'czarna', name: 'Czarna' },
  { id: 'biała', name: 'Biała' },
  { id: 'oolong', name: 'Oolong' },
  { id: 'pu-erh', name: 'Pu-erh' },
  { id: 'ziołowa', name: 'Ziołowa' },
  { id: 'owocowa', name: 'Owocowa' },
];

export const categories = [
  { value: 'all', label: 'Wszystkie kategorie' },
  { value: 'zielona', label: 'Herbata zielona' },
  { value: 'czarna', label: 'Herbata czarna' },
  { value: 'biała', label: 'Herbata biała' },
  { value: 'oolong', label: 'Herbata oolong' },
  { value: 'ziołowa', label: 'Herbata ziołowa' },
  { value: 'owocowa', label: 'Herbata owocowa' },
  { value: 'pu-erh', label: 'Herbata pu-erh' },
];

// Function to get all products
export const getAllProducts = (): Product[] => {
  // In a real application, this would be a query to an API or database
  return allProducts;
};

// Function to get a product by ID
export const getProductById = (id: number): Product | undefined => {
  // In a real application, this would be a query to an API or database
  return allProducts.find(product => product.id === id);
};

export function filterProducts(products: Product[], filters: {
  wyszukiwanie?: string;
  kategoria?: string;
  pokazPromocje?: boolean;
  zakresyCen?: [number, number];
  sortowanie?: string;
}): Product[] {
  let filtered = [...products];

  // Filter by search term
  if (filters.wyszukiwanie) {
    const searchQuery = filters.wyszukiwanie.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }

  // Filter by category
  if (filters.kategoria && filters.kategoria !== 'all') {
    filtered = filtered.filter(product => product.category === filters.kategoria);
  }

  // Filter by promotion
  if (filters.pokazPromocje) {
    filtered = filtered.filter(p => p.promotion);
  }

  // Filter by price range
  if (filters.zakresyCen && Array.isArray(filters.zakresyCen)) {
    const [min, max] = filters.zakresyCen;
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  // Sorting
  if (filters.sortowanie) {
    const [field, direction] = filters.sortowanie.split('-');
    filtered.sort((a, b) => {
      if (field === 'price') {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (field === 'name') {
        return direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (field === 'popularnosc') {
        return direction === 'asc' 
          ? a.popularity - b.popularity 
          : b.popularity - a.popularity;
      }
      return 0;
    });
  }

  return filtered;
}

// Function to get the price range
export const getPriceRange = (): [number, number] => {
  const prices = allProducts.map(p => p.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));
  return [minPrice, maxPrice];
};