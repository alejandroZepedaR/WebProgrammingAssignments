//Alejandro Zepeda CSC 337 PA #4

//The main application is composed of three main “sections” The sidebar should contain the application title, the input text field, this shift slider (more on that later) and the cipher square (again, more on that later).
//Next to the sidebar there should be two text fields with large font. You are welcome to customize the fonts, colors, and style. However, I do recommend using the Courier font for these two sections because it is monospace.
//The top text field should be used to display the Caesar cipher encryption of the regular text entered into the input field. The basics of how the Caesar cipher should work is covered later.
//The bottom text field should be used to display the Square cipher encryption of the regular text entered into the input field. The square cipher is basically a simplified two square cipher, and it will be explained a bit below.
//The slider should slide between values 0 and 26, and the value should be displayed next to it.
//Clicking the “Update Square” button should shuffle the letters in the 5x5 letter grid in the sidebar. The letters in the sidebar should be A-Y (Z not included, since the alphabet has 26 letters).

//All document elements used
let plainTextInput = document.getElementById("plainText");
let slider = document.getElementById("slider");
let sliderTag = document.getElementById("shiftValue");
let caesarText = document.getElementById("caesarCipherText");
let squareText = document.getElementById("squareCipherText");
let squareLetters = document.getElementsByClassName("square-letter");

//Constant alphabet in order
const alphabet = [
    "a", "b", "c", "d",
    "e", "f", "g", "h",
    "i", "j", "k", "l",
    "m", "n", "o", "p",
    "q","r","s","t","u",
    "v","w","x","y","z"
];
//initial alphabet for square cipher without the Z
let newAlphabet = alphabet.filter(letter => letter !== 'z');

//Event listeners for the inputs, so they change when updated
slider.addEventListener('input', changeInputShift);
plainTextInput.addEventListener('input', changeCaesarText);

//Updating the display of the value for the shift key slider
sliderTag.innerText = slider.value;

//initial variables for the texta and shift value
let plainText = "Welcome to the Jumble";
let shift = 0;


//Function that handles the change of the input values
function changeInputShift(event){
    shift = Number(event.target.value);
    sliderTag.innerText = event.target.value;
    changeCipherText(caesarCipher(), caesarText);
}

//function to change the text of the h2 of the ciphered text
function changeCaesarText(event){
    if(event.target.value === ''){
        plainText = "Welcome to the Jumble";
    }else{
        plainText = event.target.value;
    }
    plainText = plainText.toLowerCase();// using lower case to match the cases to the alphabet arrays 
    changeCipherText(caesarCipher(), caesarText);
    changeCipherText(squareCipher(), squareText);
}

//Function that takes in a cipher function and the element to change the text
function changeCipherText(cipherFunction, element){
    let cipherText = cipherFunction;
    element.innerText = cipherText;
}

//function that changes the display of the alphabet table when button is clicked
function changeSquareLetters(){
    newAlphabet = getSquareAlphabet();
    for (let i = 0; i < squareLetters.length; i++){
        squareLetters[i].innerText = newAlphabet[i].toUpperCase();
    }
    changeCipherText(squareCipher(), squareText);
}

//Function that sorts the alphabet in a random order
function getSquareAlphabet(){
    newAlphabet.sort(function(){
        return Math.random() - 0.5;
    })
    return newAlphabet;
}

function squareCipher(){
    let cipheredText = '';
    for(let i = 0; i < plainText.length; i++){
        const char = plainText[i]; 
        const initialIndex = alphabet.indexOf(char);// Grab index of the ordered alphabet that corresponds to the character
        if(initialIndex !== -1 && char !== 'z'){
            cipheredText += newAlphabet[initialIndex];//append the index letter of the shuffled alphabet to the ciphered text
        }else{
            cipheredText += char;// In case of spaces, special characters or the letter 'z'
        }
    }
    return cipheredText;
}

function caesarCipher(){
    let cipherText = "";

    for (let i = 0; i< plainText.length; i++){
        let char = plainText[i];

       if(alphabet.includes(char)){
        let charIndex = alphabet.indexOf(char);
        let cipherIndex = (charIndex + shift + 26) % 26;//Shifts the letter the amount of spaces indicated by the shift key
        cipherText += alphabet[cipherIndex];
       }else{
        cipherText += char;
       }
    }
    return cipherText;
}