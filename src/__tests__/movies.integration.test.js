// Set up test environment variables before importing app
process.env.VITE_TMDB_API_KEY = 'test-api-key';
process.env.VITE_TMDB_READ_ACCESS_TOKEN = 'test-token';
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';
process.env.CORS = 'http://localhost:3000';

import request from 'supertest';
import sinon from 'sinon';
import app from '../app.js';
import TMDBService from '../services/tmdbService.js';

describe('Movies API Integration Tests', () => {
  let tmdbService;

  beforeEach(() => {
    // Create TMDBService instance after environment variables are set
    tmdbService = new TMDBService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /api/movies/search', () => {
    it('should search movies successfully', async () => {
      const mockSearchResult = {
        results: [
          {
            id: 1,
            title: 'Test Movie',
            poster_path: '/test.jpg',
            overview: 'Test description'
          }
        ],
        page: 1,
        total_results: 1,
        total_pages: 1
      };

      sinon.stub(tmdbService, 'searchMovies').resolves(mockSearchResult);

      const response = await request(app)
        .get('/api/movies/search?q=test&page=1')
        .expect(200);

      expect(response.body).toEqual(mockSearchResult);
      sinon.assert.calledWith(tmdbService.searchMovies, 'test', 1);
    });

    it('should return 400 when query is missing', async () => {
      const response = await request(app)
        .get('/api/movies/search')
        .expect(400);

      expect(response.body).toEqual({
        error: 'Query parameter is required'
      });
    });
  });

  describe('GET /api/movies/popular', () => {
    it('should get popular movies', async () => {
      const mockPopularResult = {
        results: [
          {
            id: 1,
            title: 'Popular Movie',
            poster_path: '/popular.jpg'
          }
        ],
        page: 1,
        total_results: 1,
        total_pages: 1
      };

      sinon.stub(tmdbService, 'getPopularMovies').resolves(mockPopularResult);

      const response = await request(app)
        .get('/api/movies/popular?page=1')
        .expect(200);

      expect(response.body).toEqual(mockPopularResult);
    });
  });

  describe('GET /api/movies/top-rated', () => {
    it('should get top rated movies', async () => {
      const mockTopRatedResult = {
        results: [
          {
            id: 1,
            title: 'Top Rated Movie',
            vote_average: 9.0
          }
        ],
        page: 1,
        total_results: 1,
        total_pages: 1
      };

      sinon.stub(tmdbService, 'getTopRatedMovies').resolves(mockTopRatedResult);

      const response = await request(app)
        .get('/api/movies/top-rated?page=1')
        .expect(200);

      expect(response.body).toEqual(mockTopRatedResult);
    });
  });

  describe('GET /api/movies/now-playing', () => {
    it('should get now playing movies', async () => {
      const mockNowPlayingResult = {
        results: [
          {
            id: 1,
            title: 'Now Playing Movie',
            release_date: '2023-12-01'
          }
        ],
        page: 1,
        total_results: 1,
        total_pages: 1
      };

      sinon.stub(tmdbService, 'getNowPlayingMovies').resolves(mockNowPlayingResult);

      const response = await request(app)
        .get('/api/movies/now-playing?page=1')
        .expect(200);

      expect(response.body).toEqual(mockNowPlayingResult);
    });
  });

  describe('GET /api/movies/:id', () => {
    it('should get movie details', async () => {
      const mockMovieDetails = {
        id: 123,
        title: 'Movie Details',
        overview: 'Detailed description',
        poster_path: '/details.jpg'
      };

      sinon.stub(tmdbService, 'getMovieDetails').resolves(mockMovieDetails);

      const response = await request(app)
        .get('/api/movies/123')
        .expect(200);

      expect(response.body).toEqual(mockMovieDetails);
    });

    it('should return 404 for invalid movie ID', async () => {
      const response = await request(app)
        .get('/api/movies/invalid')
        .expect(400);

      expect(response.body).toEqual({
        error: 'Invalid movie ID'
      });
    });
  });
});
