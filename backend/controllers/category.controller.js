const Category = require('../models/category_model');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'خطا در دریافت دسته‌بندی‌ها' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
      success: true,
      message: 'دسته‌بندی با موفقیت ایجاد شد',
      data: newCategory
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'خطا در ذخیره دسته‌بندی' });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'دسته‌بندی یافت نشد' });
    }
    res.json({ success: true, data: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'خطا در دریافت دسته‌بندی' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'دسته‌بندی یافت نشد' });
    }
    res.json({ success: true, message: 'با موفقیت به‌روزرسانی شد', data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'خطا در به‌روزرسانی' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'دسته‌بندی یافت نشد' });
    }
    res.json({ success: true, message: 'با موفقیت حذف شد' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'خطا در حذف دسته‌بندی' });
  }
};