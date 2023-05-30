require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { devDbUrl } = require('./utils/config');
const router = require('./routes');
const { cors } = require('./middlewares/cors');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { handlerErrors } = require('./middlewares/handlerErrors');
const { loginValidation, registrationValidation } = require('./utils/requestValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { NODE_ENV, URL_DB } = process.env;

const mongodbUrl = NODE_ENV === 'production' ? URL_DB : devDbUrl;

mongoose.connect(mongodbUrl);

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // Логер запросов

app.post('/signin', loginValidation, login);
app.post('/signup', registrationValidation, createUser);
app.use(auth);
app.use('/', router);

app.use(errorLogger); // Логер ошибок

app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
});
