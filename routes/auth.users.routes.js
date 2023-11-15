const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.usersController');
const authMiddleware = require('../utils/auth.middleware');
const imageUpload = require('../utils/imageUpload');

router.post('/register', imageUpload.single('avatar'), auth.register);

router.post('/login', auth.login);

router.get('/user', auth.getUser)

router.delete('/logout', authMiddleware, auth.logout)

module.exports = router;