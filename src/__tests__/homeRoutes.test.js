import request from 'supertest';
import express from 'express';
import homeRoutes from '../routes/home.js';

const app = express();
app.use('/', homeRoutes);

describe('Home Routes', () => {
  describe('GET /', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
    });

    it('should return "Hello World!" message', async () => {
      const response = await request(app).get('/');

      expect(response.text).toBe('Hello World!');
    });

    it('should have correct content type', async () => {
      const response = await request(app).get('/');

      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  });
});
