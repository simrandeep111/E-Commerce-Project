import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { getFeaturedProducts, getNewArrivals } from '../data/products';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  
  return (
    <div>
      {/* Hero section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/447570/pexels-photo-447570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Summer Collection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative container-custom h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">
              SUMMER Collection 2025
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover our latest collection of premium clothing designed for the modern individual. 
              Timeless elegance meets contemporary style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products?season=summer" 
                className="btn btn-primary"
              >
                Shop Collection
              </Link>
              <Link 
                to="/products" 
                className="btn btn-outline text-white border-white hover:bg-white hover:text-primary"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured products section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif">Featured Products</h2>
            <Link 
              to="/products?featured=true" 
              className="flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories highlight */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Men's Category */}
            <div className="relative group overflow-hidden">
              <div className="aspect-[3/4]">
                <img 
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Men's Collection" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-xl font-serif text-white mb-2">Men's Collection</h3>
                <Link 
                  to="/products?demographic=men" 
                  className="inline-flex items-center text-sm font-medium text-white hover:text-accent transition-colors"
                >
                  Shop Now <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Women's Category */}
            <div className="relative group overflow-hidden">
              <div className="aspect-[3/4]">
                <img 
                  src="https://images.pexels.com/photos/6347923/pexels-photo-6347923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Women's Collection" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-xl font-serif text-white mb-2">Women's Collection</h3>
                <Link 
                  to="/products?demographic=women" 
                  className="inline-flex items-center text-sm font-medium text-white hover:text-accent transition-colors"
                >
                  Shop Now <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Seasonal Category */}
            <div className="relative group overflow-hidden">
              <div className="aspect-[3/4]">
                <img 
                  src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Summer Essentials" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-xl font-serif text-white mb-2">Summer Essentials</h3>
                <Link 
                  to="/products?season=summer" 
                  className="inline-flex items-center text-sm font-medium text-white hover:text-accent transition-colors"
                >
                  Shop Now <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New arrivals section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif">New Arrivals</h2>
            <Link 
              to="/products?new=true" 
              className="flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Subscribe to our Newsletter</h2>
            <p className="text-white/80 mb-8">
              Sign up for our newsletter to receive updates on new collections, exclusive offers, and styling tips.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;