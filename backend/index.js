// Import essential libraries 
const express = require('express'); 
const app = express(); 
const path = require('path'); 
const router = express.Router(); 

const websocket = require("websocket");
const client = new websocket.client();

const db = require('./firebase_admin')

const ref = db.ref('example');



const asd = [
  {
    blockId: 187097265,
    blockTime: 1680890345,
    buyer: '2voio4wuRv3891P9FFxtAtigjhwBt1u6ouLTxkffn67X',
    collectionName: 'Duelwhales',
    helloMoonCollectionId: '0bcb91ff10666116801be4550d6c3ac3',
    instructionName: 'mip1ExecuteSaleV2',
    instructionOrdinal: 5,
    marketActionType: 'SALE',
    marketName: 'MEv2',
    mint: '3SzcdY5QgrqnB51DqBXN241XENJmudYB7y9TFy2jpbMk',
    price: 5350000000,
    programId: 'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K',
    seller: 'EyWoDersP7ZZABUoFEAqLmiEYXofxoSSZuWy6WPHtrSY',
    transactionId: '3UkxYjT8iVuFiEJ2JRu88um75MSkvxfbd8CzL8dRoD5oYPBtU5x1h2a6etVtZEkaRETMej2JiTk4EwALHLdh7KX4',
    transactionPosition: 103
  }
]

client.on("connect", (connection) => {
    connection.on("message", (message) => {
      if (!message || message.type !== "utf8") return;
      const data = JSON.parse(message.utf8Data);
      ref.once('value', (snapshot) => {
        const dataread = snapshot.val();

        ref.push({
          data
         });  
  
      });

     
   
       
   

    });

    connection.sendUTF(
      JSON.stringify({
        action: "subscribe",
        apiKey: "b5ad5dfe-e109-4b7d-945e-b20ba8f7925f",
        subscriptionId: "3eb54dc8-787a-47d5-ae3b-5f573ee5a0fb",
      })
    );
  });

  client.connect("wss://kiki-stream.hellomoon.io");


 



//add the router 
app.use('/', router); 
app.listen(process.env.port || 8000); 
console.log('Running at Port 8000'); 





