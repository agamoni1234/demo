'use strict';
const BootBot = require('bootbot');
var querystring = require('querystring');
var Request = require("request");
var striptags = require("striptags");
var fs = require('fs');
require('dotenv').config();


startFacebookChat();

function startFacebookChat(){
  
  console.log("Facebook bot is running");
  fs.readFile('./user_credentials.json','utf8', function(err,data){
      console.log("faceBook data ",data);
      var facebookExistingUser = JSON.parse(data);
      if(err){
          console.log("Can't read Bot data");
      }
      else{
        facebookExistingUser["FacebookUserDetail"].forEach(element => {
              var page_access_token = element["accessToken"];
              var fb_app_secret = element["appSecret"];
              var model_api_key = element["Model_apikey"];
              var bot_port  = element["bot_port"]

              //create new fb bot instance
              var bot = new BootBot({
                accessToken: page_access_token,
                verifyToken: process.env.verifyToken,
                appSecret: fb_app_secret
              });
              
              //start bot
              bot.start(bot_port);
              console.log("Bot is listening on ",bot_port);

              //bot start on fb page
              bot.on('message', (payload, chat) => {
                var text = payload.message.text;
                console.log("Payload is : ",payload);
                chat.sendTypingIndicator(20000);
                handleFacebookMessage(payload["message"]["text"],payload["sender"]["id"],model_api_key,bot);
              });
          });
      }
  });
}


function handleFacebookMessage(userText,senderId,model_api_key,bot){
  var botReply=[];
  if(typeof(userText)!="undefined")
  {
    var form={
      APIkey: model_api_key,
      text: userText
  }
  var formData = querystring.stringify(form);
  botReply.push(userText);
  Request.post({
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      url: process.env.model_url,
      body: formData
  }, (error, response, body) => {
      if(error) {
          console.log(error);
      }
      var responseData = JSON.parse(body);
      var text = striptags(responseData["labeledAnswer"]);
      console.log(responseData["labeledAnswer"]);
      console.log(responseData);
      bot.sendTextMessage(senderId,text);
  });
  }
  
}
