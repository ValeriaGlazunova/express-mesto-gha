const User = require('../models/user');
const InvalidDataError = require('../errors/InvalidDataError');
const NotFoundError = require('../errors/NotFoundError');

const options = { new: true };

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
      } else {
        next(error);
      }
    });
};

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((users) => res
      .send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InvalidDataError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`);
      } else {
        next(error);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`);
      } else {
        next(error);
      }
    });
};
