import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { HomePage, ArticlePage, CreateArticle } from './pages';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route
            path="/edit_article/:recipeId"
            element={<CreateArticle modify={true} />}
          />
          <Route path="/new_article" element={<CreateArticle />} />
        </Routes>
      </div>
    </Router>
  );
  //TODO: Possiblité de modifier la recette
  //TODO: Possiblité de supprimer la recette
}

export default App;
