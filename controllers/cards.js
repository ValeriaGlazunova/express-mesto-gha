const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const InvalidDataError = require('../errors/InvalidDataError');
const ErrForbidden = require('../errors/ErrForbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
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
      } else if (String(card.owner._id) !== req.user._id) {
        throw new ErrForbidden('Нет прав у текущего пользователя');
      } else {
        card.remove()
          .then(() => res.status(200).send({ card }));
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка на нейдена');
      }
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка на нейдена');
      }
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};
