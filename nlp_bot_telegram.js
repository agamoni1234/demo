var telegram = require('telegram-bot-api');
var util = require('util');
const fs = require('fs');
var Request = require("request");
var querystring = require('querystring');
var striptags = require('striptags');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();
var telegram_port = 4000;

app.use(bodyParser.urlencoded({ extended: true })); 
//listen app
app.listen(telegram_port);

console.log("telegram app is running on ",telegram_port);

//start conversation in telegram
function startChatTelegram(){
    fs.readFile('./user_credential.json','utf8', function(err,data){
        var userCredential = JSON.parse(data);
        // console.log("User Credential is : ",userCredential["userCredential"]);
        userCredential["userCredential"].forEach(element =>{
            var apiKey = element["apiKey"];
            var telegram_bot_token = element["telegram_app_token"];

            //initialize telegramBot
            var telegramBot = new telegram({
                token : telegram_bot_token,
                updates : {
                    enabled: true
                }
            });
            telegramBot.on('message', function(message){
                try{
                    //start conversation
                    if(message.from.is_bot == false){
                        handleTelegramMessage(apiKey,message.text,telegramBot,message.chat.id);
                    }
                    // Received text message
                    console.log(message);
                }
                catch(ex){
                    telegramBot.sendMessage({
                        chat_id : chatId,
                        text : "Hmmm..I didn't quiet get that!!!"
                    }).then(function(data)
                    {
                        // console.log(util.inspect(data, false, null));
                    });
                }
            });
        })
    });
}

startChatTelegram();

function handleTelegramMessage(apiKey, userText, telegramBot,chatId){
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
            // console.log(error);
            telegramBot.sendMessage({
                chat_id : chatId,
                text : "Hmmm....I didn't quiet get that"
            }).then(function(data)
            {
                console.log(util.inspect(data, false, null));
            });
        }
        else{
            try{
                var responseData = JSON.parse(body);            
                var convertedText = striptags(responseData["labeledAnswer"]);
                telegramBot.sendMessage({
                    chat_id : chatId,
                    text : convertedText
                }).then(function(data)
                {
                    // console.log(util.inspect(data, false, null));
                });
            }
            catch(ex){
                telegramBot.sendMessage({
                    chat_id : chatId,
                    text : "Hmmm....I didn't quiet get that"
                }).then(function(data)
                {
                    // console.log(util.inspect(data, false, null));
                });
            }
            
        }
        
    });
}

