const userRouter = require('express').Router();
const { createUser, findUsers, findUserById } = require('../controllers/users');

userRouter.post('/', createUser);

userRouter.get('/users', findUsers);

userRouter.get('/users/:userId', findUserById);

module.exports = userRouter;
