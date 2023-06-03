const httpStatus = require('http-status');

const handlerErrors = (err, req, res, next) => {
  const { statusCode = httpStatus.INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === httpStatus.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = { handlerErrors };
