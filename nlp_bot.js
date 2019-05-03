const slackbot = require('slackbots');
var Request = require("request");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var querystring = require('querystring');
var striptags = require('striptags');
const fs = require('fs');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true })); 
//listen app
app.listen(3000);

startChatSlack();

function startChatSlack(){
    fs.readFile('./user_credential.json','utf8', function(err,data){
        var slackExistingUser = JSON.parse(data);
        if(err){
            console.log("Can't read Bot data");
        }
        else{
            slackExistingUser["slackCredential"].forEach(element => {
                var botAccessToken = element["botAccessToken"];
                var botDisplayName = element["botDisplayName"];
                var apiKey = element["apiKey"]
                var bot =new slackbot({
                    token: botAccessToken,
                    name: botDisplayName
                });
                
                bot.on('message', data =>{
                    console.log("Slack data is : ",data);
                    if(data.subtype != "bot_message"){
                        //to connect to direct app
                        handleMessageToSlackApp(data.text,data.channel,apiKey,bot);
                    }
                });
                
                //error handle
                bot.on('error',(err) => console.log(err));
            });
        }
    });
}

function handleMessageToSlackApp(userText,channel,apiKey,bot){
    if(typeof(userText)!="undefined")
    {
        const param={
            // icon_emoji: ':smiley:'
            icon_url: 'https://syra.ai/CloudhitiAdvisor/assets/chatbot.png'
        };
        var form={
            APIkey: apiKey,
            text: userText
        }
        var formData = querystring.stringify(form);
        
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
            var convertedText = striptags(responseData["labeledAnswer"]);
            console.log(convertedText); 
            console.log("Channel is : "+ channel)
            bot.postMessage(channel,convertedText,param);
        });
    }
}