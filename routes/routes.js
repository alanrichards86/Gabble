const express = require('express');
const router = express.Router();
const models = require("../models");

let myMessages;
let user_message;
let Messages;
let userid;
let theLikes = [];
let the_user;

const getMessageId = function(req, res, next) {
  models.Comment.findById(req.params.commentId).then(function(action) {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).send("not found");
    }
  });
}

const the_likes = function (req,res,next) {
  theLikes = [];
  models.Like.findAll({
    where: {
      commentId: req.params.commentId
    }
  }).then(function (likes) {
    // console.log(likes);
    Like.forEach(function (like) {
      models.User.findById(like.userid).then(function(user) {
        // console.log(user);
        // console.log('theLikes LENGTH: ',theLikes.length);
        theLikes.push(user.name);
      })
      })
    next();
  });
}

router.get("/userPage",  function(req, res) {

  Messages = [];
  if (req.session.username) {
    models.Comment.findAll({
      include: [{
        model: models.User,
        as: "User"
      }, {
        model: models.Like,
        as: "Like"
      }],
      order: [
        ["createdAt", "DESC"]
      ]
    }).then(function(messages) {
      messages.forEach(function(message) {
        console.log("THIS IS USER!", message.dataValues);
        user_message = {
          id: message.id,
          body: message.body,
          userid: message.userid,
          the_user: message.name,
          Like: message.Like.length,
          was_liked: false,
          can_delete: false
        }

        Messages.push(user_message);
      });
    }).then(function(message_array) {
      Messages.forEach(function(message) {
        if (message.userid === userid) {
          message.can_delete = true;
        }
      })
      // console.log();
      // console.log();
      res.render("usersPage", {username: req.session.username,post: Messages , theLikes});
    });
  } else {
    res.redirect("/login");
  }
});

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
      models.User.findOne({
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
          var userInfo = models.User.build(newUsers);
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
  res.render('login', {error: messages});
}
});
      //Login Post
router.post('/logMeIn', function(req, res){

  messages = [];
    //Check to see if User is logged in.
  models.User.findOne({
    where:{
      name: req.body.username,
      password: req.body.password
    }
  }).then(user => {
    if(user){
    // console.log('LOOKY HERE', user.dataValues);
    req.session.username = user.name;
    req.session.password = user.password;
    // console.log("req.session",req.session);
     res.redirect('/userPage');

  }else{
      messages = ['Please try again. User / password does not exist.'];
      res.redirect('/login');
    // else if(req.body.password === user.password){
    // }else{
    //   messages = ['Please try again. User / password does not exist.'];
    //   return res.redirect('/login');
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
  models.User.findAll().then(function(userInfo){
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

// ------------------------Create Messages---------------------

router.get("/createMessage", function(req, res) {
  res.render("createMessage", {
    username: req.session.username
  });
});

router.post("/createMessage", function(req, res) {
  console.log('Im Here!', req.session.username);

  myMessages = {
    body: req.body.message_box,
    userid: userid,
    username: req.session.username,
    user: models.User.findOne({
      where: {
        id: userid
      }

    }).then(function(info) {
      if (info) {
        user = info.username;
        // console.log("the user name is:" + user);
      }
    })
  }
  console.log('This is hopefully Working', myMessages.username);

  models.Comment.create(myMessages).then(function(message) {
    res.redirect("userPage");
  });
});


// ----------------- Likes Section -------------------



module.exports = router;
