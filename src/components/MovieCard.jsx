import { useNavigate } from 'react-router-dom';

/**
 * MovieCard Component
 * Displays a single movie card with poster, title, year, and type
 * @param {Object} movie - Movie object from OMDB API
 */
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Handle click to navigate to movie details page
  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  // Placeholder image for movies without posters
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/1e293b/f1f5f9?text=No+Poster';

  return (
    <div 
      onClick={handleClick}
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      {/* Movie Poster */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/1e293b/f1f5f9?text=No+Poster';
          }}
        />
        {/* Type Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
          {movie.Type}
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-sm">
          Year: <span className="text-white font-semibold">{movie.Year}</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">
          IMDb ID: {movie.imdbID}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
