import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Slim Fit Shirt',
    price: 139,
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Classic slim fit shirt made from premium cotton. Perfect for formal occasions or business casual settings.',
    category: 'shirts',
    demographic: 'men',
    type: 'formal',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['white', 'light-blue', 'black'],
    season: 'all-season',
    featured: true,
  },
  {
    id: '2',
    name: 'Linen Blazer',
    price: 249,
    images: [
      'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Lightweight linen blazer, perfect for summer events. Features a modern cut and premium Italian fabric.',
    category: 'jackets',
    demographic: 'men',
    type: 'formal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['beige', 'navy', 'olive'],
    season: 'summer',
    popular: true,
  },
  {
    id: '3',
    name: 'Cotton Chinos',
    price: 129,
    images: [
      'https://images.pexels.com/photos/6724553/pexels-photo-6724553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6724553/pexels-photo-6724553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Classic straight leg chinos made from soft cotton twill. Versatile and comfortable for everyday wear.',
    category: 'pants',
    demographic: 'men',
    type: 'casual',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['khaki', 'navy', 'olive', 'black'],
    season: 'all-season',
    featured: true,
  },
  {
    id: '4',
    name: 'Merino Wool Sweater',
    price: 159,
    images: [
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Premium merino wool sweater offering excellent warmth without bulk. Perfect for layering in colder months.',
    category: 'sweaters',
    demographic: 'men',
    type: 'casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['charcoal', 'navy', 'burgundy', 'forest green'],
    season: 'winter',
    popular: true,
  },
  {
    id: '5',
    name: 'Summer Linen Pants',
    price: 119,
    images: [
      'https://images.pexels.com/photos/7691238/pexels-photo-7691238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7691238/pexels-photo-7691238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Lightweight linen pants perfect for hot weather. Breathable, comfortable, and stylish for summer events.',
    category: 'pants',
    demographic: 'men',
    type: 'casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['white', 'beige', 'light blue'],
    season: 'summer',
    new: true,
  },
  {
    id: '6',
    name: 'Performance Polo',
    price: 89,
    images: [
      'https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Technical performance polo with moisture-wicking fabric. Ideal for golf or casual summer wear.',
    category: 'shirts',
    demographic: 'men',
    type: 'athletic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['navy', 'white', 'light blue', 'black'],
    season: 'summer',
    popular: true,
  },
  {
    id: '7',
    name: 'Silk Blouse',
    price: 169,
    images: [
      'https://images.pexels.com/photos/7691768/pexels-photo-7691768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7691768/pexels-photo-7691768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Elegant silk blouse with a relaxed fit. Perfect for business casual environments or evening occasions.',
    category: 'blouses',
    demographic: 'women',
    type: 'formal',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['ivory', 'black', 'navy', 'burgundy'],
    season: 'all-season',
    featured: true,
  },
  {
    id: '8',
    name: 'Tailored Pencil Skirt',
    price: 129,
    images: [
      'https://images.pexels.com/photos/6102007/pexels-photo-6102007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6102007/pexels-photo-6102007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Classic pencil skirt with a modern fit. Perfect for professional settings or more formal occasions.',
    category: 'skirts',
    demographic: 'women',
    type: 'formal',
    sizes: ['0', '2', '4', '6', '8', '10', '12', '14'],
    colors: ['black', 'navy', 'charcoal'],
    season: 'all-season',
    popular: true,
  },
  {
    id: '9',
    name: 'Summer Sundress',
    price: 149,
    images: [
      'https://images.pexels.com/photos/6347538/pexels-photo-6347538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6347538/pexels-photo-6347538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Lightweight cotton sundress, perfect for warm weather. Features a flattering cut and vibrant pattern.',
    category: 'dresses',
    demographic: 'women',
    type: 'casual',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['floral print', 'blue stripe', 'solid white'],
    season: 'summer',
    new: true,
  },
  {
    id: '10',
    name: 'Cashmere Cardigan',
    price: 219,
    images: [
      'https://images.pexels.com/photos/7691079/pexels-photo-7691079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7691079/pexels-photo-7691079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Luxurious cashmere cardigan offering exceptional softness and warmth. A timeless addition to any wardrobe.',
    category: 'sweaters',
    demographic: 'women',
    type: 'casual',
    sizes: ['S', 'M', 'L'],
    colors: ['cream', 'gray', 'camel', 'black'],
    season: 'winter',
    featured: true,
  },
  {
    id: '11',
    name: 'Kids Cotton T-Shirt',
    price: 29,
    images: [
      'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Soft cotton t-shirt for children. Comfortable, durable, and available in fun colors.',
    category: 'shirts',
    demographic: 'children',
    type: 'casual',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['blue', 'red', 'green', 'yellow'],
    season: 'all-season',
  },
  {
    id: '12',
    name: 'Kids Denim Jeans',
    price: 49,
    images: [
      'https://images.pexels.com/photos/7691900/pexels-photo-7691900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7691900/pexels-photo-7691900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'Durable denim jeans for active children. Features adjustable waistband and reinforced knees.',
    category: 'pants',
    demographic: 'children',
    type: 'casual',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: ['blue', 'black'],
    season: 'all-season',
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.popular);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (currentProduct: Product, limit = 4): Product[] => {
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || 
       product.demographic === currentProduct.demographic)
    )
    .slice(0, limit);
};

export const sortOptions = [
  { 
    id: 'price-asc', 
    name: 'Price: Low to High', 
    sortFn: (a: Product, b: Product) => a.price - b.price 
  },
  { 
    id: 'price-desc', 
    name: 'Price: High to Low', 
    sortFn: (a: Product, b: Product) => b.price - a.price 
  },
  { 
    id: 'name-asc', 
    name: 'Name: A to Z', 
    sortFn: (a: Product, b: Product) => a.name.localeCompare(b.name) 
  },
  { 
    id: 'name-desc', 
    name: 'Name: Z to A', 
    sortFn: (a: Product, b: Product) => b.name.localeCompare(a.name) 
  },
];