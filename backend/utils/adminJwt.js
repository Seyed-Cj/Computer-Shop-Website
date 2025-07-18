const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

function generateAdminToken(admin) {
  return jwt.sign(
    {
      id: admin._id,
      name: admin.name,
      role: admin.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyAdminToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateAdminToken,
  verifyAdminToken
};