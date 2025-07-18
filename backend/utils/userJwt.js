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

module.exports = { generateToken, verifyToken };