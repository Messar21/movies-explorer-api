const router = require('express').Router();
const NotFoundError = require('../utils/errors/not-found-error');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { postMovieValidation, deleteMovieValidation, patchUserValidation } = require('../utils/requestValidation');
const { getUser, updateUser } = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', patchUserValidation, updateUser);
router.get('/movies', getMovies);
router.post('/movies', postMovieValidation, createMovie);
router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

router.use('*', (req, err, next) => next(new NotFoundError('Неправильно задан Url')));

module.exports = router;
