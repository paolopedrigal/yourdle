import { useEffect, useState, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "./Board.css";

function Board () {

    const {keyPress} = useContext(GameContext);
    const numRows = 6;
    const numTiles = 5;
    const ids = [...Array(numRows * numTiles).keys()].map((n) => 
        (n < 26) ? String.fromCharCode(97 + n) : String.fromCharCode(65 + (n - 26))
    );
    let idCount = 0;
    const [guessLetter, setGuessLetter] = useState(0); // guessLetter points at current index of tile to guess on
    const [guessWordCount, setGuessWordCount] = useState(0); // guessWordCount keeps track of number of guessed words

    function incrementGuessLetter() { setGuessLetter(prevState => prevState + 1); } 
    function decrementGuessLetter() { setGuessLetter(prevState => prevState - 1); }
    function incrementGuessWordCount() { setGuessWordCount(prevState => prevState + 1); }

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