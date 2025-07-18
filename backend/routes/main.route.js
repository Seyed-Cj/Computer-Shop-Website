const express = require('express')
const router = express.Router()

const productRoute = require('./api/product.route')

router.use('/product', productRoute)

module.exports = router