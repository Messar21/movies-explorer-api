const usersRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { patchUserValidation } = require('../utils/requestValidation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', patchUserValidation, updateUser);

module.exports = usersRouter;
