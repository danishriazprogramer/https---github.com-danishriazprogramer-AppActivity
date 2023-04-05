const accountSid = "AC77439b179e50e755816d31463aba429c";
const authToken = "633f1ed1372f8d6fa58c78a9ada3b906";
const client = require('twilio')(accountSid, authToken);

// Send a text message to a customer
async function sendTextMessage(to, body) {
  try {
    const message = await client.messages.create({
      to: to,
      from: '+12766249590',
      body: body
    });
    console.log(message.sid);
    return message;
  } catch (error) {
    console.log(error);
  }
}

// Make a phone call to a customer
async function makePhoneCall(to) {
  try {
    const call = await client.calls.create({
      to: to,
      from: '+12766249590',
      url: 'http://demo.twilio.com/docs/voice.xml'
    });
    console.log(call.sid);
    return call;
  } catch (error) {
    console.log(error);
  }
}


/* 
async function createConversation(to) {

 try{
  
   const conversation = await client.conversations.v1.conversations.create({
     friendlyName: 'My Conversation'
    });
    const conversationSid = conversation.sid;
    console.log("conversation sid:", conversationSid)
    

    
client.conversations.v1.conversations(conversationSid)
.participants
.create({
   'messagingBinding.address': to,
   'messagingBinding.proxyAddress': '+12766249590'
 })
.then(participant => console.log("participantSid:",participant.sid));

    
    const message = await client.conversations.v1.conversations(conversationSid)
    .messages
    .create({
      body: "hello message from twillio test",
      author: 'customer', // Set the author to 'customer'
      to: to // Set the recipient to the phone number of the participant we added earlier
    });
    console.log(message.sid);
    return message;
  } catch (error) {
    console.log(error);
  }
} */

module.exports = { sendTextMessage, makePhoneCall };
