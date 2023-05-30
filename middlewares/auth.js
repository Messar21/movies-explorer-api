const jwt = require('jsonwebtoken');
const Unauthorised = require('../utils/errors/unauth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorised('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = await jwt.verify(token, SECRET);
    } catch (err) {
      next(new Unauthorised('Необходима авторизация'));
      return;
    }
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { auth };
