const jwt = require('jsonwebtoken');
const Unauthorised = require('../utils/errors/unauth-error');
const { devJWT } = require('../utils/config');
const { authErrorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : devJWT;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorised(authErrorMessage);
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = await jwt.verify(token, SECRET);
    } catch (err) {
      next(new Unauthorised(authErrorMessage));
      return;
    }
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { auth };
