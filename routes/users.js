const userRouter = require('express').Router();
const {
  createUser,
  findUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.post('/', createUser);

userRouter.get('/', findUsers);

userRouter.get('/:userId', getUserById);

userRouter.patch('/me', updateUser);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
