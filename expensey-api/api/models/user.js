const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    id: String,
    date: String,
    dateNum: String,
    merchant: String,
    amount: String,
    category: String,
    description: String,
    tag: String,
    receiptImgLink: String,
    status : String, //ex. unreported
    ccData : String //ex. amex 1234
  });

const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name : String,
    email: String,
    password: String,
    imageLink: String,
    dkModeStatus : Boolean,
    expenses: [expenseSchema]
  });  

const User = mongoose.model('user', userSchema);

module.exports = User;