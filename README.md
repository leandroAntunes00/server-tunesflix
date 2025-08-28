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
