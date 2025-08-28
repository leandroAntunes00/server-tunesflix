import sinon from 'sinon';
import MoviesController from '../controllers/moviesController.js';
import TMDBService from '../services/tmdbService.js';

describe('Movies Controller', () => {
  let req, res, next, tmdbService;

  beforeEach(() => {
    // Set up test environment variables
    process.env.VITE_TMDB_API_KEY = 'test-api-key';
    process.env.VITE_TMDB_READ_ACCESS_TOKEN = 'test-token';

    // Create TMDBService instance after environment variables are set
    tmdbService = new TMDBService();

    req = {
      query: {},
      params: {},
      headers: {}
    };

    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      req.query = { q: 'test movie', page: '1' };

      const mockResult = {
        results: [{ id: 1, title: 'Test Movie' }],
        total_results: 1,
        page: 1
      };

      sinon.stub(tmdbService, 'searchMovies').resolves(mockResult);

      await MoviesController.searchMovies(req, res);

      sinon.assert.calledWith(tmdbService.searchMovies, 'test movie', 1);
      sinon.assert.calledWith(res.json, mockResult);
    });

    it('should return 400 if query is missing', async () => {
      req.query = {};

      await MoviesController.searchMovies(req, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, {
        error: 'Query parameter is required'
      });
    });

    it('should handle service errors', async () => {
      req.query = { q: 'test' };
      const error = new Error('Service error');

      sinon.stub(tmdbService, 'searchMovies').rejects(error);

      await MoviesController.searchMovies(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match({
        error: 'Failed to search movies',
        message: 'Service error'
      }));
    });
  });

  describe('getPopularMovies', () => {
    it('should get popular movies successfully', async () => {
      req.query = { page: '2' };
      const mockResult = {
        results: [{ id: 1, title: 'Popular Movie' }],
        page: 2
      };

      sinon.stub(tmdbService, 'getPopularMovies').resolves(mockResult);

      await MoviesController.getPopularMovies(req, res);

      sinon.assert.calledWith(tmdbService.getPopularMovies, 2);
      sinon.assert.calledWith(res.json, mockResult);
    });

    it('should use default page 1 when not provided', async () => {
      req.query = {};
      const mockResult = { results: [], page: 1 };

      sinon.stub(tmdbService, 'getPopularMovies').resolves(mockResult);

      await MoviesController.getPopularMovies(req, res);

      sinon.assert.calledWith(tmdbService.getPopularMovies, 1);
    });
  });

  describe('getMovieDetails', () => {
    it('should get movie details successfully', async () => {
      req.params = { id: '123' };

      const mockMovie = {
        id: 123,
        title: 'Test Movie',
        overview: 'Movie description'
      };

      sinon.stub(tmdbService, 'getMovieDetails').resolves(mockMovie);

      await MoviesController.getMovieDetails(req, res);

      sinon.assert.calledWith(tmdbService.getMovieDetails, 123);
      sinon.assert.calledWith(res.json, mockMovie);
    });

    it('should return 400 for invalid movie ID', async () => {
      req.params = { id: 'invalid' };

      await MoviesController.getMovieDetails(req, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, {
        error: 'Invalid movie ID'
      });
    });

    it('should return 404 for movie not found', async () => {
      req.params = { id: '999' };
      const error = new Error('Movie not found');

      sinon.stub(tmdbService, 'getMovieDetails').rejects(error);

      await MoviesController.getMovieDetails(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, {
        error: 'Movie not found'
      });
    });
  });

  describe('getTopRatedMovies', () => {
    it('should get top rated movies successfully', async () => {
      req.query = { page: '1' };
      const mockResult = { results: [], page: 1 };

      sinon.stub(tmdbService, 'getTopRatedMovies').resolves(mockResult);

      await MoviesController.getTopRatedMovies(req, res);

      sinon.assert.calledWith(tmdbService.getTopRatedMovies, 1);
      sinon.assert.calledWith(res.json, mockResult);
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should get now playing movies successfully', async () => {
      req.query = { page: '1' };
      const mockResult = { results: [], page: 1 };

      sinon.stub(tmdbService, 'getNowPlayingMovies').resolves(mockResult);

      await MoviesController.getNowPlayingMovies(req, res);

      sinon.assert.calledWith(tmdbService.getNowPlayingMovies, 1);
      sinon.assert.calledWith(res.json, mockResult);
    });
  });
});
