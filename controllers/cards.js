const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const InvalidDataError = require('../errors/InvalidDataError');

const options = { new: true };

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const likes = [];

  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`);
      } else {
        next(error);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка для удаления не найдена');
      }
      res.status(200).send({ card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, options)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка на нейдена');
      }
      res.status(200).send({ card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`);
      } else {
        next(error);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, options)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка на нейдена');
      }
      res.status(200).send({ card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`);
      } else {
        next(error);
      }
    });
};
