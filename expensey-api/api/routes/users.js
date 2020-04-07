const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String,
    imageLink: String
  });

  
var User = mongoose.model("User", userSchema);

function sleep(ms) {
    //Need to  use async await for this  to  work
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function getAllUsers() {
    var userList = [];
    (User.find({})
    .exec((err, users) => {
     if (err) return handleError(err);
     else {
      userList = users;
     }
     }));
     await sleep(500);
     return await userList;
  }
  
function saveUser(user) {
    user.save( (err, user) => {
      if (err) return console.error(err);
    });
  }
  
function createUser(username, email, password, imageLink) {
    var id = Date.now();
    saveUser(new User({
      id: id,
      username: username,
      email: email,
      password: password,
      imageLink: imageLink
    }));
  }
  
async function getUser(email) {
    var userObj = {};
    (User.findOne({email : email})
    .exec((err, user) => {
     if (err) return handleError(err);
     else {
      userObj = user;
     }
     }));
     await sleep(500);
     return await userObj;
  }
  
function updateUser(email) {
    //TODO write remaining needed code and test function
    User.findByIdAndUpdate({email : email});
    
  }
  
function delUser(email) {
    //TODO test function
    User.findByIdAndDelete({email : email});
  }
  
async function authUser(email, pword) {
    var user  = await getUser(email);
    if (user.password ==  pword) {
      return true;
    }
    else {
      return false;
    }
  }

router.get('/', function(req, res, next) {
    getAllUsers().then(x => {
      res.json(x);
    });
});

router.get('/user', function(req, res, next) {
  res.json('');
  // getUser(email).then(x => {
  //   res.json(x);
  // });
});

//TODO get email and pword from post request from react
router.get('/authuser', function(req, res, next, email, pword) {
  authUser(email, pword).then(x => {
    res.json(x);
  });
});

//TODO get email from post request from react
router.get('/deluser', function(req, res, next, email) {
  delUser(email).then(x => {
    res.json(x);
  });
});

//TODO get email from post request from react
router.get('/user', function(req, res, next, email) {
  updateUser(email).then(x => {
    res.json(x);
  });
});

//TODO create user from post request from react
router.get('/createuser', function(req, res, next) {
  res.json('x')
  // authUser(email, pword).then(x => {
  //   res.json(x);
  // });
});

module.exports = router;