const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../utils/generateJWT');
const ConflictError = require('../utils/errors/conflict-error');
const NotFoundError = require('../utils/errors/not-found-error');
const Unauthorised = require('../utils/errors/unauth-error');
const { existErrorMessage, loginErrorMessage, notFoundUserMessage } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      User.findOne({ _id: newUser._id })
        .then((createdUser) => {
          res.status(httpStatus.CREATED).send(createdUser);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(existErrorMessage));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorised(loginErrorMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorised(loginErrorMessage);
          }
          const token = generateJWT(user._id);
          return res.status(httpStatus.OK).send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundUserMessage);
      }
      return res.status(httpStatus.OK).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;
  User.findOneAndUpdate({ _id }, { $set: { name, email } }, { new: true, runValidators: true })
    .then((user) => {
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(existErrorMessage));
      }
      return next(err);
    });
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
