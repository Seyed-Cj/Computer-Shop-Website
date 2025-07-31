const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: 'توکن یافت نشد' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // شامل id, name
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'توکن نامعتبر است' });
  }
};

module.exports = { generateToken, verifyToken, authMiddleware };