const httpStatus = require('http-status');
const { serverErrorMessage } = require('../utils/constants');

const handlerErrors = (err, req, res, next) => {
  const { statusCode = httpStatus.INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === httpStatus.INTERNAL_SERVER_ERROR
        ? serverErrorMessage
        : message,
    });
  next();
};

module.exports = { handlerErrors };
