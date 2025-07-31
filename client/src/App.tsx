import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import { HomePage, ArticlePage, CreateArticle, ErrorPage } from './pages';

function App() {
  return (
    <Router basename="/patate-mag">
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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
