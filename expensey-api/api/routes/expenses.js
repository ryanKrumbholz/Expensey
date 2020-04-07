const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

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

var Expense = mongoose.model("Expense",  expenseSchema);

function sleep(ms) {
    //Need to  use async await for this  to  work
    return new Promise(resolve => setTimeout(resolve, ms));
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
  }
  
  function updateExpense(id) {
    //TODO write function to update Expense in DB
  }
  
  function delExpense(id) {
    //TODO write function to delete Expense from DB
  }

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

module.exports = router;