import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbAPI';

/**
 * MovieDetails Component
 * Displays detailed information about a specific movie
 */
const MovieDetails = () => {
  const { id } = useParams(); // Get IMDb ID from URL
  const navigate = useNavigate();
  
  // State management
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details when component mounts or ID changes
  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  /**
   * Fetch detailed movie information from OMDB API
   */
  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMovieDetails(id);

      if (data.Response === 'True') {
        setMovie(data);
      } else {
        setError(data.Error || 'Movie not found');
      }
    } catch (err) {
      setError('An error occurred while fetching movie details');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate back to search page
   */
  const handleGoBack = () => {
    navigate('/');
  };

  // Placeholder image for movies without posters
  const posterUrl = movie?.Poster !== 'N/A' 
    ? movie?.Poster 
    : 'https://via.placeholder.com/400x600/1e293b/f1f5f9?text=No+Poster';

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </button>
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
              <p className="text-sm mt-2">Please try again or go back to search.</p>
            </div>
          </div>
        )}

        {/* Movie Details */}
        {movie && !loading && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-2xl">
              <div className="md:flex">
                {/* Movie Poster */}
                <div className="md:w-1/3">
                  <img
                    src={posterUrl}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x600/1e293b/f1f5f9?text=No+Poster';
                    }}
                  />
                </div>

                {/* Movie Information */}
                <div className="md:w-2/3 p-8">
                  {/* Title and Year */}
                  <div className="mb-4">
                    <h1 className="text-4xl font-bold text-white mb-2">{movie.Title}</h1>
                    <div className="flex flex-wrap gap-3 items-center text-gray-400">
                      <span className="flex items-center gap-1">
                        📅 {movie.Year}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {movie.Runtime}
                      </span>
                      <span className="flex items-center gap-1">
                        🎭 {movie.Rated}
                      </span>
                    </div>
                  </div>

                  {/* Genre */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {movie.Genre && movie.Genre.split(', ').map((genre, index) => (
                        <span
                          key={index}
                          className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Plot Summary */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-400 mb-2">Plot Summary</h2>
                    <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                  </div>

                  {/* Ratings */}
                  {movie.Ratings && movie.Ratings.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-blue-400 mb-3">Ratings</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                          <div className="bg-slate-700 p-3 rounded-lg">
                            <p className="text-gray-400 text-sm">IMDb Rating</p>
                            <p className="text-2xl font-bold text-yellow-400">⭐ {movie.imdbRating}/10</p>
                          </div>
                        )}
                        {movie.Ratings.map((rating, index) => (
                          <div key={index} className="bg-slate-700 p-3 rounded-lg">
                            <p className="text-gray-400 text-sm">{rating.Source}</p>
                            <p className="text-xl font-bold text-white">{rating.Value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {movie.Director && movie.Director !== 'N/A' && (
                      <div>
                        <h3 className="text-blue-400 font-semibold mb-1">Director</h3>
                        <p className="text-gray-300">{movie.Director}</p>
                      </div>
                    )}
                    {movie.Writer && movie.Writer !== 'N/A' && (
                      <div>
                        <h3 className="text-blue-400 font-semibold mb-1">Writer</h3>
                        <p className="text-gray-300">{movie.Writer}</p>
                      </div>
                    )}
                    {movie.Actors && movie.Actors !== 'N/A' && (
                      <div className="md:col-span-2">
                        <h3 className="text-blue-400 font-semibold mb-1">Cast</h3>
                        <p className="text-gray-300">{movie.Actors}</p>
                      </div>
                    )}
                    {movie.Language && movie.Language !== 'N/A' && (
                      <div>
                        <h3 className="text-blue-400 font-semibold mb-1">Language</h3>
                        <p className="text-gray-300">{movie.Language}</p>
                      </div>
                    )}
                    {movie.Country && movie.Country !== 'N/A' && (
                      <div>
                        <h3 className="text-blue-400 font-semibold mb-1">Country</h3>
                        <p className="text-gray-300">{movie.Country}</p>
                      </div>
                    )}
                    {movie.Awards && movie.Awards !== 'N/A' && (
                      <div className="md:col-span-2">
                        <h3 className="text-blue-400 font-semibold mb-1">Awards</h3>
                        <p className="text-gray-300">🏆 {movie.Awards}</p>
                      </div>
                    )}
                    {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                      <div>
                        <h3 className="text-blue-400 font-semibold mb-1">Box Office</h3>
                        <p className="text-gray-300">💰 {movie.BoxOffice}</p>
                      </div>
                    )}
                    {movie.Production && movie.Production !== 'N/A' && (
                      <div>
                        <h3 className="text-blue-400 font-semibold mb-1">Production</h3>
                        <p className="text-gray-300">{movie.Production}</p>
                      </div>
                    )}
                  </div>

                  {/* IMDb Link */}
                  <div className="mt-6">
                    <a
                      href={`https://www.imdb.com/title/${movie.imdbID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                    >
                      View on IMDb
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MovieDetails;
