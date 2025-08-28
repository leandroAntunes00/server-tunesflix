import express from 'express';
import MoviesController from '../controllers/moviesController.js';

const router = express.Router();

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: Search movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing query parameter
 *       500:
 *         description: Server error
 */
router.get('/search', MoviesController.searchMovies);

/**
 * @swagger
 * /api/movies/popular:
 *   get:
 *     summary: Get popular movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Popular movies
 *       500:
 *         description: Server error
 */
router.get('/popular', MoviesController.getPopularMovies);

/**
 * @swagger
 * /api/movies/top-rated:
 *   get:
 *     summary: Get top rated movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Top rated movies
 *       500:
 *         description: Server error
 */
router.get('/top-rated', MoviesController.getTopRatedMovies);

/**
 * @swagger
 * /api/movies/now-playing:
 *   get:
 *     summary: Get now playing movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Now playing movies
 *       500:
 *         description: Server error
 */
router.get('/now-playing', MoviesController.getNowPlayingMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie details by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie details
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.get('/:id', MoviesController.getMovieDetails);

export default router;
