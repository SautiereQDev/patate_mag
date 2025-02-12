import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import patateImage from '../assets/patate.avif'; 

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="py-4 mb-8 text-white bg-amber-600">
      <div className="container flex content-center justify-between px-4 mx-auto">
        <Link to="/" className="flex items-center justify-center gap-3 m-auto">
          <h1 className="text-4xl font-bold text-center">Patate-Mag</h1>
          <img src={patateImage} alt="Patate-Mag" className="w-14 h-14" />
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
