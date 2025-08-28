import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

class TMDBService {
  constructor() {
    this.apiKey = process.env.VITE_TMDB_API_KEY;
    this.readAccessToken = process.env.VITE_TMDB_READ_ACCESS_TOKEN;

    // Don't throw error immediately, check when making requests
    this.client = axios.create({
      baseURL: TMDB_BASE_URL,
      headers: {
        'Authorization': `Bearer ${this.readAccessToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Search movies by query
   * @param {string} query - Search query
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} Search results
   */
  async searchMovies(query, page = 1) {
    if (!this.apiKey) {
      throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
    }

    try {
      const response = await this.client.get('/search/movie', {
        params: {
          query,
          page,
          api_key: this.apiKey
        }
      });
      return this.formatMoviesResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to search movies: ${error.message}`);
    }
  }

  /**
   * Get popular movies
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} Popular movies
   */
  async getPopularMovies(page = 1) {
    if (!this.apiKey) {
      throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
    }

    try {
      const response = await this.client.get('/movie/popular', {
        params: {
          page,
          api_key: this.apiKey
        }
      });
      return this.formatMoviesResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to get popular movies: ${error.message}`);
    }
  }

  /**
   * Get top rated movies
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} Top rated movies
   */
  async getTopRatedMovies(page = 1) {
    if (!this.apiKey) {
      throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
    }

    try {
      const response = await this.client.get('/movie/top_rated', {
        params: {
          page,
          api_key: this.apiKey
        }
      });
      return this.formatMoviesResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to get top rated movies: ${error.message}`);
    }
  }

  /**
   * Get movie details by ID
   * @param {number} movieId - Movie ID
   * @returns {Promise<Object>} Movie details
   */
  async getMovieDetails(movieId) {
    if (!this.apiKey) {
      throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
    }

    try {
      const response = await this.client.get(`/movie/${movieId}`, {
        params: {
          api_key: this.apiKey
        }
      });
      return this.formatMovieDetails(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Movie not found');
      }
      throw new Error(`Failed to get movie details: ${error.message}`);
    }
  }

  /**
   * Get now playing movies
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} Now playing movies
   */
  async getNowPlayingMovies(page = 1) {
    if (!this.apiKey) {
      throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
    }

    try {
      const response = await this.client.get('/movie/now_playing', {
        params: {
          page,
          api_key: this.apiKey
        }
      });
      return this.formatMoviesResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to get now playing movies: ${error.message}`);
    }
  }

  /**
   * Format movies response to include full image URLs
   * @param {Object} data - Raw TMDB response
   * @returns {Object} Formatted response
   */
  formatMoviesResponse(data) {
    return {
      ...data,
      results: data.results.map(movie => ({
        ...movie,
        poster_path: movie.poster_path
          ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
          : null,
        backdrop_path: movie.backdrop_path
          ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
          : null
      }))
    };
  }

  /**
   * Format movie details to include full image URLs
   * @param {Object} movie - Raw movie data
   * @returns {Object} Formatted movie data
   */
  formatMovieDetails(movie) {
    return {
      ...movie,
      poster_path: movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : null,
      backdrop_path: movie.backdrop_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
        : null
    };
  }
}

export default TMDBService;
