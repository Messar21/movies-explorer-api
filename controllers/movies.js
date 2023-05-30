const httpStatus = require('http-status');
const Movies = require('../models/movies');
const NotFoundError = require('../utils/errors/not-found-error');
const ForbiddenError = require('../utils/errors/forbidden-error');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const { _id } = req.user;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((newMovie) => {
      res.status(httpStatus.CREATED).send(newMovie);
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movies.find({})
    .populate('owner')
    .then((movies) => {
      res.status(httpStatus.OK).send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;
  Movies.findOne({ _id: movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким _id не найден');
      }
    })
    .then(() => {
      Movies.findOneAndDelete({ _id: movieId, owner: userId })
        .then((movie) => {
          if (!movie) {
            throw new ForbiddenError('Доступ запрещен!');
          }
          res.status(httpStatus.OK).send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};