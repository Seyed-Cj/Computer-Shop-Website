const rateLimit = require('express-rate-limit');

const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000,
    max: options.max || 10,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: options.message || 'تعداد درخواست‌ها زیاد است، لطفاً بعداً دوباره امتحان کنید.'
      });
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = createRateLimiter;