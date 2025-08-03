import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await signup(email);
      navigate('/thanks'); // or any page you want
    } catch (error) {
      setError('Error signing up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen py-16 pt-32 bg-background">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif mb-2">Join the List</h1>
            <p className="text-gray-600">
              Sign up with your email to get updates from ASTON
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error/10 border border-error/30 text-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="your@email.com"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                We'll send updates and exclusive offers to this email.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary mb-4"
            >
              {isLoading ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:text-accent/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;