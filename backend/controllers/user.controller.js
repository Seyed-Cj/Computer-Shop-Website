const bcrypt = require('bcrypt');
const { User } = require('../models/user_model');
const { generateToken } = require('../utils/userJwt');

exports.Register = async (req, res) => {
  try {
    const { name, family, email, phone, password, confirmPassword } = req.body;

    if (!name || !family || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'لطفاً همه فیلدها را پر کنید.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'رمز عبور و تکرار آن مطابقت ندارند.' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'این شماره قبلاً ثبت شده است.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      family,
      email,
      phone,
      password: hashedPassword,
      emailVerified: false,
      lastLogin: null,
      cart: [],
      orders: [],
      whishlist: [],
      loyaltyPoints: 0
    });

    await user.save();

    res.status(201).json({ success: true, message: 'ثبت‌نام با موفقیت انجام شد.', data: { id: user._id, phone: user.phone } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.' });
  }
};

exports.Login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ success: false, message: 'شماره تلفن و رمز عبور لازم است.' });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ success: false, message: 'کاربری با این شماره وجود ندارد.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'رمز عبور اشتباه است.' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: 'ورود موفقیت‌آمیز بود.', data: { token } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.' });
  }
};

exports.Logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'خروج با موفقیت انجام شد.' });
};

exports.checkLogin = async (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^09\d{9}$/.test(phone)) {
    return res.status(400).json({ success: false, message: 'شماره تلفن معتبر نیست.' });
  }

  try {
    const user = await User.findOne({ phone });

    if (user) {
      return res.json({ success: true, exists: true, message: 'کاربر یافت شد.' });
    } else {
      return res.json({ success: true, exists: false, message: 'کاربر یافت نشد.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'خطا در بررسی شماره. لطفاً دوباره تلاش کنید.' });
  }
};