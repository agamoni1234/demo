var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const myEnv = require("dotenv").config({path: __dirname + '.env'}).parsed;
//var dotenv = require('dotenv').config({path: path.join(__dirname, '.env')})
const dbConnection = require('./db');
var VerifyToken = require('./Verify');
const secret = 'supersecret';
const expiresIn = 86400;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.use(function (user, req, res, next) {
  res.status(200).send(user);
});

function newUser() {
connection = dbConnection.dbConnection();
console.log(connection);
 var hashedPassword = bcrypt.hashSync('Fire@Pie257!', 8);
 console.log(hashedPassword);
//         var sql = "INSERT INTO `users` ( `email`, `passwordDigest`, `role`, `username`, `account_id`) VALUES ( 'cloudhiti@thirdeyedata.io' , hashedPassword, 'USER', 'cloudhiti', '3')";
// connection.query( sql, function (err, results, fields) {
//                  if (err) throw err;
//     		 console.log(result);
// });


 //connection.query("SELECT * FROM `users`", function (err, result, fields) {
   // if (err) throw err;
    //console.log(result);
  //});


}

newUser()
