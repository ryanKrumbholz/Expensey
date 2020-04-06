const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = 9000;
const dbCon = process.env.DB_CONNECT;
var bodyParser = require('body-parser')
var test = null;

var userSchema = new mongoose.Schema({
  id: String,
  username: String,
  email: String,
  password: String,
  imageLink: String
});

var expenseSchema = new mongoose.Schema({
  id: String,
  date: String,
  merchant: String,
  amount: Number,
  category: String,
  description: String,
  tag: String,
  receiptImgLink: String
});

var User = mongoose.model("User", userSchema);
var Expense = mongoose.model("Expense",  expenseSchema);

function estDB() {
  //establishes connection to db
  mongoose.connect(dbCon,{useNewUrlParser: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
  });
}

function sleep(ms) {
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

function saveExpense(expense) {
  expense.save( (err, user) => {
    if (err) return console.error(err);
  });
}

function createExpense(username, date, merchant, amount, category, description, tag, link) {
  var id = username  +  date.now().toString();
  saveExpense(new Expense({
    id: id,
    date: date,
    merchant: merchant,
    amount: amount,
    category: category,
    description: description,
    tag: tag,
    receiptImgLink: link
  }));
}

function getExpense(res, id) {
  //TODO get Expense from DB by ID  and turn back into object
  Expenses.findOne({id : id})
  .exec(function (err, expense) {
   if (err) return handleError(err);
   res.json(expense.toObject());
   });
}

function updateExpense(id) {
  //TODO write function to update Expense in DB
}

function delExpense(id) {
  //TODO write function to delete Expense from DB
}

estDB();


authUser('krumbholz98@gmail.com', '123456').then(x =>{
  console.log(x);
});


app.get('/api/users', async (req,res) => {
  users = await getAllUsers();
  res.send(users);
});

// authUser('krumbholz98@gmail.com', '123456');

app.get('/', (req,res) => {
  res.send();
});

app.listen(port, () => console.log("Server started on port " + port));
