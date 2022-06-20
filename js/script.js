//The unordered list where the player’s guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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
const messages = document.querySelector(".messages");
//The hidden button that will appear prompting the player to play again
const hidden = document.querySelector(".play-again hide");
//Magnolia is the starting word to test out the game 
const word = "magnolia";

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
    const inputLetter = letter.value;
    console.log(inputLetter);
    letter.value = "";
});