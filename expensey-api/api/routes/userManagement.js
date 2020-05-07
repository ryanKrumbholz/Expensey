const express = require('express');
var router = express.Router();
var password = require('password-hash-and-salt');
const User = require('../models/user');

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
    user.save((err, user) => {
      if (err) return console.error(err);
    });
  }
  
function createUser(user) {
      var id = Date.now();
      
      password(user.password).hash(function(error, hash) {
        if(error)
            throw new Error('Something went wrong!');
     
      saveUser(new User({
        id: id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hash,
        imageLink: '',
        dkModeStatus: false
      }));
    });
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
  
function delUser(email) {
    //TODO test function
    User.findByIdAndDelete({email : email});
  }
  
async function authUser(email, pword, res) {
    var user  = await getUser(email);
    var resMessages = [
      "Account authorization successful!",
      "Account authorization failed!",
      "Account does not exist"
    ];

    if (user) {
      password(pword).verifyAgainst(user.password, function(error, verified) {
        if(error)
            throw new Error('Something went wrong!');
        if(!verified) {
          res.json(resMessages[1]);
          console.log(resMessages[1]);
        } else {
            res.json([resMessages[0],[user.id, user.first_name + " " + user.last_name, user.email]]);
            console.log(resMessages[0]);
        }
      });
    }
    else {
      res.json(resMessages[2]);
      console.log(resMessages[2]);
    }
  }

async function getExpenses(user, res) {
  var currUser = await user;
  res.json(currUser.expenses);
}

async function addExpense(info, res) {
  var currUser = await getUser(info.email);
  console.log(info);
  var query = currUser._id;
  var newExpense = 
    {
      id: info.id,
      date: info.date,
      merchant: info.merchant,
      amount: info.amount,
      category: info.category,
      description: info.description,
      tag: info.tag,
      receiptImgLink: info.link,
      status : info.status
    };

  currUser.expenses.push(newExpense);

  User.findByIdAndUpdate(query, currUser, function(err, doc) {
    if (err){
      console.log(err);
      res.json('Expense failed to save.');
    } 
    else{
      res.json('Expense saved successfully.');
    }
    
  });

}

router.post('/', function(req, res, next) {
    getAllUsers().then(x => {
      res.json(x);
    });
});

router.post('/user', function(req, res, next) {
  var user = req.body;
  getUser(user.email).then(x => {
    res.json(x);
  });
});

//TODO get email from post request from react
router.post('/del_user', function(req, res, next, email) {
  delUser(email).then(x => {
    res.json(x);
  });
});

//TODO get email from post request from react
router.post('/user', function(req, res, next, email) {
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
      createUser(newUser);
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
    var user = req.body;
    authUser(user.email, user.password, res);
});

router.post('/expenses', function(req, res, next) {
  var email = req.body.email;
  var user = getUser(email);
  getExpenses(user, res);
});

router.post('/expenses/add_expense', function(req, res, next) {
  var expenseInfo = req.body;
  addExpense(expenseInfo, res);
});



  
module.exports = router;