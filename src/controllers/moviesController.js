import TMDBService from '../services/tmdbService.js';

/**
 * Movies controller for handling TMDB API requests
 */
class MoviesController {
  /**
   * Search movies
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async searchMovies(req, res) {
    try {
      const { q: query, page = 1 } = req.query;

      if (!query) {
        return res.status(400).json({
          error: 'Query parameter is required'
        });
      }

      const tmdbService = new TMDBService();
      const result = await tmdbService.searchMovies(query, parseInt(page));

      res.json(result);
    } catch (error) {
      console.error('Error searching movies:', error);
      res.status(500).json({
        error: 'Failed to search movies',
        message: error.message
      });
    }
  }

  /**
   * Get popular movies
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getPopularMovies(req, res) {
    try {
      const { page = 1 } = req.query;
      const tmdbService = new TMDBService();
      const result = await tmdbService.getPopularMovies(parseInt(page));

      res.json(result);
    } catch (error) {
      console.error('Error getting popular movies:', error);
      res.status(500).json({
        error: 'Failed to get popular movies',
        message: error.message
      });
    }
  }

  /**
   * Get top rated movies
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getTopRatedMovies(req, res) {
    try {
      const { page = 1 } = req.query;
      const tmdbService = new TMDBService();
      const result = await tmdbService.getTopRatedMovies(parseInt(page));

      res.json(result);
    } catch (error) {
      console.error('Error getting top rated movies:', error);
      res.status(500).json({
        error: 'Failed to get top rated movies',
        message: error.message
      });
    }
  }

  /**
   * Get now playing movies
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getNowPlayingMovies(req, res) {
    try {
      const { page = 1 } = req.query;
      const tmdbService = new TMDBService();
      const result = await tmdbService.getNowPlayingMovies(parseInt(page));

      res.json(result);
    } catch (error) {
      console.error('Error getting now playing movies:', error);
      res.status(500).json({
        error: 'Failed to get now playing movies',
        message: error.message
      });
    }
  }

  /**
   * Get movie details by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getMovieDetails(req, res) {
    try {
      const { id } = req.params;
      const movieId = parseInt(id);

      if (isNaN(movieId)) {
        return res.status(400).json({
          error: 'Invalid movie ID'
        });
      }

      const tmdbService = new TMDBService();
      const movie = await tmdbService.getMovieDetails(movieId);

      res.json(movie);
    } catch (error) {
      console.error('Error getting movie details:', error);

      if (error.message === 'Movie not found') {
        return res.status(404).json({
          error: 'Movie not found'
        });
      }

      res.status(500).json({
        error: 'Failed to get movie details',
        message: error.message
      });
    }
  }
}

export default MoviesController;
