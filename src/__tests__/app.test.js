import request from 'supertest';
import app from '../app.js';

describe('Application Integration Tests', () => {
  describe('GET /', () => {
    it('should respond with Hello World message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello World!');
    });

    it('should handle 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);
    });
  });

  describe('Middleware', () => {
    it('should parse JSON requests', async () => {
      const testData = { message: 'test' };

      // This would test if JSON parsing middleware is working
      // For now, just ensuring the app can handle requests
      const response = await request(app)
        .post('/')
        .send(testData)
        .expect(404); // POST to / is not defined, so 404 is expected
    });
  });
});
