const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Ошибка авторизации');
  }
  let payload;
  try {
    payload = jwt.verify(token);
  } catch (error) {
    throw new UnauthorizedError('Ошибка авторизации');
  }
  req.user = payload;
  next();
};
