import { useEffect, useState, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "./Board.css";

function Board() {

    const {keyPress, answers, setAnswers, setKeyboardUpdate} = useContext(GameContext);
    const numRows = 6; // number of guesses in the game
    const CURRENT_ANSWER = 0; // used for indexing answers array
    const NUMBER_IDS = 54; // lowercase and uppercase alphabet
    const [numTiles, setNumTiles] = useState((answers[CURRENT_ANSWER]) ? answers[CURRENT_ANSWER].length : 0);
    const ids = [...Array(NUMBER_IDS).keys()].map((n) => 
        (n < 26) ? String.fromCharCode(97 + n) : String.fromCharCode(65 + (n - 26))
    ); // array of ids of tiles
    let idCount = 0; // used for initial render for initializing id's to html 
    const [guessLetter, setGuessLetter] = useState(0); // guessLetter points at current index of tile to guess on
    const [guessWordCount, setGuessWordCount] = useState(0); // guessWordCount keeps track of number of guessed words
    const [isStopped, setIsStopped] = useState(false); // set to true when game is stopped
    const FLIP_BOUNCE_DELAY = 200; // microseconds
    const PRE_BOUNCE_DELAY = 200 * numTiles; // microseconds
    const DELAY = 3000; // microseconds
    const GREEN = "rgb(107,170,101)"; // green color
    const DARK_GRAY = "rgb(129, 131, 132)"; // dark gray color
    const LIGHT_GRAY = "rgb(211, 214, 218)"; // light gray color
    const YELLOW = "rgb(181, 159, 59)"; // yellow color

    // useState callback function handlers
    function incrementGuessLetter() { setGuessLetter(prevState => prevState + 1); } 
    function decrementGuessLetter() { setGuessLetter(prevState => prevState - 1); }
    function incrementGuessWordCount() { setGuessWordCount(prevState => prevState + 1); }
    function stopGame() { setIsStopped(true); }
    function updateKeyboard(guessWord) { setKeyboardUpdate(prevState => ({update: prevState.update + 1, guess: guessWord})); }
    function updateAnswer() { setAnswers(prevState => prevState.slice(1, prevState.length)); }
    function updateTiles() {
        // Delay code from running because of async function updateGuess 
        setTimeout(() => {
            setNumTiles((answers[CURRENT_ANSWER+1]) ? answers[CURRENT_ANSWER+1].length : answers[CURRENT_ANSWER].length);
        }, DELAY)
    }
    
    function correctGuess() {
        let guess = "";
        for (let i = guessLetter-numTiles; i < guessLetter; i++) {
            guess = guess.concat(document.getElementById(ids[i]).innerText);
        }
        return guess === answers[CURRENT_ANSWER];
    }

    async function updateGuess() {
        let guess = {};

        for (let i = guessLetter-numTiles; i < guessLetter; i++) {

            let tile = document.getElementById(ids[i]);
            tile.classList.add("animate__animated", "animate__flipInX");

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

            // Using await to  temporarily "block" following code from running
            await new Promise(r => setTimeout(r, FLIP_BOUNCE_DELAY)); 

        }
        updateKeyboard(guess); // update keyboard with corresponding colors
    }

    function restartBoard() {
        // Delay code from running to wait for async updateGuess function to resolve
        setTimeout(() => {     
            // change each tile to an empty tile
            for (let i = 0; i < numRows * numTiles; i++) {
                let tile = document.getElementById(ids[i]);
                if (tile.innerText) tile.innerText = ""; 
                tile.style.color = "black";
                tile.style.backgroundColor = "white";
                tile.style.borderColor = LIGHT_GRAY;
            }
            setGuessLetter(0); // point to first tile in board (at index 0)
            setGuessWordCount(0); // restart to zero guesses
        }, DELAY);
    }

    async function bounceRow() {
        await new Promise(r => setTimeout(r, PRE_BOUNCE_DELAY)); // wait for flipInX from updateGuess() to occur

        // Remove flipInX from class list from all tiles prior to current guessLetter index
        for (let i = 0; i < guessLetter; i++) {
            let tile = document.getElementById(ids[i]);
            tile.classList.remove("animate__flipInX");
        }
        // Add bounce animation to current row
        for (let i = guessLetter-numTiles; i < guessLetter; i++) {
            let tile = document.getElementById(ids[i]);
            tile.classList.add("animate__bounce");
            await new Promise(r => setTimeout(r, FLIP_BOUNCE_DELAY));
        }
        // Remove bounce animation from current row for further rounds
        await new Promise(r => setTimeout(r, PRE_BOUNCE_DELAY));
        for (let i = guessLetter-numTiles; i < guessLetter; i++) {
            let tile = document.getElementById(ids[i]);
            tile.classList.remove("animate__bounce");
        }
    }

    const handleKeyDown = (event) => {
        // When game is stopped, further guesses are prevented
        if (isStopped) {
            console.log("Game is stopped.");
        }
        // Deleting guessed letter
        else if (event.key === "Backspace" && (guessLetter >= (guessWordCount * numTiles))) {

            if (guessLetter !== (guessWordCount * numTiles)) { 
                document.getElementById(ids[guessLetter - 1]).innerText = "" ; 
                document.getElementById(ids[guessLetter - 1]).style.borderColor = "rgb(211, 214, 218)"; // light grey

                // NOTE: guessLetter has not been decremented yet (Does not update state of guessLetter at same time as useEffect)
                decrementGuessLetter();
            }

        }
        // Adding guessed letter
        else if (ids.includes(event.key) && (guessLetter < (guessWordCount + 1) * numTiles)) { 
            document.getElementById(ids[guessLetter]).innerText = event.key;
            document.getElementById(ids[guessLetter]).style.borderColor = "rgb(129, 131, 132)"; // dark grey 
            incrementGuessLetter();
        }
        // Word is guessed, move to next row
        else if (event.key === "Enter" && (guessLetter % numTiles === 0) && guessLetter !== 0) {
            incrementGuessWordCount();
            updateGuess();
            if (correctGuess()) {
                bounceRow();
                updateAnswer();
                updateTiles();
                if (answers.length === 1) {  // if current answer is last answer remaining
                    stopGame();
                }
                else {
                    restartBoard();
                    console.log("Next round!");
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
        // When game is stopped, further guesses are prevented
        if (isStopped) {
            console.log("Game is stopped.");
        }
        // Deleting guessed letter
        else if (keyPress.key === "⌫" && (guessLetter >= (guessWordCount * numTiles))) { 

            if (guessLetter !== (guessWordCount * numTiles)) { 
                document.getElementById(ids[guessLetter - 1]).innerText = "" ; 
                document.getElementById(ids[guessLetter - 1]).style.borderColor = "rgb(211, 214, 218)"; // light grey

                // NOTE: guessLetter has not been decremented yet (Does not update state of guessLetter at same time as useEffect)
                decrementGuessLetter();
            }
        }
        // Adding guessed letter
        else if (ids.includes(keyPress.key) && (guessLetter < (guessWordCount + 1) * numTiles)) {
            document.getElementById(ids[guessLetter]).innerText = keyPress.key;
            document.getElementById(ids[guessLetter]).style.borderColor = "rgb(129, 131, 132)"; // dark grey 
            incrementGuessLetter();
        }
        // Word is guessed, move to next row
        else if (keyPress.key === "Enter" && (guessLetter % numTiles === 0) && guessLetter !== 0) { 
            incrementGuessWordCount();
            updateGuess();
            if (correctGuess()) {
                bounceRow();
                updateAnswer();
                updateTiles();
                if (answers.length === 1) {  // if current answer is last answer remaining
                    stopGame();
                }
                else {
                    restartBoard();
                    console.log("Next round!");
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