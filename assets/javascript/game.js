var wordList = ["Earth", "Galaxy", "Jupiter", "Mars"];

// FUNCTION WILL RETURN RANDOM WORD FROM wordList ARRAY
function randomWord() {
	var word = wordList[Math.floor(Math.random() * wordList.length)];
	return word.toLowerCase();
}

function startGame() {
	var guessWord = randomWord();
	var currentWord = document.getElementById("currentWord");
	var underscoreCharacter = document.querySelectorAll("#currentWord div");

	currentWord.innerHTML = ""; //Removes previous guess word

	// Loop will run as many times as the guessWord length and each time
	// will create a Div element with an underscore character and then
	// append it to the HTML tag with id = currentWord
	for (var i = 0; i < guessWord.length; i++) {
		var character = document.createElement("div");
		character.textContent = "_";
		div = document.getElementById("currentWord");
		currentWord.appendChild(character);
	}

	document.onkeyup = function(event) {
		var letter = event.key;

		if (event.keyCode >= 65 && event.keyCode <= 90) {
			if (guessWord.includes(letter)) {
				for (let i = 0; i < guessWord.length; i++) {
					if (guessWord[i] == letter) {
						underscoreCharacter[i].textContent = letter;
					}
				}
			}
		}
	};
}

startGame();
