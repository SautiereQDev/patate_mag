import React from 'react';
import { Article } from '../types/Article.ts';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/article/${article._id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-96">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {article.title}
          </h2>
          <p className="text-gray-600 mb-4">{article.excerpt}</p>
          <div className="flex items-center text-sm text-gray-500">
            <User size={16} className="mr-1" />
            <span className="mr-4">{article.author}</span>
            <Calendar size={16} className="mr-1" />
            <span>{article.createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
