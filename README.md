# WebProgrammingAssignments
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
    - German to Spanish: "gelb" -> "amarillo"






