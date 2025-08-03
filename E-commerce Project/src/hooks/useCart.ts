import { useContext, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useAuth } from './useAuth';


export const useCart = () => {
  const cart = useContext(CartContext);
  const { user, token } = useAuth();

  // Load cart from DB when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        const res = await fetch('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        cart.setCartItems(data);
      }
    };
    fetchCart();
  }, [user, token]); 

  // Save to DB on cart change
  useEffect(() => {
    const saveCart = async () => {
      if (user && token) {
        await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: cart.items }),
        });
      }
    };
    if (user && token) saveCart();
  }, [cart.items, user, token]);

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
    cart.addToCart(product, quantity, selectedSize, selectedColor);
  };

  return { ...cart, handleAddToCart };
};
