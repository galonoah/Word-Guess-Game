var wordList = [
	"Earth",
	"Galaxy",
	"Jupiter",
	"Mars",
	"astronaut",
	"comet",
	"moon",
	"planets",
	"rocket"
];
var currentWord = document.getElementById("currentWord");
var userGuessLetters = document.getElementById("userGuessLetters");
var numberOfGuesses = document.getElementById("numberOfGuesses");
var winsCounter = document.getElementById("winsCounter");
var losesCounter = document.getElementById("losesCounter");
var usedWords = [];
var usedCharacters = "";
var guessesCounter = 12;
var wins = 0;
var loses = 0;

//Function will return random word from wordList array
// and prevent repeating words to be return
function randomWord() {
	var getRandomWord = "";
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
function createLowLines(guessWord) {
	for (var i = 0; i < guessWord.length; i++) {
		var lowLine = document.createElement("div");
		lowLine.textContent = "_";
		currentWord.appendChild(lowLine);
	}
}

// First condition checks A-Z keypress characters only
// Second condition checks if key press character is contain in the guess word
// Third condition checks the key press character position
// If first condition fails, character is append it to userGuessedLetters
function checkLetters(guessWord, character, correctWord) {
	var underscoreCharacter = document.querySelectorAll("#currentWord div");

	if (event.keyCode >= 65 && event.keyCode <= 90) {
		if (guessWord.includes(character)) {
			for (let i = 0; i < guessWord.length; i++) {
				if (guessWord[i] == character) {
					//Replace underscore character with key press letter
					underscoreCharacter[i].textContent = character;
					//store keypress letter to array for comparison with guessWord
					correctWord[i] = character;
				}
			}
		} else {
			if (!usedCharacters.includes(character)) {
				var failLetter = document.createElement("div");
				failLetter.textContent = event.key;
				usedCharacters += character;
				userGuessLetters.appendChild(failLetter);
				guessesCounter--;
				numberOfGuesses.textContent = guessesCounter;
			}
		}
	}
}

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
			"url('./assets/images/" +
			guessWord +
			".jpg') #1d1f20 no-repeat center center fixed";
		document.body.style.backgroundSize = "cover";

		numberOfGuesses.innerHTML = "12";
		winsCounter.textContent = ++wins;
		startGame();
	}

	if (guessesCounter == 0) {
		numberOfGuesses.innerHTML = "12";
		userGuessLetters.innerHTML = "";
		losesCounter.textContent = ++loses;
		startGame();
	}
}

function startGame() {
	var guessWord = randomWord();
	var correctWord = [];
	guessesCounter = 12;

	//Removes previous guess word
	currentWord.innerHTML = "";

	//Create underscore lines
	createLowLines(guessWord);

	document.onkeyup = function(event) {
		var character = event.key;

		//Function checks if key press is in Guess Word
		checkLetters(guessWord, character, correctWord);

		//Function checks for correct Guess Word and remaining guesses
		checkCorrectWord(guessWord, correctWord);
	};
}

startGame();
