const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/', function(req, res){
  res.render('main');
});




module.exports = router;
