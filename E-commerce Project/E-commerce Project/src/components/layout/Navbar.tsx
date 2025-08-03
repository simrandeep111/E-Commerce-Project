import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold">
          ASTON
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className={`text-sm font-medium hover:text-accent transition-colors ${
                  location.pathname === '/' ? 'text-accent' : 'text-primary'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`text-sm font-medium hover:text-accent transition-colors ${
                  location.pathname.startsWith('/products') ? 'text-accent' : 'text-primary'
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`text-sm font-medium hover:text-accent transition-colors ${
                  location.pathname === '/contact' ? 'text-accent' : 'text-primary'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 lg:w-48 py-1 pl-8 pr-2 text-sm bg-transparent border-b border-primary/30 focus:border-accent focus:outline-none transition-all"
            />
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" />
          </form>

          {/* User/Auth */}
            <div className="relative group">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-accent/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={user ? "Account menu" : "Login/Register"}
              type="button"
            >
              <User className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
            </button>

            {user ? (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">
                {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                <p className="text-sm font-semibold text-primary">{user.name}</p>
                </div>
              </div>
              <div className="py-2">
                <button
                onClick={logout}
                className="block w-full text-left px-5 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                Sign Out
                </button>
              </div>
              </div>
            ) : (
              <Link
              to="/login"
              className="absolute right-0 top-full mt-3 w-48 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 px-5 py-3 text-sm text-primary hover:text-accent"
              >
              Login / Register
              </Link>
            )}
            </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="hidden sm:block">
            <Heart className="w-5 h-5" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-medium rounded-full bg-accent text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 right-0">
          <div className="container-custom py-4">
            <form onSubmit={handleSearch} className="mb-4 flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm bg-gray-50 rounded-sm focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
            
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/" 
                    className={`block py-1 text-base font-medium ${
                      location.pathname === '/' ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products" 
                    className={`block py-1 text-base font-medium ${
                      location.pathname.startsWith('/products') ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`block py-1 text-base font-medium ${
                      location.pathname === '/contact' ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/wishlist" 
                    className="block py-1 text-base font-medium text-primary"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  {user ? (
                    <button 
                      onClick={logout}
                      className="block py-1 text-base font-medium text-primary"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link 
                      to="/login" 
                      className="block py-1 text-base font-medium text-primary"
                    >
                      Login / Register
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;