document.addEventListener("DOMContentLoaded", () => {

    createSquares();

    let guessedWords = [[]]
    let availableSpace = 1;
    let word = "would"
    let guessedWordCount = 0;

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
        if (currentWordArr.length!==5) {                    // Change this to 3 letters for the word "You", for example
            window.alert("Word must be 5 letters");                  
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1;     // Change 5 to max limit of letters, if needed
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = "rgb(58, 58, 60)";

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:"${tileColor}`;

            }, interval * index)
        });

        guessedWordCount += 1;

        if (currentWord === word) {                          // Change this to words for Valentine's
            window.alert("Congratulations!");
        }

        if (guessedWords.length === 6) {
            window.alert("Sorry, you have no more guesses!")
        }

        guessedWords.push([]) // pushes an empty array for next word to guess
    }

    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
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