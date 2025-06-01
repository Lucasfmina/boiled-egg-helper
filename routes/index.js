var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mole', function (req, res) {
  res.render('timer', { 'time': 1 });
});

router.get('/ao-ponto', function (req, res) {
  res.render('timer', { 'time': 2 });
});

router.get('/dura', function (req, res) {
  res.render('timer', { 'time': 3 });
});


module.exports = router;
