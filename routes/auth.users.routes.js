const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.usersController');
const authMiddleware = require('../utils/auth.middleware');

router.post('/register', auth.register);

router.post('/login', auth.login);

router.get('/user', authMiddleware, auth.getUser)

router.delete('/logout', authMiddleware, auth.logout)

module.exports = router;