import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    addToCart(product, 1, product.sizes[0], product.colors[0]);
  };
  
  return (
    <div className="group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Quick actions */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-center space-x-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button 
              onClick={handleAddToCart}
              className="bg-primary text-white p-2 rounded-sm hover:bg-primary/90 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button 
              className="bg-white text-primary p-2 rounded-sm hover:bg-gray-100 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
          {/* Product badges */}
          {(product.new || product.featured) && (
            <div className="absolute top-3 left-3">
              {product.new && (
                <span className="inline-block bg-accent text-white text-xs font-medium px-2 py-1 mb-1">
                  New
                </span>
              )}
              {product.featured && (
                <span className="inline-block bg-primary text-white text-xs font-medium px-2 py-1">
                  Featured
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Product info */}
        <div className="mt-3">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="text-sm mt-1">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;