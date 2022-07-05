const { ERR_BAD_REQUEST } = require('../utils/constants');

class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = ERR_BAD_REQUEST;
  }
}

module.exports = InvalidDataError;
