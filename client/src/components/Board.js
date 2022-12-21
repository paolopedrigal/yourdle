import { useEffect, useState, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "./Board.css";

function Board () {

    const {keyPress, answers, setAnswers, setKeyboardUpdate} = useContext(GameContext);
    const numRows = 6;
    const numTiles = 5;
    const ids = [...Array(numRows * numTiles).keys()].map((n) => 
        (n < 26) ? String.fromCharCode(97 + n) : String.fromCharCode(65 + (n - 26))
    );
    let idCount = 0;
    const CURRENT_ANSWER = 0
    const GREEN = "rgb(107,170,101)";
    const DARK_GRAY = "rgb(129, 131, 132)";
    const LIGHT_GRAY = "rgb(211, 214, 218)";
    const YELLOW = "rgb(181, 159, 59)";
    const [guessLetter, setGuessLetter] = useState(0); // guessLetter points at current index of tile to guess on
    const [guessWordCount, setGuessWordCount] = useState(0); // guessWordCount keeps track of number of guessed words
    const DELAY = 2000; // mucroseconds

    function incrementGuessLetter() { setGuessLetter(prevState => prevState + 1); } 
    function decrementGuessLetter() { setGuessLetter(prevState => prevState - 1); }
    function incrementGuessWordCount() { setGuessWordCount(prevState => prevState + 1); }
    function updateAnswer() { setAnswers(prevState => prevState.slice(1, prevState.length)); }
    function updateKeyboard(guessWord) { setKeyboardUpdate(prevState => ({update: prevState.update + 1, guess: guessWord})); }

    function correctGuess() {
        let guess = "";
        for (let i = guessLetter-numTiles; i < guessLetter; i++) {
            guess = guess.concat(document.getElementById(ids[i]).innerText);
        }
        return guess === answers[CURRENT_ANSWER];
    }

    function updateGuess() {
        let guess = {};
        for (let i = guessLetter-numTiles; i < guessLetter; i++) {

            let tile = document.getElementById(ids[i]);

            // If letter is in the answer
            if (answers[CURRENT_ANSWER].includes(tile.innerText)) {

                // If letter is in same position as letter, background color is green
                if (tile.innerText === answers[CURRENT_ANSWER][i%numTiles]) {
                    tile.style.backgroundColor = GREEN;
                    tile.style.borderColor = GREEN;
                    guess[tile.innerText] = GREEN;
                }
                // Else, background color is yellow
                else {
                    tile.style.backgroundColor = YELLOW;
                    tile.style.borderColor = YELLOW;
                    guess[tile.innerText] = YELLOW;
                }
            }
            // Else, letter background color is gray
            else {
                tile.style.backgroundColor = DARK_GRAY;
                tile.style.borderColor = DARK_GRAY;
                guess[tile.innerText] = DARK_GRAY;
            }

            // For all cases
            tile.style.color = "white"; // letter font color becomes white
        }
        updateKeyboard(guess);
    }

    async function restartBoard() {
        console.log("Restarting board.");
        await new Promise(r => setTimeout(r, DELAY));
        for (let i = 0; i < numRows * numTiles; i++) {
            let tile = document.getElementById(ids[i]);
            tile.innerText = "";
            tile.style.color = "black";
            tile.style.backgroundColor = "white";
            tile.style.borderColor = LIGHT_GRAY;
        }
        setGuessLetter(0);
        setGuessWordCount(0);
    }

    function stopGame() {
        console.log("Game is stopped.");
        setGuessLetter(100001); // Set guessLetter to a high value to prevent further guesses
    }


    const handleKeyDown = (event) => {

        if (event.key === "Backspace" && (guessLetter >= (guessWordCount * numTiles))) { // Deleting guessed letter

            if (guessLetter !== (guessWordCount * numTiles)) { 
                document.getElementById(ids[guessLetter - 1]).innerText = "" ; 
                document.getElementById(ids[guessLetter - 1]).style.borderColor = "rgb(211, 214, 218)"; // light grey

                // NOTE: guessLetter has not been decremented yet (Does not update state of guessLetter at same time as useEffect)
                decrementGuessLetter();
            }

        }
        else if (ids.includes(event.key) && (guessLetter < (guessWordCount + 1) * numTiles)) { // Adding guessed letter
            document.getElementById(ids[guessLetter]).innerText = event.key;
            document.getElementById(ids[guessLetter]).style.borderColor = "rgb(129, 131, 132)"; // dark grey 
            incrementGuessLetter();
        }
        else if (event.key === "Enter" && (guessLetter % numTiles === 0) && guessLetter !== 0) { // Word is guessed, move to next row
            console.log("Word is guessed.");
            incrementGuessWordCount();
            updateGuess();
            if (correctGuess()) {
                updateAnswer();
                if (answers.length === 1) {  // if current answer is last answer left
                    stopGame();
                }
                else {
                    restartBoard();
                }
            }    
        }   

    }

    // When user uses physical keyboard
    useEffect(() => {

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }

    }, [guessLetter, guessWordCount]);

    // When user uses virtual keyboard
    useEffect(() => {

        if (keyPress.key === "⌫" && (guessLetter >= (guessWordCount * numTiles))) { // Deleting guessed letter

            if (guessLetter !== (guessWordCount * numTiles)) { 
                document.getElementById(ids[guessLetter - 1]).innerText = "" ; 
                document.getElementById(ids[guessLetter - 1]).style.borderColor = "rgb(211, 214, 218)"; // light grey

                // NOTE: guessLetter has not been decremented yet (Does not update state of guessLetter at same time as useEffect)
                decrementGuessLetter();
            }
        }
        else if (ids.includes(keyPress.key) && (guessLetter < (guessWordCount + 1) * numTiles)) { // Adding guessed letter
            document.getElementById(ids[guessLetter]).innerText = keyPress.key;
            document.getElementById(ids[guessLetter]).style.borderColor = "rgb(129, 131, 132)"; // dark grey 
            incrementGuessLetter();
        }
        else if (keyPress.key === "Enter" && (guessLetter % numTiles === 0) && guessLetter !== 0) { // Word is guessed, move to next row
            console.log("Word is guessed.");
            incrementGuessWordCount();
            updateGuess();
            if (correctGuess()) {
                updateAnswer();
                if (answers.length === 1) {  // if current answer is last answer left
                    stopGame();
                }
                else {
                    restartBoard();
                }
            } 
        }

    }, [keyPress]);

    return (
        <div>
            {[...Array(numRows)].map(() => 
                <div className="row">
                    {[...Array(numTiles)].map(() => <div className="tile" id={ids[idCount++]}></div>)}
                </div>
            )}
        </div>
    );
}

export default Board;