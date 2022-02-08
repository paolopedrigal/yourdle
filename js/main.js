document.addEventListener("DOMContentLoaded", () => {

    createSquares();

    let guessedWords = [[]]
    let availableSpace = 1;
    let word = "dairy"

    const keys = document.querySelectorAll(".keyboard-row button")

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {           // this creates word limit to 5 letters 
            // if (currentWordArr && currentWordArr.length < 3) for 3 letter words             
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;

        }
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length!==5) {
            window.alert("Word must be 5 letters")                  // Change this to 3 letters for the word "You"
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");

            if (letter == "enter") {
                handleSubmitWord();
                return;
            }

            updateGuessedWords(letter);
        }
    }

});