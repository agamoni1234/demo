var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//const myEnv = require("dotenv").config({path: __dirname + '../../process.env'}).parsed;
const myEnv = require("dotenv").config({path: __dirname + '.env'}).parsed;


const dbConnection = require('./db');
var VerifyToken = require('./Verify');


router.use(function (user, req, res, next) {
  res.status(200).send(user);
});

router.post('/sourceCreate', VerifyToken,function(req, res, next) {
  
    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });
    var sql = " INSERT INTO `servercredentials` (`ServerName`, `accessKey`, `appkey`, `appsecret`, `consumerKey`,`consumersecret`, `databaseName`, `databaseType`, `hosturl`, `className`, `password`, `port`, `reason`, `secretKey`, `username`, `servertype_id`, `user_id`) VALUES ( '"+reqobj.serverName+"', '"+reqobj.accessKey+"', '"+reqobj.appkey+"', '"+reqobj.appsecret+"','"+reqobj.consumerKey+"', '"+reqobj.consumersecret+"', '"+reqobj.databaseName+"', '"+reqobj.databaseType+"', '"+reqobj.hosturl+"', '"+reqobj.className+"', '"+reqobj.password+"',"+reqobj.port+", '"+reqobj.reason+"', '"+reqobj.secretKey+"', '"+reqobj.username+"', '"+reqobj.servertypeid+"', "+reqobj.parentId+")";
    console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      connection.end();
      res.status(200).send({ insert: true });
    });
});


router.put('/sourceUpdate', VerifyToken,function(req, res, next) {
  
    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });
    var sql = " UPDATE `servercredentials` SET `ServerName`= '"+reqobj.serverName+"', `accessKey` ='"+reqobj.accessKey+"', `appkey`='"+reqobj.appkey+"', `appsecret`='"+reqobj.appsecret+"' , `consumerKey` = '"+reqobj.consumerKey+"' ,`consumersecret` =  '"+reqobj.consumersecret+"', `databaseName` ='"+reqobj.databaseName+"', `databaseType` ='"+reqobj.databaseType+"' , `hosturl` = '"+reqobj.hosturl+"', `className` = '"+reqobj.className+"', `password` = '"+reqobj.password+"', `port` = "+reqobj.port+", `reason` = '"+reqobj.reason+"', `secretKey` ='"+reqobj.secretKey+"', `username` = '"+reqobj.username+"',`servertype_id` = '"+reqobj.servertypeid+"', `user_id` =  "+reqobj.parentId+" WHERE `id` = "+ reqobj.id
    console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      connection.end();
      res.status(200).send({ insert: true });
    });
});


router.get('/sourceType',VerifyToken,function(req, res, next) {
  
    let connection  = dbConnection.dbConnection();
    //res.status(200).send({ insert: true });
    var sql = "SELECT * FROM `servertype`"
    console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      //console.log(results);
      connection.end();
      res.status(200).send({ result: results });
    });
});

router.get('/jobType',VerifyToken,function(req, res, next) {
  
    let connection  = dbConnection.dbConnection();
    //res.status(200).send({ insert: true });
    var sql = "SELECT * FROM `jobtype`";
    console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      //console.log(error,results);
      connection.end();
      res.status(200).send({ result: results });
    });
});


router.post('/source',VerifyToken,function(req, res, next) {
  
    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });  servertype_id BETWEEN 2 and 3 and 
    var sql = "SELECT * FROM `servercredentials` where  id="+reqobj.id;
    console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      connection.end();
      res.status(200).send({ result: results });
    });
});


router.post('/deletesource',VerifyToken,function(req, res, next) {
  
    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });  servertype_id BETWEEN 2 and 3 and 
    var sql = "DELETE FROM `servercredentials` WHERE `id` = "+reqobj.id
    //console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      var sql = "SELECT * FROM `servercredentials` where  user_id="+reqobj.user_id
      console.log(sql);
      connection.query( sql, function (error, results, fields) {
        if (error) return res.status(500).send({ status: false })
        connection.end();
        res.status(200).send({ result: results });
      });
    });
});

router.post('/sources',VerifyToken,function(req, res, next) {
  
    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });  servertype_id BETWEEN 2 and 3 and 
    var sql = "SELECT * FROM `servercredentials` where  user_id="+reqobj.user_id+" order by id desc "
   // console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      connection.end();
      res.status(200).send({ result: results });
    });
});

router.post('/createjob',VerifyToken,function(req, res, next) {
  
    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });
    var sql = "INSERT INTO `job` (  `JobComment`, `JobName`, `Jobjson`, `status`, `jobType_id`, `source_id`, `Source_Type`, `target_id`, `Target_Type`, `user_id`) VALUES ( '"+reqobj.jobComment+"', '"+reqobj.jobName+"', '"+reqobj.jobjson+"', 1, '"+reqobj.jobType+"', '"+reqobj.sourceId+"', '"+reqobj.sourceType+"', '"+reqobj.targetId+"', '"+reqobj.targetType+"', "+reqobj.parentId+")"   
    //console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      let JobID= results.insertId;//console.log(results);
      
      var sql = "INSERT INTO `jobdependent` ( `DestinationbucketName`, `DestinationfolderPath`, `DestinationfileKey`, `Destinationrdbmsnewtable`, `DestinationrdbmsnewtableTruncate`, `DestinationrdbmstableName`, `SorcebucketName`, `SourcefileKey`, `SourcefolderPath`, `Sourcerdbmsnewtable`, `SourcerdbmsnewtableTruncate`, `SourcerdbmstableName`, `sourcerhashtag`, `sourcerbatchsize`, `sourcerkafkaName`, `dumpaccessKey`, `dumpsecretKey`, `dumpbucketName`, `dumpKey`, `dumpbucketlocation`, `trainaccessKey`, `trainsecretKey`, `trainbucketName`, `trainKey`, `mlalgorithm`, `mlVariable`, `transformquery`, `job_id`) VALUES ( '"+reqobj.destinationbucketName+"', null, '"+reqobj.destinationfileKey+"', '"+reqobj.destinationrdbmsnewtable+"', '"+reqobj.destinationrdbmsnewtableTruncate+"', '"+reqobj.destinationrdbmstableName+"', '"+reqobj.sorcebucketName+"', '"+reqobj.sourcefileKey+"', '"+reqobj.sourcefolderPath+"', '"+reqobj.sourcerdbmsnewtable+"', '"+reqobj.sourcerdbmsnewtableTruncate+"', '"+reqobj.sourcerdbmstableName+"', null, null, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, "+JobID+")"; 
      console.log(sql);
      connection.query( sql, function (error, results, fields) {
        if (error) return res.status(500).send({ status: false , insert:false })
        res.status(200).send({ result: results , insert:true });
      });
    });
});

router.post('/job',VerifyToken,function(req, res, next) {
  
    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });
    var sql = "SELECT * FROM `job` where  id="+reqobj.id
    //console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      connection.end();
      res.status(200).send({ result: results });
    });
});

router.post('/deletejob',VerifyToken,function(req, res, next) {
  
    console.log("in delete job ************  ");

    let connection = dbConnection.dbConnection();
    //console.log(req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });  servertype_id BETWEEN 2 and 3 and 
    var sql = "DELETE FROM `job` WHERE `id` = "+reqobj.id
    console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      var sql = "SELECT * FROM `job` where  user_id="+reqobj.user_id
      console.log(sql);
      connection.query( sql, function (error, results, fields) {
        if (error) return res.status(500).send({ status: false })
        connection.end();
        res.status(200).send({ result: results });
      });
    });
});
router.post('/alljob',VerifyToken,function(req, res, next) {

  
    let connection = dbConnection.dbConnection();
    console.log("request body is ************   "+req.body);
    let reqobj= req.body;
    //res.status(200).send({ insert: true });
    var sql = "SELECT * FROM `job` where  user_id="+reqobj.user_id+" order by id desc" 
    //console.log(sql);
    connection.query( sql, function (error, results, fields) {
      if (error) return res.status(500).send({ status: false })
      connection.end();
      res.status(200).send({ result: results });
    });
});








module.exports = router;
