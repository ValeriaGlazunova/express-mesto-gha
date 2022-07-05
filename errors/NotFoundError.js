const { ERR_NOT_FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = ERR_NOT_FOUND;
  }
}

module.exports = NotFoundError;
