const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { isAuthenticated, redirectIfAuthenticated } = require('../middlewares/auth');

router.get('/login', redirectIfAuthenticated, AuthController.showLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;
