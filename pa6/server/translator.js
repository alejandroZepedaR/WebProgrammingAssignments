//Alejandro Zepeda
//PA #6 Translator CSC 337
//Web-based API that can be delegated the task of translating text between languages. The user of this web API can request to do various types of translations by changing the URL of the request.

//Setting up server dependencies
const express = require('express');
const app = express();
const port = 80;
const fs = require('fs');
const readline = require('readline');

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

async function getTranslatedText(words, dictionary){
    words = words.split('+');

    //Calling function to get the corresponding words 
    let translatedText = await getE2OtherLanguage(words, dictionary);

    return translatedText
}

app.use(express.static('_public_html'));

app.get('/:languageOption/:words', async (req, res) => {

    let languageOption = req.params.languageOption;
    let words = req.params.words

    // Read files for translation dictionaries
    const e2sDictionary = await readLines('./Spanish.txt');
    const e2gDictionary = await readLines('./German.txt');

    if (languageOption === 'e2s') { // Translate from English to Spanish
        const translatedText = await getTranslatedText(words, e2sDictionary)
        res.end(translatedText);
    }else if (languageOption === 's2e') { // Translate from Spanish to English
        const s2eDictionary = reverseDictionary(e2sDictionary)
        let translatedText = await getTranslatedText(words, s2eDictionary);
        res.end(translatedText);
    }else if (languageOption === 'e2g') {// Translate from English to German
        let translatedText = await getTranslatedText(words, e2gDictionary);
        res.end(translatedText);
    }else if (languageOption === 'g2e') {// Translate from German to English
        const g2eDictionary = reverseDictionary(e2gDictionary)
        let translatedText = await getTranslatedText(words, g2eDictionary);
        res.end(translatedText);
    }else if(languageOption === 's2g'){ // Translate from Spanish to German via English
        const s2eDictionary = reverseDictionary(e2sDictionary);
        let translatedToEnglish = await getTranslatedText(words, s2eDictionary);
        translatedToEnglish = translatedToEnglish.replace(/ /g, '+');
        let translatedText = await getTranslatedText(translatedToEnglish, e2gDictionary);
        res.end(translatedText);
    }else if(languageOption ==='g2s'){// Translate from German to Spanish via English
        const g2eDictionary = reverseDictionary(e2gDictionary);
        let translatedToEnglish = await getTranslatedText(words, g2eDictionary);
        translatedToEnglish = translatedToEnglish.replace(/ /g, '+');
        let translatedText = await getTranslatedText(translatedToEnglish, e2sDictionary);
        res.end(translatedText);
    }else{
        res.end(words);// In case the language is the same for input as it is for output.
    }
    
});

app.listen(port, ()=>{
    console.log(`Server start on port: ${port}`)
})

