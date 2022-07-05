const userRouter = require('express').Router();
const {
  createUser,
  findUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.post('/users', createUser);

userRouter.get('/users', findUsers);

userRouter.get('/users/:userId', getUserById);

userRouter.patch('/users/me', updateUser);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
