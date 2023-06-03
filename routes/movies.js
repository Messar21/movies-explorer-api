const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { postMovieValidation, deleteMovieValidation } = require('../utils/requestValidation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', postMovieValidation, createMovie);
moviesRouter.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;