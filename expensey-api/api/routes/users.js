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

router.post('/adduser', async function(req, res, next) {
  //Messages to respond and console log
  var resMessages = [
    "Account created successfully",
    "Account creation failed",
    "Account already exist"
  ];

  var newUser = new User(req.body);

  //checking if user already exist in db
  getUser(newUser.email).then(x => {
    if (x) {
      console.log(resMessages[2]);
      res.json(resMessages[2]);
    }
    else  {
      saveUser(newUser);
    }
  });

  //sleeping because of network delay
  await sleep(2000);

  //Checking if account creation was successful
  getUser(newUser.email).then(x => {
    if (x) {
      console.log(resMessages[0]);
      res.json(resMessages[0]);
    }
    else  {
      console.log(resMessages[1]);
      res.json(resMessages[1]);
    }
  });
});

  router.post('/login', function(req, res, next) {
    //Login response messages
    var resMessages = [
      "Account authorization successful!",
      "Account authorization failed!"
    ];
    
    var user = req.body;

    authUser(user.email, user.password).then(x => {
      if (x) {
        res.json(resMessages[0]);
      }
      else {
        res.json(resMessages[1]);
      }
    });

});
  


module.exports = router;