var Request = require("request");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var querystring = require('querystring');
var striptags = require('striptags');
var restify = require('restify');
var builder = require('botbuilder');
const fs = require('fs');
require('dotenv').config();
var skype_port = 8000;

app.use(bodyParser.urlencoded({ extended: true })); 
//listen app
app.listen(skype_port);

console.log("Skype app is running on ",skype_port);

startChatSkype();
function startChatSkype(){
    var connector = new builder.ChatConnector({
        appId: "Your App ID Here",
        appPassword: "Your App Password Here"
    });

    var bot = new builder.UniversalBot(connector);

    //Bot on
    bot.on('contactRelationUpdate', function (message) {
        if (message.action === 'add') {
            var name = message.user ? message.user.name : null;
            var reply = new builder.Message()
                    .address(message.address)
                    .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
            bot.send(reply);
        } else {
            // delete their data
        }
    });

    bot.on('typing', function (message) {
        // User is typing
      });

      String.prototype.contains = function(content){
        return this.indexOf(content) !== -1;
      }
      bot.dialog('/', function (session) {
          if(session.message.text.toLowerCase().contains('hello')){
            session.send(`Hey, How are you?`);
            }else if(session.message.text.toLowerCase().contains('help')){
              session.send(`How can I help you?`);
            }else{
              session.send(`Sorry I don't understand you...`);
            }
      });
}