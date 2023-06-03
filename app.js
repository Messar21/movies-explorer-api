require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { devDbUrl } = require('./utils/config');
const router = require('./routes');
const { cors } = require('./middlewares/cors');
const { handlerErrors } = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3100 } = process.env;
const { NODE_ENV, URL_DB } = process.env;

const mongodbUrl = NODE_ENV === 'production' ? URL_DB : devDbUrl;

mongoose.connect(mongodbUrl);

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // Логер запросов

app.use('/', router);

app.use(errorLogger); // Логер ошибок

app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
});
