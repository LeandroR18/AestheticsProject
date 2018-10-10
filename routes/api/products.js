var express = require('express');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = require('../../data/products');
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, '../../data/products.json')
  fs.writeFile(filePath, JSON.stringify(data))
}

router.get('/', function (req, res) {
  res.json(data.list);
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  var product = lodash.find(data.list, function(item) {
    return item.id.toString() === id.toString();
  })
  if(product)
  res.json(product);
  else
  res.status(404).send('<h1>Not Found</h1>');
});

router.get('/search/:name', function(req, res) {
  var name = req.params.name;
  var products = lodash.filter(data.list, function(item) {
    return item.name.indexOf(name) >= 0;
  })
  res.json(products);
});

router.post('/', function(req, res) {
  var newProduct = req.body;
  data.list.push(newProduct);
  saveData(data);
  res.json(data.list);
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var product = lodash.find(data.list, function (p) {
    return p.id.toString() === id.toString();
  });
  if (product) {
    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.stock = req.body.stock;
  }
  else {
    res.status(404).send('<h1> Error 404.Not Found </h1>');
  }
  saveData(data);
  res.json(data.list);
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  var product = lodash.find(data.list, function(p) {
    return p.id.toString() === id.toString();
  })
  if(product === undefined){
  res.status(404).send('<h1>Error 404. Not Found</h1>');
}
  else{
  var productRemove = lodash.remove(data.list, function(p){
    return p.id.toString() === id.toString();
  });
  saveData(data);
  res.json(data.list);
}
});

module.exports = router;
