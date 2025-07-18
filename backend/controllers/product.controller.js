const Product = require('../models/product_model');
const Category = require('../models/category_model');

exports.getProducts = async (req, res) => {
  const search = req.query.search || '';

  try {
    const query = search
      ? {
        $or: [
          { name: new RegExp(search, 'i') },
          { realName: new RegExp(search, 'i') },
          { brand: new RegExp(search, 'i') },
        ],
      }
      : {};

    const products = await Product.find(query).populate('category');
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطا در دریافت محصولات' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      realName,
      description,
      price,
      brand,
      category,
      stock,
      discountPercent,
      discountAmount,
    } = req.body;

    const specs = [];
    if (req.body.specKeys && req.body.specValues) {
      const keys = Array.isArray(req.body.specKeys) ? req.body.specKeys : [req.body.specKeys];
      const values = Array.isArray(req.body.specValues) ? req.body.specValues : [req.body.specValues];

      keys.forEach((key, i) => {
        if (key && values[i]) {
          specs.push({ key, value: values[i] });
        }
      });
    }

    const images = req.files?.map(file => '/uploads/' + file.filename) || [];

    const product = new Product({
      name,
      realName,
      description,
      price,
      brand,
      category,
      specs,
      images,
      stock,
      discountPercent: discountPercent || 0,
      discountAmount: discountAmount || 0,
    });

    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("Product Creation Error:", error);
    res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      realName,
      description,
      price,
      brand,
      category,
      stock,
      discountPercent,
      discountAmount,
    } = req.body;

    const specs = [];
    if (req.body.specKeys && req.body.specValues) {
      const keys = Array.isArray(req.body.specKeys) ? req.body.specKeys : [req.body.specKeys];
      const values = Array.isArray(req.body.specValues) ? req.body.specValues : [req.body.specValues];

      keys.forEach((key, i) => {
        if (key && values[i]) {
          specs.push({ key, value: values[i] });
        }
      });
    }

    const newImages = req.files?.map(file => '/uploads/' + file.filename) || [];
    const existingImages = Array.isArray(req.body.existingImages)
      ? req.body.existingImages
      : req.body.existingImages
        ? [req.body.existingImages]
        : [];

    const images = [...existingImages, ...newImages];

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        realName,
        description,
        price,
        brand,
        category,
        specs,
        images,
        stock,
        discountPercent: discountPercent || 0,
        discountAmount: discountAmount || 0,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
};