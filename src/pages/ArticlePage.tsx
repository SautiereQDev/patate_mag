import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/articles';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export const ArticlePage: React.FC = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Article non trouvé</p>
        <Link to="/" className="text-amber-600 hover:text-amber-700">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Retour aux articles
      </Link>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

          <div className="flex items-center text-gray-600 mb-6">
            <User size={18} className="mr-1" />
            <span className="mr-4">{article.author}</span>
            <Calendar size={18} className="mr-1" />
            <span>{article.date}</span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {article.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;