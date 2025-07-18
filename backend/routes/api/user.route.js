const express = require('express');
const router = express.Router();
const authController = require('../../controllers/user.controller');
const createRateLimiter = require('../../middlewares/rateLimiter')

const regRateLimiter = createRateLimiter({ max: 8, windowMs: 5 * 60 * 1000 });
router.post('/register', regRateLimiter, authController.Register);

const loginRateLimiter = createRateLimiter({ max: 8, windowMs: 5 * 60 * 1000 });
router.post('/login',loginRateLimiter , authController.Login);

router.post('/logout', authController.Logout);

const checkRateLimiter = createRateLimiter({ max: 8, windowMs: 5 * 60 * 1000 });
router.post('/check-login', checkRateLimiter, authController.checkLogin);

module.exports = router;