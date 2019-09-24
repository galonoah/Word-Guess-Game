var wordList = ["Earth", "Galaxy", "Jupiter", "Mars"];

// FUNCTION WILL RETURN RANDOM WORD FROM wordList ARRAY
function randomWord() {
	var word = wordList[Math.floor(Math.random() * wordList.length)];
	return word;
}

function startGame() {
	var guessWord = randomWord();
	var currentWord = document.getElementById("currentWord");
	currentWord.innerHTML = ""; 

	// Loop will run as many times as the guessWord length and each time
	// will create a Div element with an underscore character and then 
	// append it to the HTML tag with id = currentWord
	for (var i = 0; i < guessWord.length; i++) {
		var character = document.createElement("div");
		character.textContent = "_";
		div = document.getElementById("currentWord");
		currentWord.appendChild(character);
	}
}

startGame();
