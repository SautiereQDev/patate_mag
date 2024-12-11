import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;