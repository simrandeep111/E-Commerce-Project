import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-serif text-xl font-medium mb-4">ASTON</h3>
            <p className="text-sm text-gray-300 mb-4">
              Premium clothing for the modern individual. Quality craftsmanship and timeless style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shopping Column */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Shopping</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/products?demographic=men" className="hover:text-white transition-colors">Men's Collection</Link></li>
              <li><Link to="/products?demographic=women" className="hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/products?demographic=children" className="hover:text-white transition-colors">Children's Collection</Link></li>
              <li><Link to="/products?featured=true" className="hover:text-white transition-colors">Featured Items</Link></li>
              <li><Link to="/products?sort=price-asc" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 bg-white/10 text-white placeholder-gray-400 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-white text-primary font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} ASTON. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;