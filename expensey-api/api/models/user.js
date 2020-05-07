const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    id: String,
    date: String,
    merchant: String,
    amount: String,
    category: String,
    description: String,
    tag: String,
    receiptImgLink: String,
    status : String
  });

const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name : String,
    email: String,
    password: String,
    imageLink: String,
    expenses: [expenseSchema],
    dkModeStatus : Boolean
  });  

const User = mongoose.model('user', userSchema);

module.exports = User;