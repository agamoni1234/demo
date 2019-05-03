var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const fs = require('fs');
require('dotenv').config();
// var request = require("request");
var Request = require("request");
var querystring = require('querystring');
var striptags = require('striptags');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8989, () => console.log('Messenger app listening on port 8989!'));


app.get('/webhook' ,(req,res)=>{
    console.log("Request : ",req);
    let fbVerifyToken = process.env.verifyToken;
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === fbVerifyToken) {
            console.log('WEBHOOK_VERIFIED FOR ',fbPageName);
            res.status(200).send(challenge);
        } 
        else {
            res.sendStatus(403);
        }
    }
});
// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
    let body = req.body;
    if (body.object === 'page') {
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];
            // console.log(webhook_event);
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
            if (webhook_event.message) {
                console.log("Message is ",webhook_event.message.text);
            } else if (webhook_event.postback) {
                console.log("Postback is ",webhook_event.postback)
            }
            fs.readFile('./user_credential.json','utf8', function(err,data){
                var userCredential = JSON.parse(data);
                userCredential["userCredential"].forEach(element =>{
                    var fbPageAccessToken = element["fbPageAccessToken"];
                    var fbPageName = element["fbPageName"];
                    var apiKey = element["apiKey"];
                    var sender_psid = element["sender_psid"];
                    if(sender_psid == sender_psid){
                        handleFacebookMessage(webhook_event.message.text,sender_psid,fbPageAccessToken,apiKey)
                    }
                    //Webhook setup for every page
                });
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

function handleFacebookMessage(userText,sender_psid,fbPageAccessToken,apiKey){

    console.log("handling message ");
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
    }, (error, response, body) =>{
        if(error) {
            console.log(error);
        }
        var responseData = JSON.parse(body);
        var convertedText = striptags(responseData["labeledAnswer"]);
        var options = { 
            method: 'POST',
            url: process.env.faceBook_Graph_Api,
            qs: 
            { 
                access_token: fbPageAccessToken },
                headers: 
                { 
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json' 
                },
          body: 
           { 
               recipient: 
               { id: sender_psid },
               message: { text: convertedText } },
               json: true 
            };
        
        Request(options, function (error, response, body) {
          if (error) throw new Error("Error is ",error);
          console.log(body);
        });
    });
}