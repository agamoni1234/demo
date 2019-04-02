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

router.get('/register', function(req, res) {
  connection = dbConnection.dbConnection();
	var hashedPassword = bcrypt.hashSync(req.query.password, 8);
	var sql = "INSERT INTO `users` ( `email`, `passwordDigest`, `role`, `username`, `account_id`) VALUES ( "+req.query.email+" , '"+hashedPassword+"', 'USER', "+req.query.username+", '3')";
  connection.query( sql, function (error, results, fields) {
    if (error) return res.status(500).send({ auth: false })
    connection.end();
    
    var token = jwt.sign({ id: fields.insertId }, secret, {
      expiresIn: expiresIn // expires in 24 hours
    });	
    res.status(200).send({ auth: true, token: token });
  });
});



router.get('/me', function(req, res) {

  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
    next(user); // add this line
  });
});

router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

router.get('/login', function(req, res) {
  connection = dbConnection.dbConnection();
  var sql = "SELECT * FROM `users` where username = '"+req.query.username+"'";

  connection.query( sql, function (error, results, fields) {
    if (error){
      console.log("ERROR IN /login : ",error);
      return res.status(500).send({ auth: false })
    } 
    if(results.length == 0){ 
      console.log("ERROR IN /login : ",results);
      return res.status(500).send({ auth: false })
    }
    var passwordIsValid = bcrypt.compareSync(req.query.password, results[0].passwordDigest);
    if (!passwordIsValid) return res.status(401).send({ auth: false });
    var token = jwt.sign({ id: results[0].id }, secret, {
        expiresIn: expiresIn // expires in 24 hours
    });
    connection.end();
    res.status(200).send({ auth: true, token: token ,result: results});
  });
});

router.get('/logout', function(req, res) {
  console.log("LocalStorage : ",localStorage);
  res.status(200).send({ auth: true, token: token ,result: results});
});

module.exports = router;