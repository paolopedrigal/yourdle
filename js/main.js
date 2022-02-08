// Test case: If letter correctly guessed is placed multiple times
// E.g. WOGDD (correct: WOULD) has the first D to be yellow and the second D to be green 

document.addEventListener("DOMContentLoaded", () => {

    createSquares();

    let guessedWords = [[]]
    let availableSpace = 1;
    let word = "would"                                                            // change word
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

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "regb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);

        if (isCorrectPosition) {
            return "rgb(202, 114, 204)";                    // Pink color is correct color for valentine's
        }

        return "rgb(181, 159, 59)"
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
                const tileColor = getTileColor(letter, index);

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

        for (let index = 0; index < 30; index++) {          // change number of squares for word
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop()

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = "";
        availableSpace = availableSpace - 1;
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");

            if (letter == "enter") {
                handleSubmitWord();
                return;
            }

            if (letter === "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        }
    }

});