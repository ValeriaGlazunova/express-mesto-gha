const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'карточка не создана' }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(500).send({ message: 'карточка не найдена' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'карточка не удалена' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.paarams.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'лайк не поставлен' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'лайк не удален' }));
};
