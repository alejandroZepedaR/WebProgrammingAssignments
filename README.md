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



