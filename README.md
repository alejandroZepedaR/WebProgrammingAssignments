# WebProgrammingAssignments

This repository contains solutions and projects related to web programming assignments. The assignments cover various web development topics and technologies, including HTML, CSS, JavaScript, DOM manipulation, event-driven programming, web servers, and more.

## Professor
These assignments are provided by [Professor Benjamin Dicken](https://benjdd.com). Credit goes to Professor Dicken for creating and assigning these projects to help students learn web development concepts.

# Assignment 4: - Cipher Algorithms

## Objective
Create a one-page web application that implements two simple cipher (encryption) algorithms. The main requirements are to use HTML, CSS, Javascript, DOM manipulation, and event-driven programming.

## Application Layout
1. The main application consists of three primary sections:
   - Sidebar: Contains the application title, input text field, shift slider, and the cipher square.
   - Top Text Field: Display the Caesar cipher encryption.
   - Bottom Text Field: Display the Square cipher encryption.
   - Slider: Ranges from 0 to 26, displaying the current value.
   - "Update Square" Button: Shuffles the 5x5 letter grid in the sidebar.

2. Customize fonts, colors, and styles as desired, but consider using the Courier font for the top and bottom text fields as it's monospace.

## Caesar Cipher
A Caesar cipher is a basic encryption algorithm that shifts letters in the plaintext forward in the alphabet. The shift value is determined by the slider.

- A shift of 0 results in the same text.
- A shift of 26 is also identical because it wraps around the 26-character alphabet.
- Example: If the shift value is 3 and the plaintext is "CSC," the ciphertext would be "FVF."
- Translate only alphabetical characters, converting them to upper or lower case for simplicity.
- Skip white space, punctuation, and digits.

## Square Cipher
A simplified version of the two square cipher called the "square cipher."

- The KEY is a 5x5 grid of text (excluding Z) representing the 25 letters of the alphabet.
- For this cipher, a Z in plaintext remains Z in ciphertext.
- For other alphabetical characters, find their position in the regular alphabet and translate to the corresponding grid position.
- Example: Encrypting "CSC" using the provided square results in "WEW."
- Skip white space, punctuation, and digits.

## Implementation
Your web application should allow users to input text, select a shift value for Caesar cipher, and update the square for the Square cipher. The output should display the encrypted text in the top and bottom text fields.

# Assignment 5 & 6: Web Server for Translation

## Objective
Develop a web server capable of translating text between English, Spanish, and German. Write all code in a single file named `translator.js`. Your server will act as a "Web-based API" for text translation, allowing users to request different translations by modifying the URL.

## Server Setup
- The server should run locally on your computer, at IP address `127.0.0.1` (localhost), and on port `5000`.

## Translation Requests
- Translation requests are structured as follows: `http://127.0.0.1:5000/translate/TYPE/CONTENT`.
- The `TYPE` part of the URL specifies the type of translation and can be one of the following:
    - `e2s` (English to Spanish)
    - `s2e` (Spanish to English)
    - `e2g` (English to German)
    - `g2e` (German to English)
    - `g2s` (German to Spanish)
    - `s2g` (Spanish to German)
- The `CONTENT` portion contains the text to be translated, with spaces replaced by `+` signs.
- Examples:
    - `http://127.0.0.1:5000/translate/e2s/you+want+to+sail` translates "you want to sail" from English to Spanish, resulting in "vosotros querir para vela."
    - `http://127.0.0.1:5000/translate/g2e/er+laufen+schnell` translates "er laufen schnell" from German to English, yielding "he walk quick."

## Loading Translation Data
- Load translation information from two files: `Spanish.txt` and `German.txt`.
- Each line in these files follows the format: `English word` (tab) `Translation` (optional attributes).
- Create dictionaries that map `ENGLISH_WORD` to `SPANISH_TRANSLATION` and `GERMAN_WORD`.
- Perform the following for each translation line:
    - Split the line on the tab character.
    - Treat the left side as the English "from" word.
    - The "to" word in the other language is everything on the right side until the first non-alphabetical or whitespace character is encountered.

## Parsing the URL
- Set up a simple HTTP server to parse the URL path for translation requests.
- Extract the individual components of the URL path.
- Use the translation objects in JavaScript to perform the translation.
- For non-translation requests, respond with "OK."

## Implementation Phases
### A) Using Express
- Modify the server code to use Express instead of HTTP.
- Test the server thoroughly after making the changes.
- Install the Express module on your system using npm.

### B) Static + Dynamic Server
- Enable the server to serve both static and dynamic files.
- Store static files in the `public_html` folder, including `index.html`, a CSS file, and a JS file.
- When the URL path begins with `/translate`, treat it as a translation request. For other paths, look for the appropriate static file in `public_html`.

### C) The Client
- Create an interface for users to translate text, resembling a simplified version of Google Translate.
- Utilize AJAX for making requests to the server to complete translations.
- Use plain JavaScript for client-side code without special libraries or modules.

## Additional Rules
- Refer to the style guide on the class site for HTML validation, header comments, and other requirements.
- Avoid using the HTTP module for this server; use the fs, readline, and Express modules.
- Ensure that the client makes at least one AJAX request and does not rely on advanced JavaScript APIs.

## Test Cases
- Test the program with the following cases and ensure it handles them correctly. Don't rely solely on these cases; test with other translations as well:
    - English to German: "yellow airplane" -> "gelb flugzeug"
    - English to German: "absolutely loud big blizzard" -> "völlig laut gross schneesturm"
    - German to English: "klein stadt" -> "small town"
    - English to Spanish: "orange drink" -> "la naranja el refresco"
    - Spanish to English: "conseguilbe atalaya" -> "attainable beacon"
    - Spanish to German: "negro azul" -> "schwarze blau"
    - German to Spanish: "gelb" -> "Camarillo"

# Assignment 7: Chatty - Chat Application

## Objective
Create a chat application called "Chatty" that combines various technologies including MongoDB, Mongoose, Express, AJAX, and more. Chatty should provide users with a basic chat interface where they can specify an alias (username) and send messages.

## The Client
The client is a single-page site, served statically by the Node.js server. It includes an HTML page (`index.html`), a CSS file for styling, and a JavaScript file for functionality. The top 70% of the page is dedicated to the chat window, where messages will appear. The bottom 30% features two text input fields (for user alias and message) and a "Send Message" button. You have the freedom to get creative with colors, fonts, and other stylistic elements.

Client-side JavaScript should support two major functionalities:
1. Sending messages to the server: When the user clicks the "Send Message" button, Chatty should collect the alias and message text, send this information to the server for storage, and clear the message text box for the next input.

2. Fetching messages from the server: The client should use `setInterval` to periodically request the list of messages from the server, displaying them in the chat window. User-sent messages should only appear after the next server response (ping). Messages should display aliases in bold and messages in regular text.

## The Server
The server is built using Express and Node.js and incorporates MongoDB and the Mongoose module.

1. Configure Express to handle static file serving for the `public_html` directory.

2. Handle two types of requests:
   - GET request to the path `/chats`: Retrieve all stored messages from the MongoDB database and return them to the client for display. The client should make a request to this path every 1 second to stay updated with recent chat messages.
   - POST request to the path `/chats/post`: Sent from the client and includes an alias and message in the request body. The server should save the alias, message, and a timestamp in the database for later retrieval via a `/chats` GET request.

## The Database
To set up the database, you need to install MongoDB and ensure it's up and running. Follow the instructions based on your operating system if you haven't already. Use NPM to install Mongoose (in addition to Express) to connect to the database.

For this simple chat app, you need one schema to hold chat messages. Consider the following schema structure, which you can modify if you want to add more features:

```javascript
var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
```
This code should be executed after establishing a connection with MongoDB and before handling web requests.

When a user requests the sequence of chat messages, query the database using Mongoose to get the list of all messages and ensure they are returned in the order they were sent.

When a user submits a new message, add it to the database via Mongoose.






