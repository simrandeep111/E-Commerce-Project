import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, RefreshCw } from 'lucide-react';
import { useCart } from '../hooks/useCart';


const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16 pt-32 bg-background">
        <div className="container-custom">
          <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
          <div className="bg-white p-8 text-center">
            <p className="text-lg mb-6">Your cart is currently empty.</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-16 pt-32 bg-background">
      <div className="container-custom">
        <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white">
              {/* Header */}
              <div className="hidden md:grid md:grid-cols-12 md:gap-4 p-4 border-b border-gray-200 text-sm font-medium">
                <div className="md:col-span-6">Product</div>
                <div className="md:col-span-2 text-center">Price</div>
                <div className="md:col-span-2 text-center">Quantity</div>
                <div className="md:col-span-2 text-right">Total</div>
              </div>
              
              {/* Cart Items */}
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="p-4 border-b border-gray-200">
                  <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    {/* Product info */}
                    <div className="md:col-span-6 mb-4 md:mb-0">
                      <div className="flex items-start">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 mr-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">
                            <Link to={`/products/${item.product.id}`}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Size: {item.size} | Color: {item.color.replace('-', ' ')}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="mt-2 text-xs text-accent flex items-center hover:text-accent/80"
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 text-center mb-2 md:mb-0">
                      <span className="md:hidden inline-block w-24 font-medium">Price:</span>
                      <span>${item.product.price}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 text-center mb-2 md:mb-0">
                      <span className="md:hidden inline-block w-24 font-medium">Quantity:</span>
                      <div className="inline-flex border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 border-r border-gray-300 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <div className="w-10 text-center py-1">{item.quantity}</div>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 text-right">
                      <span className="md:hidden inline-block w-24 font-medium">Total:</span>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Cart Actions */}
              <div className="p-4 flex flex-wrap justify-between items-center">
                <Link to="/products" className="text-sm flex items-center text-gray-600 hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Continue Shopping
                </Link>
                <button className="text-sm flex items-center text-gray-600 hover:text-primary">
                  <RefreshCw className="w-4 h-4 mr-1" /> Update Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full btn btn-primary mb-3">
                Proceed to Checkout
              </button>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Promotion Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-accent"
                  />
                  <button className="px-4 py-2 bg-primary text-white font-medium hover:bg-primary/90">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;