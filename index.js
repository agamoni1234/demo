const {WebClient} = require('@slack/client');
const { RTMClient } = require('@slack/rtm-api');
var express = require('express');
var app = express();
const fs = require('fs');
require('dotenv').config()

//set token to the bot token
const token = process.env.bot_access_token;

const rtm = new RTMClient(token);
// console.log()
// rtm.on('message', (event) => {
//     console.log("Event is : "+event);
//   });
//     (async () => {
//     await rtm.start();
// })();


// Initialize a Web API client
const web = new WebClient(token);
web.channels.list()
   .then(res => {
     console.log('Channels', res.channels);
})
  .catch((error) => {
   // Error :/
   console.log('Team info error:');
   console.log(error);
});
const conversationId = process.env.slack_conversation_channel;
web.chat.postMessage({ channel: conversationId, text: 'How are you!' })
   .then((res) => {
     console.log('Message sent: ', res.ts);
 })
   .catch(console.error);