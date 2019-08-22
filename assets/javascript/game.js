var guessWords = [
    "ralph wiggum",
    "milhouse van houten",
    "barney gumble",
    "waylon smithers",
    "ned flanders",
    "krusty the clown",
    "principal skinner",
    "moe szyslak",
    "apu nahasapeemapetilon",
    "lenny leonard",
    "kearny zzyzwicz",
    "disco stu",
    "bleeding gums murphy",
    "rainier wolfcastle",
    "superintendent chalmers",
    "comic book guy",
    "duffman",
    "reverend lovejoy",
    "edna krabappel",
    "sideshow bob",
    "charles montgomery burns",
    "groundskeeper willie",
    "frank grimes jr",
    "drederick tatum",
    "crazy cat lady"
];

var wins = 0;
//  var keyPressed = [];
var triesLeft = 6;
var name;
var previousName;
var blankArray = [];
var nameArray = [];
var pastLettersArray = [];
const availableLettersArray = "abcdefghijklmnopqrstuvwxyz";
var letterPoolArray = availableLettersArray.split("");
var gameEndState = false;
var gameBoard = document.getElementById("word");
var winLoseText = document.getElementById("win-lose");
var letterPoolText = document.getElementById("available-letters");
var winAudio = new Audio('assets/sounds/win.mp3');
var loseAudio = new Audio('assets/sounds/lose.mp3');
var regex = /^[a-z]$/;
var playAgain = " ";

document.onkeydown = function(event) {
    keyPress = event.key;
    document.getElementById("win-lose").value = "";
    if (triesLeft != 0 && keyPress.match(playAgain) && gameEndState) {
        console.log("play again after win");

        resetBoard();
        chooseNewCharacter();
        placeBlanks();
    } else if (triesLeft === 0 && keyPress.match(playAgain) && gameEndState) {
      console.log("play again after loss");

      resetBoard();
      chooseNewCharacter();
      placeBlanks();
    }

    if (keyPress.match(regex)) {
        document.getElementById("win-lose").value = "";
        for (let i = 0; i < nameArray.length; i++) {
            if(keyPress === nameArray[i]) {
                blankArray[i] = keyPress;
            };

            var pool = letterPoolArray.indexOf(keyPress);
            if (pool >= 0) {
                letterPoolArray[pool] = " ";
                document.getElementById("available-letters").textContent = letterPoolArray.join("")
            }
        };

        gameBoard.textContent = blankArray.join("");
        if (nameArray.indexOf(keyPress) === -1) {
            if(pasteLettersArray.indexOf(keyPress) === -1 && !gameEndState) {
                pasteLettersArray.push(keyPress);
                --triesLeft;
            }

            document.getElementById("remaining-guesses").textContent = "TRIES: " + triesLeft;
        };

        if (triesLeft !== 0) {
            if (nameArray.join("") === blankArray.join("")) {
                if (!gameEndState) {
                    wins++;
                    winAudio.play();
                }

                gameEndState = true;
                document.getElementById("wins").textContent = "WINS: " + wins;
                winLoseText.value = "You Win! Press spacebar to play again";
            }
        } else {
            if (!gameEndState) {
                loseAudio.play();
            }

            if (nameArray.join("") === blankArray.join("")) {
                document.getElementById("character-img").style.visibility = "visible";
            }
            wins = 0;
            gameEndState = true;
            winLoseText.textContent = "You lose! Press the spacebar to play again.";
        }
    }
}

function chooseNewCharacter() {
    var index = (Math.floor(Math.random() * guessWords.length));
    name = guessWords[index];
    nameArray = name.split("");

    document.getElementById("character-img").src = "assets/images/" + nameArray.join("") + ".png";

    console.log(nameArray.join(""));

};

function placeBlanks() {
    blankArray = [];
    gameBoard.textContent = blankArray;
    
    for (var i = 0; i < nameArray.length; i++) {
        if (nameArray[i] === " "){
            blankArray[i] = " ";
            gameBoard.textContent += blankArray[i];
        } else {
            blankArray[i] = "_";
            gameBoard.textContent += blankArray[i];
        }
    }
};

function resetBoard() {
    gameEndState = false;
    winLoseText.textContent = "";
    document.getElementById("win-lose").value = "";

    if (triesLeft === 0) {
        document.getElementById("wins").textContent = "WINS: " + wins;
    }

    triesLeft = 6;
    document.getElementById("remaining-guesses").textContent = "TRIES: " +
    triesLeft;

    document.getElementById("characters-img").style.visibility = "hidden";
    pastLettersArray = [];

    letterPoolArray = availableLettersArray.split("");
    letterPoolText.textContent = letterPoolArray.join("");
    focusInput();
}

function focusInput() {
    document.getElementById("win-lose").focus();
}

chooseNewCharacter();
placeBlanks();
focusInput();