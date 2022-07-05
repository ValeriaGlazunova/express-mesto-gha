const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4,
});

app.use('/', userRouter);
app.use('/', cardsRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '62c1c2f535a3ff0adf38c449',
  };

  next();
});

app.use(errorsHandler);

app.use((req, res) => {
  res.status(404).send({ message: '404 - страница не найдена' });
});

app.listen(PORT, () => {
  console.log('app started', PORT);
});
