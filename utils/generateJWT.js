const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const generateJWT = (id) => jwt.sign({ _id: id }, SECRET, { expiresIn: '7d' });

module.exports = { generateJWT };
