const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/', function(req, res){
  res.redirect('/login');
});

router.get('/main', function(req, res){
  res.render('main');
});

router.get('/signUp', function(req, res){
  res.render('signUp');
});

router.post('/signUp', function(req, res){
    //saving sign up information
  var newUsers = {
    name: req.body.NewUsername,
    password: req.body.NewPassword
  }
  //How I saved the input information to the SQL table
  var userInfo = models.users.build(newUsers);
    userInfo.save().then(function(){
      res.redirect('/userPage');
    })
});

router.get('/login', function(req, res){
    //If the User is already logged in this will check that
  if(req.session.username && req.session.username.length > 0){

  res.redirect('/userPage');
}else {
  res.render('login');
}
});

            //UserPage
router.get('/userPage', function(req, res){
  models.users.findAll().then(function(userInfo){
      //UserPage rendered with table data
    res.render('usersPage', {userStuff: userInfo});
  })
});

router.post('/main', function(req, res){
  res.redirect('/main');
});


module.exports = router;
