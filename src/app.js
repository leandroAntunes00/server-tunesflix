import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TunesFlix API',
      version: '1.0.0',
      description: 'API for movie search using TMDB',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Local server with custom port',
      }
    ],
    components: {
      schemas: {
        Movie: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'TMDB movie ID'
            },
            title: {
              type: 'string',
              description: 'Movie title'
            },
            overview: {
              type: 'string',
              description: 'Movie overview'
            },
            poster_path: {
              type: 'string',
              description: 'Poster image URL'
            },
            release_date: {
              type: 'string',
              description: 'Release date'
            },
            vote_average: {
              type: 'number',
              description: 'Average vote rating'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            },
            message: {
              type: 'string',
              description: 'Detailed error message'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Movies',
        description: 'Movie search and details endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors({
  origin: process.env.CORS || '*',
  credentials: true
}));
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
import homeRoutes from './routes/home.js';
import movieRoutes from './routes/movies.js';

app.use('/', homeRoutes);
app.use('/api/movies', movieRoutes);

export default app;
