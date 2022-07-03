const router = require('express').Router();
const { createUser, findUsers, findUserById } = require('../controllers/users');

router.post('/users', createUser);

router.get('/users', findUsers);

router.get('/users/:userId', findUserById);

module.exports = router;
