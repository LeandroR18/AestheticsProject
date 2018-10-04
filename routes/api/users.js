var express = require('express');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = require('../../data/users');
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, '../../data/users.json')
  fs.writeFile(filePath, JSON.stringify(data))
}

router.get('/', function (req, res) {
  res.json(data.list);
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  var user = lodash.find(data.list, function(u) {
    return u.id.toString() === id.toString();
  })
  if(user)
  res.json(user);
  else
  res.status(404).send('<h1>Not Found</h1>');
});

router.get('/search/:name', function(req, res) {
  var name = req.params.name;
  var users = lodash.filter(data.list, function(u) {
    return u.name.indexOf(users) >= 0;
  })
  res.json(users);
});

router.post('/', function(req, res) {
  var newUser = req.body;
  data.list.push(newUser);
  saveData(data);
  res.json(data.list);
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  var user = lodash.remove(data.list, function(u) {
    return u.id.toString() === id.toString();
  })
  if(user)
  res.json(user);
  saveData(data);
  else
  res.status(404).send('<h1>Not Found</h1>');
});

module.exports = router;
