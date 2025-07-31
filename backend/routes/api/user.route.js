const express = require('express');
const router = express.Router();
const authController = require('../../controllers/user.controller');
const createRateLimiter = require('../../middlewares/rateLimiter')
const { authMiddleware } = require('../../utils/userJwt')

const regRateLimiter = createRateLimiter({ max: 8, windowMs: 5 * 60 * 1000 });
router.post('/signup', regRateLimiter, authController.Signup);

const loginRateLimiter = createRateLimiter({ max: 25, windowMs: 5 * 60 * 1000 });
router.post('/login',loginRateLimiter , authController.Login);

router.post('/logout', authController.Logout);

const checkRateLimiter = createRateLimiter({ max: 8, windowMs: 5 * 60 * 1000 });
router.post('/check-login', checkRateLimiter, authController.checkLogin);

router.post('/me', authMiddleware, authController.checkToken);

module.exports = router;