import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetails from './pages/MovieDetails';

/**
 * Main App Component
 * Sets up routing for the application
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Search Page - Home Route */}
        <Route path="/" element={<SearchPage />} />
        
        {/* Movie Details Page - Dynamic Route with IMDb ID */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
