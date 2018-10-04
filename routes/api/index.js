var express = require('express');
var products = require('./products');
var utils = require('./utils');
var providers = require('./users');
var brands = require('./brands');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('siempre se ejecuta...')
  next();
})

router.use('/products', products);
router.use('/utils', utils);
router.use('/users', users);
router.use('/brands', brands);

module.exports = router;
