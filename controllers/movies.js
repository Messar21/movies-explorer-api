const httpStatus = require('http-status');
const Movies = require('../models/movies');
const NotFoundError = require('../utils/errors/not-found-error');
const ForbiddenError = require('../utils/errors/forbidden-error');
const { movieNotFoundMessage, forbiddenErrorMessage, deleteMovieMessage } = require('../utils/constants');

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
  const { _id } = req.user;
  Movies.find({ owner: _id })
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
        throw new NotFoundError(movieNotFoundMessage);
      }
    })
    .then(() => {
      Movies.findOneAndDelete({ _id: movieId, owner: userId })
        .then((movie) => {
          if (!movie) {
            throw new ForbiddenError(forbiddenErrorMessage);
          }
          res.status(httpStatus.OK).send({ message: deleteMovieMessage });
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
