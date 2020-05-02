const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    id: String,
    date: String,
    merchant: String,
    amount: Number,
    category: String,
    description: String,
    tag: String,
    receiptImgLink: String
  });

const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name : String,
    email: String,
    password: String,
    imageLink: String,
    expenses: [expenseSchema]
  });  

const User = mongoose.model('user', userSchema);

module.exports = User;