const express = require('express')
const app = express()
const port = 9000
const mongoose = require('mongoose');
const dbConnection = "mongodb+srv://RAK100598:l6CJKwngRzUw6Jcw@expenseycluster-prt5l.mongodb.net/userData?retryWrites=true&w=majority";

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
  mongoose.connect(dbConnection,{useNewUrlParser: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
  });
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

function getUser(email) {
  //TODO get user from DB by email or ID  and turn back into user object
  const  doc = User.findOne({email: email});
  return (doc.toObject());
}

function updateUser(email) {
  //TODO write function to update user in DB
}

function delUser(email) {
  //TODO write function to delete user from DB
}

function authUser(email, pword) {
  var user  = getUser(email);
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

function getExpense(id) {
  //TODO get Expense from DB by ID  and turn back into object
  const  doc = Expense.findOne({id: id});
  return (doc.toObject());
}

function updateExpense(id) {
  //TODO write function to update Expense in DB
}

function delExpense(id) {
  //TODO write function to delete Expense from DB
}

estDB();

app.get('/api/user', (req,res) => {
  res.send();
});

app.get('/', (req,res) => {
  res.send();
});

app.listen(port, () => console.log("Server started on port ${port}"));