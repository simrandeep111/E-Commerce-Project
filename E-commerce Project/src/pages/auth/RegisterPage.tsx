import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Error creating account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen py-16 pt-32 bg-background">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif mb-2">Complete Registration</h1>
            <p className="text-gray-600">Please provide the following information</p>
          </div>
          
          {errors.general && (
            <div className="mb-6 p-3 bg-error/10 border border-error/30 text-error text-sm">
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`input ${errors.name ? 'border-error' : ''}`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-error">{errors.name}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'border-error' : ''}`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-error">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`input ${errors.password ? 'border-error' : ''}`}
                placeholder="At least 8 characters"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-error">{errors.password}</p>
              )}
            </div>
            
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input ${errors.confirmPassword ? 'border-error' : ''}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-error">{errors.confirmPassword}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-accent hover:text-accent/80">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-accent hover:text-accent/80">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;