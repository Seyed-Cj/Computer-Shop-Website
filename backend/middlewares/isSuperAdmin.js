const { verifyAdminToken } = require('../utils/adminJwt');

function isSuperAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'برای دسترسی ابتدا وارد شوید' });
  }

  try {
    const decoded = verifyAdminToken(token);
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'شما دسترسی لازم را ندارید' });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    res.clearCookie('adminToken');
    return res.status(401).json({ success: false, message: 'توکن شما نامعتبر است. لطفاً دوباره وارد شوید.' });
  }
}

module.exports = isSuperAdmin;
