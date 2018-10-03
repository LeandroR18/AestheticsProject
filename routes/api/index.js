var express = require('express');
var products = require('./products');
var utils = require('./utils');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('siempre se ejecuta...')
  next();
})

router.use('/products', products);
router.use('/utils', utils);


module.exports = router;
