const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const dbCon = process.env.DB_CONNECT;
var bodyParser = require('body-parser');
var cors = require("cors");
var usersApiRoute = require("./routes/userManagement");
var fs = require('fs');
var https = require('https');

function estDB() {
  //establishes connection to db
  mongoose.connect(dbCon,{useNewUrlParser: true, useUnifiedTopology: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
  });
}

estDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", usersApiRoute);
app.use(express.json());
app.get('/api', (req,res) => {
  res.send();
});

// https.createServer({
//   key: fs.readFileSync('host.key'),
//   cert: fs.readFileSync('host.cert')
// }, app)
// .listen(port, () => console.log("Server started on port " + port));

app.listen(port, () => console.log("Server started on port " + port));