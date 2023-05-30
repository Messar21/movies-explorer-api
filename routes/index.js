const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../utils/errors/not-found-error');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, err, next) => next(new NotFoundError('Неправильно задан Url')));

module.exports = router;
