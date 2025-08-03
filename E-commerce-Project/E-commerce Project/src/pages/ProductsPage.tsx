import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, sortOptions } from '../data/products';
import { FilterOptions, Product, SortOption } from '../types';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Initial filter state based on URL parameters
  const initialFilters: FilterOptions = {
    demographic: searchParams.getAll('demographic') || [],
    type: searchParams.getAll('type') || [],
    size: searchParams.getAll('size') || [],
    color: searchParams.getAll('color') || [],
    season: searchParams.getAll('season') || [],
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
  };

  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>(sortOptions[0]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply search query
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply featured filter
    if (searchParams.get('featured') === 'true') {
      result = result.filter(product => product.featured);
    }

    // Apply new filter
    if (searchParams.get('new') === 'true') {
      result = result.filter(product => product.new);
    }

    // Apply demographic filter
    if (filters.demographic.length > 0) {
      result = result.filter(product => filters.demographic.includes(product.demographic));
    }

    // Apply type filter
    if (filters.type.length > 0) {
      result = result.filter(product => filters.type.includes(product.type));
    }

    // Apply size filter
    if (filters.size.length > 0) {
      result = result.filter(product =>
        product.sizes.some(size => filters.size.includes(size))
      );
    }

    // Apply color filter
    if (filters.color.length > 0) {
      result = result.filter(product =>
        product.colors.some(color => filters.color.includes(color))
      );
    }

    // Apply season filter
    if (filters.season.length > 0) {
      result = result.filter(product => filters.season.includes(product.season));
    }

    // Apply price range filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      result = result.filter(product => {
        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
          return product.price >= filters.minPrice && product.price <= filters.maxPrice;
        } else if (filters.minPrice !== undefined) {
          return product.price >= filters.minPrice;
        } else if (filters.maxPrice !== undefined) {
          return product.price <= filters.maxPrice;
        }
        return true;
      });
    }

    // Apply sorting
    result.sort(sortOption.sortFn);

    setFilteredProducts(result);
  }, [searchParams, filters, sortOption]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      demographic: [],
      type: [],
      size: [],
      color: [],
      season: [],
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = sortOptions.find(option => option.id === e.target.value);
    if (selectedSort) {
      setSortOption(selectedSort);
    }
  };

  return (
    <div className="py-16 pt-32 bg-white min-h-screen">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-black drop-shadow-lg tracking-tight text-center">
            Discover Our Products
            </h1>
          <p className="text-lg text-gray-500 max-w-2xl text-center">
            Explore our curated collection. Use filters and sorting to find your perfect match!
          </p>
          <div className="w-24 h-1 bg-accent rounded-full mt-4 mb-2" />
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-36">
              <ProductFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Product listing */}
          <div className="lg:col-span-3 flex flex-col items-center">
            {/* Sort and filter controls */}
            <div className="flex flex-wrap items-center justify-between w-full mb-8 gap-4">
              <div className="block lg:hidden w-full">
                <ProductFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
              <div className="flex items-center ml-auto">
                <span className="text-sm text-gray-500 mr-2">{filteredProducts.length} products</span>
                <div className="relative">
                  <select
                    value={sortOption.id}
                    onChange={handleSortChange}
                    className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-300 text-sm rounded-md shadow focus:outline-none focus:border-accent"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex justify-center">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center flex flex-col items-center">
                <p className="text-xl text-gray-600 mb-4 font-semibold">No products match your criteria</p>
                <button
                  onClick={handleClearFilters}
                  className="btn btn-outline px-6 py-2 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-white transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;