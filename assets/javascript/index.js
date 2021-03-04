"use strict";
var wordList = [
  "Earth",
  "Galaxy",
  "Jupiter",
  "Mars",
  "astronaut",
  "comet",
  "moon",
  "planets",
  "rocket",
];
const currentWord = document.getElementById("currentWord");
const userGuessLetters = document.getElementById("userGuessLetters");
const numberOfGuesses = document.getElementById("numberOfGuesses");
const winsCounter = document.getElementById("winsCounter");
const losesCounter = document.getElementById("losesCounter");
let guessesCounter = 12;
let usedWords = [];
let usedCharacters = "";
let wins = 0;
let loses = 0;
//Function will return random word from wordList array
// and prevent repeating words to be return
function randomWord() {
  let getRandomWord = "";
  do {
    getRandomWord = wordList[Math.floor(Math.random() * wordList.length)];
  } while (usedWords.indexOf(getRandomWord) != -1);
  usedWords.push(getRandomWord);
  if (usedWords.length == wordList.length) usedWords = [];
  return getRandomWord.toLowerCase();
}
// Loop will run as many times as the guessWord length and each time
// will create a Div element with an underscore character and then
// append it to the HTML tag with id = currentWord
function createUnderscore(guessWord) {
  for (let i = 0; i < guessWord.length; i++) {
    let underscore = document.createElement("div");
    underscore.textContent = "_";
    currentWord.appendChild(underscore);
  }
}
// First condition checks A-Z keypress characters only
// Second condition checks if key press character is contain in the guess word
// Third condition checks the key press character position
// If first condition fails, character is append it to userGuessedLetters
let checkLetters;
checkLetters = (guessWord, character, correctWord, event) => {
  const underscoreCharacter = document.querySelectorAll("#currentWord div");
  let code = event.key.codePointAt(0);
  if (code >= 97 && code <= 122) {
    if (guessWord.includes(character)) {
      for (let i = 0; i < guessWord.length; i++) {
        if (guessWord[i] == character) {
          //Replace underscore character with key press letter
          underscoreCharacter[i].textContent = character;
          //store keypress letter to array for comparison with guessWord
          correctWord[i] = character;
          const correctSound = document.getElementById("correctSound");
          correctSound.currentTime = 0;
          correctSound.play();
        }
      }
    } else {
      const wrongSound = document.getElementById("wrongSound");
      wrongSound.currentTime = 0;
      wrongSound.play();
      if (!usedCharacters.includes(character)) {
        const failLetter = document.createElement("div");
        failLetter.textContent = event.key;
        usedCharacters += character;
        userGuessLetters.appendChild(failLetter);
        guessesCounter--;
        numberOfGuesses.textContent = String(guessesCounter);
      }
    }
  }
};
//Function checks if Guess Word is correct
//If guess word is correct, background image changes
//If remaining guesses total is zero, the game restarts
function checkCorrectWord(guessWord, correctWord) {
  if (correctWord.join("") == guessWord) {
    userGuessLetters.innerHTML = "";
    //Add class to body for image transition effect
    document.body.classList.add("transitionBackground");
    //Change background image based on the guessWord
    document.body.style.background =
      "url('assets/images/" +
      guessWord +
      ".jpg') #1d1f20 no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    numberOfGuesses.innerHTML = "12";
    usedCharacters = "";
    winsCounter.textContent = String(++wins);
    restartGame();
  }
  if (guessesCounter == 0) {
    numberOfGuesses.innerHTML = "12";
    usedCharacters = "";
    userGuessLetters.innerHTML = "";
    losesCounter.textContent = String(++loses);
    for (let i = 0; i < guessWord.length; i++) {
      document.querySelectorAll("#currentWord div")[i].textContent =
        guessWord[i];
    }
    restartGame();
  }
}
function startGame() {
  let guessWord = randomWord();
  const correctWord = [];
  guessesCounter = 12;
  //Removes previous guess word
  currentWord.innerHTML = "";
  //Create underscore lines
  createUnderscore(guessWord);
  document.onkeyup = function (e) {
    let character = e.key.toLowerCase();
    let event = e;
    //Function checks if key press is in Guess Word
    checkLetters(guessWord, character, correctWord, event);
    //Function checks for correct Guess Word and remaining guesses
    checkCorrectWord(guessWord, correctWord);
  };
}
function restartGame() {
  document.onkeyup = function () {
    startGame();
  };
}
restartGame();
