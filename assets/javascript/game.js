var wordList = ["Earth", "Galaxy", "Jupiter", "Mars"];

// Function will return random word from wordList array
function randomWord() {
	var word = wordList[Math.floor(Math.random() * wordList.length)];
	return word.toLowerCase();
}

function startGame() {
	var guessWord = randomWord();
	console.log(guessWord);
	var currentWord = document.getElementById("currentWord");
	currentWord.innerHTML = ""; //Removes previous guess word

	// Loop will run as many times as the guessWord length and each time
	// will create a Div element with an underscore character and then
	// append it to the HTML tag with id = currentWord
	for (var i = 0; i < guessWord.length; i++) {
		var character = document.createElement("div");
		character.textContent = "_";
		//div = document.getElementById("currentWord");
		currentWord.appendChild(character);
	}

	var underscoreCharacter = document.querySelectorAll("#currentWord div");
	var userGuessLetters = document.getElementById("userGuessLetters");

	document.onkeyup = function(event) {
		var letter = event.key;

		// First condition checks A-Z keypress characters only
		// Second condition checks if key press letter is contain in the guess word
		// Third condition checks the key press letter position
		// If first condition fails, letter is append it to userGuessedLetters
		if (event.keyCode >= 65 && event.keyCode <= 90) {
			if (guessWord.includes(letter)) {
				for (let i = 0; i < guessWord.length; i++) {
					if (guessWord[i] == letter) {
						underscoreCharacter[i].textContent = letter;
					}
				}
			} else {
				var failLetter = document.createElement("div");
				failLetter.textContent = event.key;
				userGuessLetters.appendChild(failLetter);
			}
		} 
	};
}

startGame();
