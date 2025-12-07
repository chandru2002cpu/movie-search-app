/**
 * OMDB API Service
 * Handles all API calls to the OMDB database
 */

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search for movies by title with optional filters
 * @param {string} searchTerm - The movie title to search for
 * @param {number} page - Page number for pagination (default: 1)
 * @param {string} type - Filter by type: 'movie', 'series', 'episode', or '' for all
 * @returns {Promise} - Returns search results or error
 */
export const searchMovies = async (searchTerm, page = 1, type = '') => {
  try {
    // Check if API key is loaded
    if (!API_KEY || API_KEY === 'undefined') {
      console.error('API Key is missing! Current value:', API_KEY);
      return {
        Response: 'False',
        Error: 'API Key is not configured. Please check your .env file and restart the server.'
      };
    }

    if (!searchTerm.trim()) {
      return {
        Response: 'False',
        Error: 'Please enter a search term'
      };
    }

    // Build URL with parameters - use API endpoint for filtering (no client-side filter)
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
    
    // Add type filter to API request if specified
    if (type && type !== 'all') {
      url += `&type=${type}`;
    }

    console.log('Fetching URL:', url.replace(API_KEY, 'API_KEY_HIDDEN')); // Debug log

    const response = await fetch(url);
    const data = await response.json();

    console.log('API Response:', data); // Debug log

    // Check for API-specific errors
    if (data.Response === 'False') {
      return data; // Return the error from OMDB API
    }

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      Response: 'False',
      Error: `Failed to fetch movies: ${error.message}`
    };
  }
};

/**
 * Get detailed information about a specific movie by IMDb ID
 * @param {string} imdbID - The IMDb ID of the movie
 * @returns {Promise} - Returns detailed movie information or error
 */
export const getMovieDetails = async (imdbID) => {
  try {
    if (!imdbID) {
      return {
        Response: 'False',
        Error: 'Movie ID is required'
      };
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return {
      Response: 'False',
      Error: 'Failed to fetch movie details. Please try again later.'
    };
  }
};
