import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-amber-600 text-white py-6 mb-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="flex items-center justify-center gap-3">
          <h1 className="text-4xl font-bold text-center">Patate-Mag</h1>
          <img src="/patate.avif" alt="Patate-Mag" className="w-16 h-16" />
        </Link>
      </div>
    </header>
  );
};

export default Header;