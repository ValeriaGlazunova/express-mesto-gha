const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, Joi, celebrate } = require('celebrate');
const { login, createUser } = require('./controllers/users');

const app = express();

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorsHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/NotFoundError');
const { linkRegExp } = require('./utils/constants');

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4,
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(linkRegExp),
    }),
  }),
  createUser,
);

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Такого пути не существует'));
});

app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
