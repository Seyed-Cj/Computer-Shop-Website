const { verifyAdminToken } = require('../utils/adminJwt');

function isAdminAuthenticated(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'دسترسی نامعتبر.' });
  }

  try {
    const decoded = verifyAdminToken(token);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'توکن نامعتبر.' });
  }
}

module.exports = isAdminAuthenticated;