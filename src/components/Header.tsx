import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-amber-600 text-white py-4 mb-8">
      <div className="container mx-auto px-4 flex content-center justify-between">
        <Link to="/" className="flex items-center justify-center gap-3 m-auto">
          <h1 className="text-4xl font-bold text-center">Patate-Mag</h1>
          <img src="../assets/patate.avif" alt="Patate-Mag" className="w-14 h-14" />
        </Link>
        {location.pathname !== '/new_article' && (
          <Link
            to={'/new_article'}
            className={
              'border px-3 py-2 mr-3 rounded-lg bg-white text-amber-600 hover:bg-amber-600 hover:text-white text-lg flex items-center justify-center my-auto'
            }
          >
            Ajouter un article
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
