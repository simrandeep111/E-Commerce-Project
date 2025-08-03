export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  demographic: 'men' | 'women' | 'children';
  type: 'formal' | 'casual' | 'athletic';
  sizes: string[];
  colors: string[];
  season: 'summer' | 'winter' | 'all-season';
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
}

export interface FilterOptions {
  demographic: string[];
  type: string[];
  size: string[];
  color: string[];
  season: string[];
  minPrice?: number;
  maxPrice?: number;
}

export interface SortOption {
  id: string;
  name: string;
  sortFn: (a: Product, b: Product) => number;
}