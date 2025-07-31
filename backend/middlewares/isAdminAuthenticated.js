const { verifyAdminToken } = require('../utils/adminJwt');

function isAdminAuthenticated(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(403).json({ success: false, message: 'شما دسترسی لازم را ندارید' });
  }

  try {
    const decoded = verifyAdminToken(token);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'شما دسترسی لازم را ندارید' });
  }
}

module.exports = isAdminAuthenticated;