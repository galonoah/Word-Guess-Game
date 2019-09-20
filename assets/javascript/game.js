var wordList = ["Earth", "Galaxy", "Jupiter", "Mars"];

function randomWord() {
	var word = wordList[Math.floor(Math.random() * wordList.length)];
	return word;
}

var guessWord = randomWord();
