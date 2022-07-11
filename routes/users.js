const userRouter = require('express').Router();
const {
  findUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', findUsers);

userRouter.get('/:userId', getUserById);

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUser);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
