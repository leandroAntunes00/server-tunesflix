import sinon from 'sinon';
import axios from 'axios';

describe('TMDB Service', () => {
  let tmdbService, clientStub;

  beforeEach(async () => {
    // Clear the module cache to allow re-import
    delete require.cache[require.resolve('../services/tmdbService.js')];

    // Set up environment variables for tests
    process.env.VITE_TMDB_API_KEY = 'test-api-key';
    process.env.VITE_TMDB_READ_ACCESS_TOKEN = 'test-token';
    process.env.NODE_ENV = 'test';

    // Import the service factory
    const tmdbModule = await import('../services/tmdbService.js');
    tmdbService = tmdbModule.default();

    // Stub axios.create to return a mock client
    const mockClient = {
      get: sinon.stub()
    };
    sinon.stub(axios, 'create').returns(mockClient);
    clientStub = mockClient.get;

    // Re-create the service with the stubbed axios
    tmdbService = tmdbModule.default();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              title: 'Test Movie',
              poster_path: '/test.jpg',
              backdrop_path: '/test-backdrop.jpg'
            }
          ],
          total_results: 1,
          total_pages: 1,
          page: 1
        }
      };

      clientStub.resolves(mockResponse);

      const result = await tmdbService.searchMovies('test');

      sinon.assert.calledOnce(clientStub);
      sinon.assert.calledWith(clientStub, '/search/movie', { params: { query: 'test', page: 1, api_key: 'test-api-key' } });
      expect(result.results[0].poster_path).toBe('https://image.tmdb.org/t/p/w500/test.jpg');
    });

    it('should handle API errors', async () => {
      clientStub.rejects(new Error('API Error'));

      await expect(tmdbService.searchMovies('test')).rejects.toThrow('Failed to search movies: API Error');
    });
  });

  describe('getPopularMovies', () => {
    it('should get popular movies', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 1, title: 'Popular Movie 1' },
            { id: 2, title: 'Popular Movie 2' }
          ]
        }
      };

      clientStub.resolves(mockResponse);

      const result = await tmdbService.getPopularMovies();

      sinon.assert.calledOnce(clientStub);
      sinon.assert.calledWith(clientStub, '/movie/popular');
      expect(result.results).toHaveLength(2);
      expect(result.results[0]).toEqual({
        id: 1,
        title: 'Popular Movie 1',
        poster_path: null,
        backdrop_path: null
      });
      expect(result.results[1]).toEqual({
        id: 2,
        title: 'Popular Movie 2',
        poster_path: null,
        backdrop_path: null
      });
    });
  });

  describe('getMovieDetails', () => {
    it('should get movie details successfully', async () => {
      const mockResponse = {
        data: {
          id: 123,
          title: 'Movie Details',
          poster_path: '/details.jpg',
          overview: 'Movie description'
        }
      };

      clientStub.resolves(mockResponse);

      const result = await tmdbService.getMovieDetails(123);

      sinon.assert.calledWith(clientStub, '/movie/123', {
        params: {
          api_key: 'test-api-key'
        }
      });

      expect(result.title).toBe('Movie Details');
    });

    it('should handle movie not found', async () => {
      const error = new Error('Not found');
      error.response = { status: 404 };
      clientStub.rejects(error);

      await expect(tmdbService.getMovieDetails(999)).rejects.toThrow('Movie not found');
    });
  });
});
