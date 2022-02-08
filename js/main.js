// TODO: implement words api to check word is real

document.addEventListener("DOMContentLoaded", () => {

    let solutions = ["night", "stars", "would", "you", "be", "my", "valentine"];           // EVERYTHING HAS TO BE LOWERCASE
    let solutionCount = -1;
    let finalMessageCount = 0;                                                              // final message count is for valentine's day
    let fillerWordsCount = 2;                                                               // filler words count is for valentine's day
    fillerWordsCount = fillerWordsCount + 1;                                                // fixing bug 
    let word;                                                               
    
    let guessedWords = [[]]
    let availableSpace = 1;
    let guessedWordCount = 0;
    finished = false;

    const keys = document.querySelectorAll(".keyboard-row button")
    
    getNewWord();
    createSquares();

    function getNewWord() {
        finalMessageCount = finalMessageCount + 1;                                          // final message count is for valentine's day
        fillerWordsCount = fillerWordsCount - 1;                                            // filler words count is for valentine's day
        solutionCount = solutionCount + 1;
        word = solutions[solutionCount];
        availableSpace = 1;
        guessedWords = [[]]
        guessedWordCount = 0;
        finished = false;

        const button = document.getElementsByTagName("button");
        for (let i = 0; i < button.length; i++) {
            button.item(i).style.backgroundColor = "rgb(129, 131, 132)";
        }


        if (word.length >= 8) {
            let game = document.getElementById("game");
            game.style.maxWidth = "800px";
        }

    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < word.length) {           
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;

        }
    }

    function getTileColor(letter, index) {

        const keyboardButton = document.getElementById(letter);
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            keyboardButton.style.backgroundColor = "rgb(58, 58, 60)";
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);

        if (isCorrectPosition) {
            if (fillerWordsCount > 0) {
                keyboardButton.style.backgroundColor = "rgb(83, 141, 78)";
                return "rgb(83, 141, 78)";
            } 
            keyboardButton.style.backgroundColor = "rgb(202, 114, 204)";  // Pink color is correct color for valentine's
            return "rgb(202, 114, 204)";                    // Pink color is correct color for valentine's
        }

        keyboardButton.style.backgroundColor = "rgb(181, 159, 59)";
        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length!==word.length) {                    
            window.alert("Word must be " + String(word.length) + " letters");  
            return;                
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * word.length + 1;   
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

        if (currentWord === word) {   
            if (finalMessageCount != solutions.length) {
                window.alert("Congratulations!");
            } else {
                window.alert("So, is that a yes? :D")                   // final message is for Valentine's day
            }                       
  
            finished = true;
        }

        if (guessedWords.length === 6) {
            window.alert("Sorry, you have no more guesses!")
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }

        guessedWords.push([]) 
    }

    function removeSquares() {
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < word.length * 6; index++) {          
            let square = document.getElementById(index + 1);
            gameBoard.removeChild(square);
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");
        
        gameBoard.style.gridTemplateColumns = "repeat(" + word.length + ", 1fr)";

        for (let index = 0; index < word.length * 6; index++) {         
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
                
                if (finished === true) {
                    setTimeout(() => {
                        removeSquares();
                        getNewWord();
                        createSquares();
                    }, 2500);
                }
                
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