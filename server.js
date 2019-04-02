'use strict';

const express = require('express');
const myEnv = require("dotenv").config({path: __dirname + '/process.env'}).parsed;
var path= require("path");
//var http= require("http");
var helmet = require('helmet');
var bodyParser = require('body-parser'); 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Route = require('./backend/route');
var metaData = require('./backend/metaData');
const { exec } = require('child_process');

var app = express();

//https connection

var fs = require('fs');
var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('/home/ubuntu/consoleApp/ssl/private.key', 'utf8').toString();
// var certificate = fs.readFileSync('/home/ubuntu/consoleApp/ssl/6470adf604c8d281.crt', 'utf8').toString();
// var dad = fs.readFileSync('/home/ubuntu/consoleApp/ssl/gd_bundle-g2-g1.crt').toString();
// var credentials = {key: privateKey, cert: certificate, ca: dad};
var app = express();

// your express configuration here

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// Constants

//connecting using port 3000
const PORT = myEnv.PORT;
const HOST = myEnv.HOST;
const Secret = 'supersecret';
console.log("host is *************"+HOST );

//Start Python child processes.
exec('python3 /home/ubuntu/consoleApp/CloudhitiFE/PythonAPIs/Controller.py',(error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});


// App
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//app.use(logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true , limit: '50mb'}));
app.use('/admin', Route);
app.use('/admin', metaData);


app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('/', (req, res) => {
  console.log("Python started...");
  res.send('Ok\n');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT,'0.0.0.0');
// httpsServer.listen(443,'0.0.0.0');
console.log(`Running on http://${HOST}:${PORT}`);