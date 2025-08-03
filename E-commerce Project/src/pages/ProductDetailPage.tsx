import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { useCart } from '../hooks/useCart';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { handleAddToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {
  if (id) {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedSize(data.sizes[0]);
        setSelectedColor(data.colors[0]);
        // Fetch related products after product is set
        fetch(`http://localhost:5000/api/products?category=${data.category}`)
          .then(res => res.json())
          .then(related => {
            setRelatedProducts(related.filter((p: any) => p._id !== data._id));
          });
      });
  }
}, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  const handleAddToCartClick = () => {
    if (!selectedSize || !selectedColor) return;
    handleAddToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="py-16 pt-32 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-gray-100 mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Image navigation controls */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image pagination dots */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {product.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-white/60'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square ${
                      index === currentImageIndex
                        ? 'ring-2 ring-primary'
                        : 'hover:opacity-80'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            <p className="text-2xl mb-6">${product.price}</p>

            <div className="mb-8">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border text-sm font-medium ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm capitalize ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex border border-gray-300 w-32">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100"
                >
                  -
                </button>
                <div className="flex-1 text-center py-2">{quantity}</div>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCartClick}
                className="flex-1 btn btn-primary"
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Add to Cart
              </button>
              <button className="sm:flex-initial btn btn-outline">
                <Heart className="mr-2 w-5 h-5" />
                Add to Wishlist
              </button>
            </div>

            {/* Product Meta */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium capitalize">{product.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Demographic</p>
                  <p className="font-medium capitalize">{product.demographic}</p>
                </div>
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="font-medium capitalize">{product.type}</p>
                </div>
                <div>
                  <p className="text-gray-500">Season</p>
                  <p className="font-medium capitalize">{product.season.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products (optional, currently empty) */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related._id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;