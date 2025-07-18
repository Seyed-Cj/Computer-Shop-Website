const bcrypt = require('bcrypt');
const { Admin, User } = require('../models/user_model');
const Product = require('../models/product_model');
const { generateAdminToken } = require('../utils/adminJwt');

exports.getDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const adminName = req.admin.name;
    const roleMap = {
      superadmin: 'مدیر کل',
      productManager: 'مدیر محصولات',
      orderManager: 'مدیر سفارشات',
      userManager: 'مدیر کاربران'
    };
    const adminRole = roleMap[req.admin.role] || 'مدیر';

    res.json({ success: true, data: { totalProducts, totalUsers, adminName, adminRole } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطا در دریافت اطلاعات' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: 'ایمیل یا رمز عبور اشتباه است' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'ایمیل یا رمز عبور اشتباه است' });

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateAdminToken(admin);

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: 'ورود با موفقیت انجام شد', data: { token } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطای ورود', error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true, message: 'خروج با موفقیت انجام شد' });
};

exports.getAll = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json({ success: true, data: admins });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطا در دریافت لیست', error: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const deleted = await Admin.findByIdAndDelete(adminId);
    if (!deleted) return res.status(404).json({ success: false, message: 'ادمین پیدا نشد' });

    res.json({ success: true, message: 'ادمین با موفقیت حذف شد' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطا در حذف', error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  const search = req.query.search || '';
  const query = {
    $or: [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') },
    ],
  };

  try {
    const users = await User.find(query).select('name email phone');
    const admins = await Admin.find().select('email');
    const adminEmails = admins.map(admin => admin.email);
    const filteredUsers = users.filter(user => !adminEmails.includes(user.email));

    res.json({ success: true, data: filteredUsers, search });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطا در دریافت کاربران' });
  }
};

exports.promoteToAdmin = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['superadmin', 'productManager', 'orderManager', 'userManager'].includes(role)) {
    return res.status(400).json({ success: false, message: 'نقش نامعتبر است' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'کاربر پیدا نشد' });

    const existingAdmin = await Admin.findOne({ email: user.email });
    if (existingAdmin)
      return res.status(400).json({ success: false, message: 'این کاربر قبلاً ادمین شده است' });

    const newAdmin = new Admin({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role,
      emailVerified: user.emailVerified,
    });

    await newAdmin.save();
    res.json({ success: true, message: 'کاربر با موفقیت به ادمین ارتقا یافت' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطا در ارتقا', error: err.message });
  }
};