import sinon from 'sinon';

// Mock TMDBService before importing the controller
const mockTMDBService = {
  searchMovies: sinon.stub(),
  getPopularMovies: sinon.stub(),
  getTopRatedMovies: sinon.stub(),
  getMovieDetails: sinon.stub(),
  getNowPlayingMovies: sinon.stub()
};
jest.mock('../services/tmdbService.js', () => ({
  __esModule: true,
  default: () => mockTMDBService
}));

import MoviesController from '../controllers/moviesController.js';

describe('Movies Controller', () => {
  let req, res, next;

  beforeEach(() => {
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

    // Reset all stubs
    Object.values(mockTMDBService).forEach(stub => stub.reset());
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

      mockTMDBService.searchMovies.resolves(mockResult);

      await MoviesController.searchMovies(req, res);

      sinon.assert.calledWith(mockTMDBService.searchMovies, 'test movie', 1);
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

      mockTMDBService.searchMovies.rejects(error);

      await MoviesController.searchMovies(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match({
        error: 'Failed to search movies',
        message: sinon.match.string
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

      mockTMDBService.getPopularMovies.resolves(mockResult);

      await MoviesController.getPopularMovies(req, res);

      sinon.assert.calledWith(mockTMDBService.getPopularMovies, 2);
      sinon.assert.calledWith(res.json, mockResult);
    });

    it('should use default page 1 when not provided', async () => {
      req.query = {};

      const mockResult = {
        results: [{ id: 1, title: 'Popular Movie' }],
        page: 1
      };

      mockTMDBService.getPopularMovies.resolves(mockResult);

      await MoviesController.getPopularMovies(req, res);

      sinon.assert.calledWith(mockTMDBService.getPopularMovies, 1);
      sinon.assert.calledWith(res.json, mockResult);
    });
  });

  describe('getMovieDetails', () => {
    it('should get movie details successfully', async () => {
      req.params = { id: '123' };

      const mockMovie = {
        id: 123,
        title: 'Test Movie',
        overview: 'Test description'
      };

      mockTMDBService.getMovieDetails.resolves(mockMovie);

      await MoviesController.getMovieDetails(req, res);

      sinon.assert.calledWith(mockTMDBService.getMovieDetails, 123);
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
      mockTMDBService.getMovieDetails.rejects(error);

      await MoviesController.getMovieDetails(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, {
        error: 'Movie not found'
      });
    });
  });
});
