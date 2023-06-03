const router = require('express').Router();
const NotFoundError = require('../utils/errors/not-found-error');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { loginValidation, registrationValidation } = require('../utils/requestValidation');

router.post('/signin', loginValidation, login);
router.post('/signup', registrationValidation, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, err, next) => next(new NotFoundError('Неправильно задан Url')));

module.exports = router;
