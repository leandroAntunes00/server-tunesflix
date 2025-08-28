import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function createTMDBService() {
    const apiKey = process.env.VITE_TMDB_API_KEY;
    const readAccessToken = process.env.VITE_TMDB_READ_ACCESS_TOKEN;

    const client = axios.create({
        baseURL: TMDB_BASE_URL,
        headers: {
            'Authorization': `Bearer ${readAccessToken}`,
            'Content-Type': 'application/json'
        }
    });

    function formatMoviesResponse(data) {
        return {
            ...data,
            results: data.results.map(movie => ({
                ...movie,
                poster_path: movie.poster_path
                    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                    : null,
                backdrop_path: movie.backdrop_path
                    ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
                    : null
            }))
        };
    }

    function formatMovieDetails(movie) {
        return {
            ...movie,
            poster_path: movie.poster_path
                ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                : null,
            backdrop_path: movie.backdrop_path
                ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
                : null
        };
    }

    async function searchMovies(query, page = 1) {
        if (!apiKey) {
            throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
        }

        try {
            const response = await client.get('/search/movie', {
                params: {
                    query,
                    page,
                    api_key: apiKey
                }
            });
            return formatMoviesResponse(response.data);
        } catch (error) {
            throw new Error(`Failed to search movies: ${error.message}`);
        }
    }

    async function getPopularMovies(page = 1) {
        if (!apiKey) {
            throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
        }

        try {
            const response = await client.get('/movie/popular', {
                params: {
                    page,
                    api_key: apiKey
                }
            });
            return formatMoviesResponse(response.data);
        } catch (error) {
            throw new Error(`Failed to get popular movies: ${error.message}`);
        }
    }

    async function getTopRatedMovies(page = 1) {
        if (!apiKey) {
            throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
        }

        try {
            const response = await client.get('/movie/top_rated', {
                params: {
                    page,
                    api_key: apiKey
                }
            });
            return formatMoviesResponse(response.data);
        } catch (error) {
            throw new Error(`Failed to get top rated movies: ${error.message}`);
        }
    }

    async function getMovieDetails(movieId) {
        if (!apiKey) {
            throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
        }

        try {
            const response = await client.get(`/movie/${movieId}`, {
                params: {
                    api_key: apiKey
                }
            });
            return formatMovieDetails(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                throw new Error('Movie not found');
            }
            throw new Error(`Failed to get movie details: ${error.message}`);
        }
    }

    async function getNowPlayingMovies(page = 1) {
        if (!apiKey) {
            throw new Error('TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file');
        }

        try {
            const response = await client.get('/movie/now_playing', {
                params: {
                    page,
                    api_key: apiKey
                }
            });
            return formatMoviesResponse(response.data);
        } catch (error) {
            throw new Error(`Failed to get now playing movies: ${error.message}`);
        }
    }

    return {
        searchMovies,
        getPopularMovies,
        getTopRatedMovies,
        getMovieDetails,
        getNowPlayingMovies
    };
}

export default createTMDBService;
