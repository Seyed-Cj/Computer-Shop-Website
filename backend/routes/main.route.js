const express = require('express');
const router = express.Router();

const productRoute = require('./api/product.route');
const categoryRoute = require('./api/category.route');

router.use('/product', productRoute);
router.use('/category', categoryRoute);

module.exports = router