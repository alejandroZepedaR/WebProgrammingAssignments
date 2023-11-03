//Alejandro Zepeda
//CSC 337
//PA 7 - Chatty
//The purpose of this file is to handle the server side of the chat application

const express = require('express');
const app = express();
const port = 80;
const parser = require('body-parser');

const mongoose = require('mongoose');
const mongoDBURL = 'mongodb://127.0.0.1/chatty';

//Make connection to DB
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
 console.log('Connection error')
});

//Creating a Schema
let messageSchema = new mongoose.Schema({
    time: Number,
    alias: String,
    message: String,
})

//Creating a model for messages
let ChatMessage = mongoose.model('ChatMessage', messageSchema );

//Middleware
app.use(parser.json());
app.use(express.static('public_html'));

//Post a message to the database
app.post('/chats/post',(req, res)=>{
    const messageObject = req.body;
    let newMessage = new ChatMessage({time: messageObject.time, alias: messageObject.alias, message: messageObject.message});
    let SavePromise = newMessage.save();
    SavePromise.then(()=>{
        res.end("Saved Successfully");
    });
    SavePromise.catch((error)=>{
        console.log(error);
        res.end('Save failed');
    })
    
})

//Get all the messages from the database
app.get('/chats', function(req, res){
    ChatMessage.find({}).exec()
    .then((documents)=>{
        res.json(documents);
    })
    .catch((error) => {
        console.log('Save failed');
        console.log(error);
    })
});


app.listen(port, ()=>{
    console.log(`Server start on port: ${port}`)
})