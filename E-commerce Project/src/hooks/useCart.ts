import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';

export const useCart = () => {
  const cart = useContext(CartContext);
  const { user } = useAuth();

  // Handler to add item to cart only if user is logged in
  const handleAddToCart = (
    product: any, 
    quantity: number,
    selectedSize: string,
    selectedColor: string
  ) => {
    if (!user) {
      window.location.href = '/login'; 
      return;
    }
    if (cart.addToCart) {
      cart.addToCart(product, quantity, selectedSize, selectedColor);
    }
  };

  return {
    ...cart,
    user,
    handleAddToCart,
  };
};