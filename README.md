# Server Tunesflix

A Node.js project with Express organized in MVC pattern using ES modules.

## Project Structure

- `src/` - Source code
  - `controllers/` - Request handlers
  - `models/` - Data models
  - `routes/` - Route definitions
  - `middleware/` - Custom middleware
  - `config/` - Configuration files
  - `app.js` - Express app setup
  - `server.js` - Server entry point

## Installation

npm install

## Running

npm start

## Testing

The project includes a comprehensive test suite with unit tests, integration tests, and mocks.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

- `src/__tests__/` - Test files
  - `homeController.test.js` - Unit tests for home controller
  - `homeController.mock.test.js` - Tests with mocks using Sinon
  - `homeRoutes.test.js` - Route testing with Supertest
  - `app.test.js` - Integration tests for the application
- `src/setup.js` - Jest setup file for global configurations

### Testing Stack

- **Jest** - Testing framework
- **Supertest** - HTTP endpoint testing
- **Sinon** - Mocks, stubs, and spies
- **Babel** - ES modules transformation for tests

## Deployment

### Heroku

1. **Prerequisites:**
   - Heroku CLI installed
   - Git repository initialized
   - TMDB API credentials

2. **Deploy Steps:**
   ```bash
   # Login to Heroku
   heroku login

   # Create Heroku app
   heroku create your-app-name

   # Set environment variables
   heroku config:set VITE_TMDB_API_KEY=your_api_key
   heroku config:set VITE_TMDB_READ_ACCESS_TOKEN=your_token
   heroku config:set CORS=https://your-frontend-domain.vercel.app
   heroku config:set NODE_ENV=production

   # Deploy
   git push heroku main
   ```

3. **Environment Variables:**
   - `VITE_TMDB_API_KEY` - Your TMDB API key
   - `VITE_TMDB_READ_ACCESS_TOKEN` - Your TMDB read access token
   - `CORS` - Frontend domain for CORS (e.g., `https://your-app.vercel.app`)
   - `NODE_ENV` - Set to `production`
   - `PORT` - Automatically set by Heroku

### API Endpoints

- `GET /` - Health check
- `GET /api/movies/search?q={query}&page={page}` - Search movies
- `GET /api/movies/popular?page={page}` - Get popular movies
- `GET /api/movies/top-rated?page={page}` - Get top rated movies
- `GET /api/movies/now-playing?page={page}` - Get now playing movies
- `GET /api/movies/{id}` - Get movie details
- `GET /api-docs` - Swagger documentation

### Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TMDB API** - Movie database
- **Swagger/OpenAPI** - API documentation
- **CORS** - Cross-origin resource sharing
- **Jest** - Testing framework
- **ES Modules** - Modern JavaScript modules
