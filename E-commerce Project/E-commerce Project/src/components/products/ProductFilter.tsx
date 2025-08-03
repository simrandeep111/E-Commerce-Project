import React, { useState } from 'react';
import { FilterOptions } from '../../types';
import { X } from 'lucide-react';

interface ProductFilterProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  onClearFilters: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDemographicChange = (value: string) => {
    const updatedDemographic = filters.demographic.includes(value)
      ? filters.demographic.filter(item => item !== value)
      : [...filters.demographic, value];
    
    onFilterChange({ ...filters, demographic: updatedDemographic });
  };
  
  const handleTypeChange = (value: string) => {
    const updatedType = filters.type.includes(value)
      ? filters.type.filter(item => item !== value)
      : [...filters.type, value];
    
    onFilterChange({ ...filters, type: updatedType });
  };
  
  const handleSeasonChange = (value: string) => {
    const updatedSeason = filters.season.includes(value)
      ? filters.season.filter(item => item !== value)
      : [...filters.season, value];
    
    onFilterChange({ ...filters, season: updatedSeason });
  };
  
  const handlePriceChange = (min?: number, max?: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };
  
  // Count active filters (remove color and size)
  const activeFilterCount = [
    ...filters.demographic,
    ...filters.type,
    ...filters.season,
  ].length + (filters.minPrice || filters.maxPrice ? 1 : 0);
  
  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
      
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="space-y-6">
          {/* Demographics */}
          <div>
            <h3 className="text-sm font-medium mb-3">Demographics</h3>
            <div className="space-y-2">
              {['men', 'women', 'children'].map((demo) => (
                <label key={demo} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.demographic.includes(demo)}
                    onChange={() => handleDemographicChange(demo)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-accent focus:ring-accent"
                  />
                  <span className="text-sm capitalize">{demo}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Product Type */}
          <div>
            <h3 className="text-sm font-medium mb-3">Product Type</h3>
            <div className="space-y-2">
              {['formal', 'casual', 'athletic'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.type.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-accent focus:ring-accent"
                  />
                  <span className="text-sm capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Season */}
          <div>
            <h3 className="text-sm font-medium mb-3">Season</h3>
            <div className="space-y-2">
              {['summer', 'winter', 'all-season'].map((season) => (
                <label key={season} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.season.includes(season)}
                    onChange={() => handleSeasonChange(season)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-accent focus:ring-accent"
                  />
                  <span className="text-sm capitalize">{season.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium mb-3">Price Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePriceChange(0, 100)}
                className={`p-2 text-xs border ${
                  filters.minPrice === 0 && filters.maxPrice === 100
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Under $100
              </button>
              <button
                onClick={() => handlePriceChange(100, 200)}
                className={`p-2 text-xs border ${
                  filters.minPrice === 100 && filters.maxPrice === 200
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                $100 - $200
              </button>
              <button
                onClick={() => handlePriceChange(200, undefined)}
                className={`p-2 text-xs border ${
                  filters.minPrice === 200 && filters.maxPrice === undefined
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                $200+
              </button>
              <button
                onClick={() => handlePriceChange(undefined, undefined)}
                className={`p-2 text-xs border ${
                  filters.minPrice === undefined && filters.maxPrice === undefined
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                All Prices
              </button>
            </div>
          </div>
          
          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <div>
              <button
                onClick={onClearFilters}
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">Filters</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
            <div className="space-y-6">
              {/* Demographics */}
              <div>
                <h3 className="text-sm font-medium mb-3">Demographics</h3>
                <div className="space-y-2">
                  {['men', 'women', 'children'].map((demo) => (
                    <label key={demo} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.demographic.includes(demo)}
                        onChange={() => handleDemographicChange(demo)}
                        className="mr-2 h-4 w-4 border-gray-300 rounded text-accent focus:ring-accent"
                      />
                      <span className="text-sm capitalize">{demo}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Product Type */}
              <div>
                <h3 className="text-sm font-medium mb-3">Product Type</h3>
                <div className="space-y-2">
                  {['formal', 'casual', 'athletic'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="mr-2 h-4 w-4 border-gray-300 rounded text-accent focus:ring-accent"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Season */}
              <div>
                <h3 className="text-sm font-medium mb-3">Season</h3>
                <div className="space-y-2">
                  {['summer', 'winter', 'all-season'].map((season) => (
                    <label key={season} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.season.includes(season)}
                        onChange={() => handleSeasonChange(season)}
                        className="mr-2 h-4 w-4 border-gray-300 rounded text-accent focus:ring-accent"
                      />
                      <span className="text-sm capitalize">{season.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handlePriceChange(0, 100)}
                    className={`p-2 text-xs border ${
                      filters.minPrice === 0 && filters.maxPrice === 100
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Under $100
                  </button>
                  <button
                    onClick={() => handlePriceChange(100, 200)}
                    className={`p-2 text-xs border ${
                      filters.minPrice === 100 && filters.maxPrice === 200
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    $100 - $200
                  </button>
                  <button
                    onClick={() => handlePriceChange(200, undefined)}
                    className={`p-2 text-xs border ${
                      filters.minPrice === 200 && filters.maxPrice === undefined
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    $200+
                  </button>
                  <button
                    onClick={() => handlePriceChange(undefined, undefined)}
                    className={`p-2 text-xs border ${
                      filters.minPrice === undefined && filters.maxPrice === undefined
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    All Prices
                  </button>
                </div>
              </div>
              
              {/* Apply/Clear buttons */}
              <div className="flex space-x-2 pt-4 border-t">
                <button
                  onClick={onClearFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
