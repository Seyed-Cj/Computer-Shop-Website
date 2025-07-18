const express = require('express');
const router = express.Router();

const productRoute = require('./api/product.route');
const categoryRoute = require('./api/category.route');
const userRoute = require('./api/user.route')
const adminRoute = require('./api/admin.route')

router.use('/product', productRoute);
router.use('/category', categoryRoute);
router.use('/auth', userRoute);
router.use('/admin', adminRoute);

module.exports = router