const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/', function(req, res){
  res.redirect('/main');
});

router.get('/main', function(req, res){
  res.render('main');
});

router.get('/signUp', function(req, res){
  res.render('signUp');
});

router.get('/login', function(req, res){
  res.render('login');
});


module.exports = router;
