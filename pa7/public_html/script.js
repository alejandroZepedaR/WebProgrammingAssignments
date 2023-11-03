//Alejandro Zepeda
//CSC 337
//PA 7 - Chatty
//The purpose of this file is to handle the client side of the chat application

//Elements from the HTML
const aliasInput = document.getElementById('alias');
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages');

//Message object
let messageInfo = {
    time: 1,
    alias: "",
    message: ""
}

//array of messages
let messages = [];
    
//event listeners for the input fields
aliasInput.addEventListener('input',(event)=>{
    messageInfo.alias = event.target.value;
});

messageInput.addEventListener('input', (event)=>{
    messageInfo.message = event.target.value
});

//function to clear the input fields
function clearMessageInput(){
    messageInput.value = "";
}

//function to get the messages from the server
function getMessages() {
    fetch('/chats')
      .then((response) => {
        if (response.ok) {
          return response.json(); // Convert the response to JSON
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {

        while (messagesContainer.firstChild) {//clear the messages container so there are not repeated messages
            messagesContainer.removeChild(messagesContainer.firstChild);
        }

        messages = data; // Push the JSON data into the messages array
        messages.forEach(message =>{
          //Create the elements to display the messages
            let messageDiv = document.createElement('div');
            let aliasTag = document.createElement('h2');
            aliasTag.innerText = message.alias;
            let messageText = document.createElement('p');
            messageText.innerText = message.message;
            messageDiv.appendChild(aliasTag);
            messageDiv.appendChild(messageText);
            messagesContainer.appendChild(messageDiv);
        })
      })
      .catch((error) => {
        alert("THERE WAS A PROBLEM");
        console.log(error);
      });
}

//function to send the message to the server
function sendMessage(){
  messageInfo.time = Date.now();
    let p = fetch('/chats/post', {
        method: 'POST',
        body: JSON.stringify(messageInfo),
        headers: { 'Content-Type': 'application/json'}
       });
       p.then((response) => {
        return response.text();
       }).then((text) => {
        console.log(text);
       });

    clearMessageInput();
}

//constantly checking for new messages
setInterval(() => getMessages(), 500);