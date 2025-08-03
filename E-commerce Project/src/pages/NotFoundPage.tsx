import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 pt-32 bg-background">
      <div className="container-custom text-center">
        <h1 className="text-6xl md:text-8xl font-serif mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-serif mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;