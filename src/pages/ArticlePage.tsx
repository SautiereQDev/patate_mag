import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Article } from '../types/Article.ts';

export const ArticlePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Quentin Sautière',
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error('Error:', error));
  }, []);

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

  const deleteArticle = () => {
    fetch(`http://localhost:5000/api/articles/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Article supprimé avec succès !');
        alert('Article supprimé avec succès !');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Une erreur est survenue lors de la suppression de l'article");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux articles
        </Link>
        <div className="flex items-center space-x-2 mb-3">
          <Link
            to={`/edit_article/${article._id}`}
            className="px-3 py-1 border rounded-md flex items-center justify-center"
          >
            Modifier
          </Link>
          <button
            className="px-3 py-1 border rounded-md flex items-center justify-center"
            onClick={deleteArticle}
          >
            Supprimer
          </button>
        </div>
      </div>
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
            <span>{article.createdAt}</span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{article.content}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
