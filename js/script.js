//The unordered list where the player’s guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter
const letter = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display
const remainingDisplay = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display
const spanRemaining = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const hidden = document.querySelector(".play-again hide");
//Magnolia is the starting word to test out the game 
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const data = await res.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    addPlaceholders(word);
};
getWord();

const addPlaceholders = function (word) {
    const placeholderLetters = [];
    for (const theLetter of word) {
        //console.log(theLetter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
        countRemainingGuesses(inputLetter);
        playerGuess();
        updateWord(guessedLetters);
    }
    
};

const playerGuess = function () {
    guessedLettersElement.innerHTML = "";
    for (const theLetter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = theLetter;
      guessedLettersElement.append(li);
    }
};

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const correctlyGuessedLetters = [];
    //console.log(wordArray);
    for (const theLetter of wordArray) {
    if (guessedLetters.includes(theLetter)) {
        correctlyGuessedLetters.push(theLetter.toUpperCase());
    } else {
        correctlyGuessedLetters.push("●");
    }
  }
  console.log(correctlyGuessedLetters);
  wordInProgress.innerText = correctlyGuessedLetters.join("");
  checkIfWon();
};

const countRemainingGuesses = function (inputLetter) {
    const wordUp = word.toUpperCase();
    if (!wordUp.includes(inputLetter)) {
        message.innerText = `Sorry, ${inputLetter} isn't part of the word.`;
        remainingGuesses -= 1;
    }   else {
        message.innerText = `Nice! ${inputLetter} is part of the word!`;
    }
    
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The correct word was <span class="highlight">${word}.</span>`;
    } else if (remainingGuesses === 1) {
        spanRemaining.innerText = `${remainingGuesses} guess`; 
    } else {
        spanRemaining.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correct! Congrats!</p>`;
    }
};

