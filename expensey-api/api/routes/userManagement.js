const express = require('express');
var router = express.Router();
var password = require('password-hash-and-salt');
const User = require('../models/user');
require('dotenv').config();
const S3_BUCKET = process.env.S3_BUCKET;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');


// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

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
  
async function delUser(email, res) {
  console.log(email)
    User.findOneAndDelete({email: email}, () => {
      res.json("User deleted successfully");
    });

    if (await getUser(email)) {
      res.json("User failed to delete");
    }
      
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

async function addExpense(req, res) {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try { 
      var info = JSON.parse(fields.expense[0]);
      var currUser = await getUser(info.email);
      var query = currUser._id;
  var link;
  if (info.receiptImg) {
    link = await uploadImg(files, "receipts");
  }
  else {
    link = "";
  }
  var newExpense = 
    {
      id: info.id,
      date: info.date,
      dateNum: info.dateNum,
      merchant: info.merchant,
      amount: info.amount,
      category: info.category,
      description: info.description,
      ccData: info.ccData,
      tags: info.tags,
      receiptImgLink: link,
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
    catch(error) {
      console.log(error)
    }
  })
}

async function delExpense (data, res) {
  var email = data.email
  var id = data.id
  var currUser = await getUser(email);
  var query = currUser._id;
  var expenses = currUser.expenses;
  for (var i = 0; i < expenses.length; i++) {
    var expense = expenses[i]
    if (expense.id == id) {
      var tempArr = expenses.splice(i, 1);
      expenses = tempArr;
      break;
    }
  }

  User.findByIdAndUpdate(query, currUser, function(err, doc) {
    if (err){
      console.log(err);
      res.json('Expense failed to delete.');
    } 
    else{
      res.json('Expense deleted successfully.');
    }
    
  });
}

async function updateExpense (req, res) {
      var info = req.body;
      var currUser = await getUser(info.email);
      var query = currUser._id;
      var expenses = currUser.expenses;
      var newExpense = 
    {
      id: info.id,
      date: null,
      dateNum: null,
      merchant: info.merchant,
      amount: info.amount,
      category: info.category,
      description: info.description,
      ccData: null,
      tags: null,
      receiptImgLink: null,
      status : info.status
    };
      for (var i = 0; i < expenses.length; i++) {
        var expense = expenses[i]
        if (expense.id == newExpense.id) {
          newExpense.date = expense.date
          newExpense.dateNum = expense.dateNum
          newExpense.ccData = expense.ccData
          newExpense.tags = expense.tags
          newExpense.receiptImgLink = expense.receiptImgLink
          expenses[i] = newExpense;
          break;
        }
      }

      User.findByIdAndUpdate(query, currUser, function(err, doc) {
        if (err){
          console.log(err);
          res.json('Expense failed to update.');
        } 
        else{
          res.json('Expense updated successfully.');
        }
      });
}

async function uploadImg(files, folder) {
  const file = files.file[0];
  const path = file.path;
  const buffer = fs.readFileSync(path);
  const type = await fileType.fromBuffer(buffer);
  const timestamp = Date.now().toString();
  const name = `${folder}/${timestamp}-lg`;
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  s3.upload(params).promise();
  return `https://expensey.s3.us-east-2.amazonaws.com/${name}.jpg`;
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
router.post('/del_user', async function(req, res, next) {
  data = req.body

  delUser(data.email, res);
});

router.post('/update_user', async function(req, res, next) {
  var user = req.body
  var currUser = await getUser(user.email);
  var query = currUser._id;
  console.log(currUser, user)

    if (user.newEmail) {
      currUser.email =  user.newEmail;
    } 

    if (user.newPw) {
      password(user.currPW).verifyAgainst(currUser.password,function(error, verified) {
        if(error)
            throw new Error('Something went wrong!');
      if (verified) {
        password(user.newPw).hash(function(error, hash) {
          if(error) {
              throw new Error('Something went wrong!');
        }
        currUser.password = hash;
      });
      }
    })
  }

    User.findByIdAndUpdate(query, currUser, function(err, doc) {
      if (err){
        console.log(err);
        res.json('User failed to update.');
      } 
      else{
        res.json('User updated successfully.');
      }
      
    });
})


router.post('/user/dkmode', function(req, res, next) {
  var user = req.body
  var updateUser = getUser(user.email).then(data => {
    var query = data._id;
    data.dkModeStatus =  user.dkModeStatus;
    User.findByIdAndUpdate(query, data, function(err, doc) {
      if (err){
        console.log(err);
        res.json('Dark mode failed to update.');
      } 
      else{
        res.json('Dark mode status updated.');
      }
      
    });
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
  // var expenseInfo = req
  addExpense(req, res);
});

router.post('/expenses/del_expense', function(req, res, next) {
  var data = req.body
  delExpense(data, res);
});

router.post('/expenses/update_expense', function(req, res, next) {
  updateExpense(req, res);
});
  
module.exports = router;