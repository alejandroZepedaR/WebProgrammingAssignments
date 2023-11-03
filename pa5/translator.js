//Alejandro Zepeda
//PA #5 Translator CSC 337
//Web-based API that can be delegated the task of translating text between languages. The user of this web API can request to do various types of translations by changing the URL of the request.

//Setting up server dependencies
const http = require('http');
const fs = require('fs');
const readline = require('readline');
const hostname = '127.0.0.1';
const port = 5000;

//Function to read through text files(filename) and append to an object-dictionary, and return the dictionary-object
async function readLines(fileName) {
    const dictionary = {};
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const parenRegex = /\([^)]*\)/g; // Regular expression to delete the content of the parenthesis

    for await (let line of rl) {
        //treating only lowerCase words
        line = line.toLowerCase();
        if (line.startsWith('#')) {
            continue;
        } else if (line.trim() === '') {
            continue;
        } else {
            const parts = line.split('\t');
            if (parts.length === 2) {
                //Getting rid of [] () and / in the transalated words
                const currentEnglishWord = parts[0].trim().replace(/\[(.*?)\]/g, '');
                let currentOtherLanguageWord = parts[1].trim().replace(/\[(.*?)\]/g, '');
                currentOtherLanguageWord = currentOtherLanguageWord.replace('/', '');
                

                // Remove content inside parentheses
                const cleanedOtherLanguageWord = currentOtherLanguageWord.replace(parenRegex, '').trim();

                // Check if the English word already exists in the dictionary to skip all the synonyms
                if (dictionary[currentEnglishWord]) {
                    continue;
                } else {
                    dictionary[currentEnglishWord] = cleanedOtherLanguageWord;
                }
            }
        }
    }
    return dictionary;
}


//function to get the corresponding word in the second language. Takes in the initialLanguage text as words, and the dictionary of languages as dictionary and returns the translated string of text
async function getE2OtherLanguage(words, dictionary) {
    let translatedText = "";
    for (let i = 0; i < words.length; i++) {
        if (words[i] in dictionary) {
            //if word exists in dictionary it will append translation to the text
            translatedText += dictionary[words[i]] + " ";
        } else {
            //If its not found, It will return the word in the primary language
            translatedText += words[i] + " ";
        }
    }
    return translatedText;
}

//fucntion to reverse the order of the object
function reverseDictionary(dictionary) {
    const reversedDictionary = {};

    for (const englishWord in dictionary) {
        const otherLanguageWords = dictionary[englishWord].split(', ');

        for (const otherLanguageWord of otherLanguageWords) {
            reversedDictionary[otherLanguageWord] = englishWord;
        }
    }

    return reversedDictionary;
}

//Function to get the translated text. Takes in the url to get the words to be translated. Takes in the dictionary of the corresponding languages and returns the translated text
async function getTranslatedText(url, dictionary){
    //Getting rid of unecessary formatting of URL
    let words = url.slice(3).join(' ').split('+');

    //Calling function to get the corresponding words 
    let translatedText = await getE2OtherLanguage(words, dictionary);
    return translatedText
}

//
const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    // Read files for translation dictionaries
    const e2sDictionary = await readLines('./Spanish.txt');
    console.log(e2sDictionary);
    const e2gDictionary = await readLines('./German.txt');
    
    // Split the URL to determine the translation type
    const url = req.url.split('/');

    if (url[1] === 'translate') {
        if (url[2] === 'e2s') { // Translate from English to Spanish
            const translatedText = await getTranslatedText(url, e2sDictionary)
            res.end(translatedText);
            console.log(url);
        }
        if (url[2] === 's2e') { // Translate from Spanish to English
            const s2eDictionary = reverseDictionary(e2sDictionary)
            let translatedText = await getTranslatedText(url, s2eDictionary);
            res.end(translatedText);
        }
        if (url[2] === 'e2g') {// Translate from English to German
            let translatedText = await getTranslatedText(url, e2gDictionary);
            res.end(translatedText);
        }
        if (url[2] === 'g2e') {// Translate from German to English
            const g2eDictionary = reverseDictionary(g2sDictionary)
            let translatedText = await getTranslatedText(url, g2eDictionary);
            res.end(translatedText);
        }
        if(url[2] === 's2g'){ // Translate from Spanish to German via English
            const s2eDictionary = reverseDictionary(e2sDictionary);
            let translatedToEnglish = await getTranslatedText(url, s2eDictionary);
            translatedToEnglish = translatedToEnglish.replace(/ /g, '+');
            url.pop();
            const newUrl = [...url, translatedToEnglish];
            console.log(newUrl);
            let translatedText = await getTranslatedText(newUrl, e2gDictionary);
            res.end(translatedText);
        }
        if(url[2]==='g2s'){// Translate from German to Spanish via English
            const g2eDictionary = reverseDictionary(e2gDictionary);
            let translatedToEnglish = await getTranslatedText(url, g2eDictionary);
            translatedToEnglish = translatedToEnglish.replace(/ /g, '+');
            url.pop();
            const newUrl = [...url, translatedToEnglish];
            console.log(newUrl);
            let translatedText = await getTranslatedText(newUrl, e2sDictionary);
            res.end(translatedText);
        }
    } else {
        res.end("?")
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

