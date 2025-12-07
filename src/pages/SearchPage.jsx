import { useState, useEffect } from 'react';
import { searchMovies } from '../services/omdbAPI';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

/**
 * SearchPage Component
 * Main page for searching movies with filters and pagination
 */
const SearchPage = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedType, setSelectedType] = useState('all');

  // Fetch movies when search query, page, or type changes
  useEffect(() => {
    if (searchQuery) {
      fetchMovies();
    }
  }, [searchQuery, currentPage, selectedType]);

  /**
   * Fetch movies from OMDB API
   */
  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use API endpoint for filtering - no client-side filter method
      const data = await searchMovies(searchQuery, currentPage, selectedType);

      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('An error occurred while fetching movies');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle search form submission
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm.trim());
      setCurrentPage(1); // Reset to first page on new search
    }
  };

  /**
   * Handle type filter change
   */
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
            🎬 Movie Search App
          </h1>

          {/* Search Bar and Filter */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for movies, series, episodes..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type Filter Dropdown */}
              <div className="md:w-48">
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="movie">Movies</option>
                  <option value="series">Series</option>
                  <option value="episode">Episodes</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto mt-10">
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg">
              <p className="font-semibold">❌ {error}</p>
              <p className="text-sm mt-2">Please try a different search term or check your internet connection.</p>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!loading && movies.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-400 text-center">
              Found <span className="text-white font-semibold">{totalResults}</span> results for 
              <span className="text-blue-400 font-semibold"> "{searchQuery}"</span>
              {selectedType !== 'all' && (
                <span className="text-gray-400"> in <span className="text-white font-semibold">{selectedType}s</span></span>
              )}
            </p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* Initial State - No Search Yet */}
        {!loading && !error && movies.length === 0 && !searchQuery && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-gray-300 mb-2">Search for Your Favorite Movies</h2>
            <p className="text-gray-500">Enter a movie title above to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
