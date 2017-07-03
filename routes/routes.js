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
  res.render('signUp', {errors: messages});
});

let messages;
router.post('/signUp', function(req, res){
  //validation checks
  messages = [];
  req.checkBody('NewUsername', 'Please enter at least 4 characters.').notEmpty();
  req.checkBody('NewUsername', 'Please no more than 12 characters for your username.').isLength({max:12});
  req.checkBody('NewPassword', 'Please enter at least 4 characters for your password.').notEmpty();
  req.checkBody('NewPassword', 'Let you password be no longer than 8 characters.').isLength({max:8});

  let errors = req.validationErrors();
    if(errors){
      errors.forEach(function(error){
        messages.push(error.msg);
        res.redirect('/signUp');
      })
    }else {
      models.users.findOne({
        where:{
          name: req.body.NewUsername,
          password: req.body.NewPassword
        }
      }).then(function(userExist){
        if(userExist){
          messages = ['The Username and/or Password already exist.'];
          res.redirect('/signUp');
        }
        else {
          //saving sign up information
          var newUsers = {
          name: req.body.NewUsername,
          password: req.body.NewPassword

          }
          //How I saved the input information to the SQL table.
          var userInfo = models.users.build(newUsers);
            userInfo.save().then(function(){
              res.redirect('/userPage');
            });
        }
        });
    }
});

router.get('/login', function(req, res){
    //If the User is already logged in this will check that.
  if(req.session.username && req.session.username.length > 0){

  res.redirect('/userPage');
}else {
  res.render('login');
}
});
      //Login Post
router.post('/logMeIn', function(req, res){

    //Check to see if User is logged in.
  models.users.findOne({
    where:{
      name: req.body.username
    }
  }).then(function(user){
    console.log(user);
    req.session.username = user;
    console.log(req.sesson);

    if(req.body.username === user.name){
      res.redirect('/userPage');
    }else{
      res.redirect('/login');
    }
  })
      //Need to add change to "loggedIn" to true.
      //When Logged out "loggedIn" will be changed to false.

  // else {
  //   res.status(401).send("Something went wrong.  :(    ");
  // }
});

            //UserPage
router.get('/userPage', function(req, res){
  models.users.findAll().then(function(userInfo){
  //     //UserPage rendered with table data.
    res.render('usersPage', {userStuff: userInfo});
  })
  res.render('usersPage');
});

router.post('/main', function(req, res){
  res.redirect('/main');
});

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/login');
})


module.exports = router;
