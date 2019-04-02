var mysql = require('mysql');
const myEnv = require("dotenv").config({path: __dirname + '../../process.env'}).parsed;

// const MysqlHost = (myEnv.MysqlHost).toString();
// const MysqlUser = (myEnv.MysqlUser).toString();
// const MysqlPass = (myEnv.MysqlPass).toString();
// const MysqlDB =  (myEnv.MysqlDB).toString();

const MysqlHost = "cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com";
const MysqlUser = "cloudhiti";
const MysqlPass = "kolkata257!";
const MysqlDB = "cdrepo";


var connection; 

module.exports = {

    dbConnection: function () {

        connection = mysql.createConnection({
		  host     : MysqlHost,
		  user     : MysqlUser,
		  password : MysqlPass,
		  database : MysqlDB
		});
        connection.connect();
        return connection;
    }

};