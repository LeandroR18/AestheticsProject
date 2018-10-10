var express = require('express');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = require('../../data/brands');
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, '../../data/brands.json')
  fs.writeFile(filePath, JSON.stringify(data))
}

router.get('/', function (req, res) {
  res.json(data.list);
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  var brand = lodash.find(data.list, function(b) {
    return b.id.toString() === id.toString();
  })
  if(brand)
  res.json(brand);
  else
  res.status(404).send('<h1>Error 404. Not Found</h1>');
});

router.get('/search/:name', function(req, res) {
  var nameBrand = req.params.name;
  var brands = lodash.filter(data.list, function(b) {
    return .indexOf(nameBrand) >= 0;
  })
  res.json(brands);
});

router.post('/', function(req, res) {
  var newBrands = req.body;
  data.list.push(newBrands);
  saveData(data);
  res.json(data.list);
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  var brand = lodash.find(data.list, function(b) {
    return b.id.toString() === id.toString();
  })
  if(brand === undefined){
  res.status(404).send('<h1>Error 404. Not Found</h1>');
}
  else{
  var brandRemove = lodash.remove(data.list, function(b){
    return b.id.toString() === id.toString();
  });
  saveData(data);
  res.json(data.list);
}
});

module.exports = router;
