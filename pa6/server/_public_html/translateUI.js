//Alejandro Zepeda
//PA #6 Translator CSC 337
//This File handles the changes of the input fields from the index.html and makes requests to the translator.js, to get the correct translation for the text inputted. 

//Elements from HTML
let fromLanguageText = document.getElementById("fromLanguageText");
let toLanguageText = document.getElementById("toLanguageText");
let fromLanguageOption = document.getElementById("fromLanguageOption");
let toLanguageOption = document.getElementById("toLanguageOption");

//Variables
let typeOfTranslation = "";
let textToTranslate = "";
let fromLanguageType = "english";
let toLanguageType = "english";

//Function to format the type of transalation to make appropiate requests to the API
function getTypeOfTranslation() {
  let formatRequest = "";
  if (fromLanguageType === "english") {
    formatRequest += "e";
  }
  if (fromLanguageType === "spanish") {
    formatRequest += "s";
  }
  if (fromLanguageType === "german") {
    formatRequest += "g";
  }
  formatRequest += "2";
  if (toLanguageType === "english") {
    formatRequest += "e";
  }
  if (toLanguageType === "spanish") {
    formatRequest += "s";
  }
  if (toLanguageType === "german") {
    formatRequest += "g";
  }

  return formatRequest;
}

//Handle the change of the selector of input language
fromLanguageOption.addEventListener("change", (event) => {
  fromLanguageType = event.target.value;
  typeOfTranslation = getTypeOfTranslation(fromLanguageType, toLanguageType);
  if(textToTranslate !== ''){
    getRequest();
  }
  
});

//Handle the change of the selector of output language
toLanguageOption.addEventListener("change", (event) => {
  toLanguageType = event.target.value;
  typeOfTranslation = getTypeOfTranslation(fromLanguageType, toLanguageType);
  if(textToTranslate !== ''){
    getRequest();
  }
});

//fetch Function to get the request of translation and update the translated text;
function getRequest() {
  let url = "http://localhost:80/" + typeOfTranslation + "/" + textToTranslate;
  fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      toLanguageText.value = text;
    })
    .catch((error) => {
      alert("THERE WAS A PROBLEM");
      console.log(error);
    });
}

//Handle the change of the input & output language field
fromLanguageText.addEventListener("input", (event) => {
  textToTranslate = event.target.value;
  if (fromLanguageType === toLanguageType) {
    toLanguageText.value = textToTranslate;
  } else {
    textToTranslate = textToTranslate.replace(/ /g, '+')
    if (textToTranslate === "") {
      toLanguageText.value = "";
    } else {
        getRequest();
    }
  }
});
