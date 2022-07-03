const userRouter = require('express').Router();
const {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.post('/users', createUser);

userRouter.get('/users', findUsers);

userRouter.get('/users/:userId', findUserById);

userRouter.patch('/users/me', updateUser);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
