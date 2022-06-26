//The unordered list where the player’s guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter
const letter = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display
const spanRemaining = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const hidden = document.querySelector(".play-again hide");
//Magnolia is the starting word to test out the game 
const word = "magnolia";
const guessedLetters = [];

const addPlaceholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
addPlaceholders(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const inputLetter = letter.value;
    //console.log(inputLetter);
    const checkInput = validateInput(inputLetter);
    //console.log(checkInput);
   
    if (checkInput) {
        makeGuess(inputLetter);
    }
    letter.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please guess a letter.";
    } else if (input.length > 1) {
        message.innerText = "Oops! Only guess one letter at a time please!"
    }  else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter A-Z.";
    }  else {
        return input;
    }
};

const makeGuess = function (inputLetter) {
    inputLetter = inputLetter.toUpperCase();
    if (guessedLetters.includes(inputLetter)) {
        message.innerText = "That letter has been guessed already. Please guess again.";
    } else {
        guessedLetters.push(inputLetter);
        console.log(guessedLetters);
    }
    

};