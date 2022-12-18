import { useEffect } from "react";
import "./Board.css";

function Board () {

    const numRows = 6;
    const numTiles = 5;
    const ids = [...Array(numRows * numTiles).keys()].map((n) => 
        (n < 26) ? String.fromCharCode(97 + n) : String.fromCharCode(65 + (n - 26))
    );
    let idCount = 0;
    let guessLetter = 0;
    let guessWordCount = 0


    useEffect(() => {
        document.addEventListener("keydown", (event) => {

            if (event.key === "Backspace" && (guessLetter >= (guessWordCount * numTiles))) { // Deleting guessed letter
                guessLetter = (guessLetter == (guessWordCount * numTiles)) ? guessLetter : guessLetter - 1;
                document.getElementById(ids[guessLetter]).innerText = "";
                document.getElementById(ids[guessLetter]).style.borderColor = "rgb(211, 214, 218)"; // light grey
            }
            else if (ids.includes(event.key) && (guessLetter < (guessWordCount + 1) * numTiles)) { // Adding guessed letter
                document.getElementById(ids[guessLetter]).innerText = event.key;
                document.getElementById(ids[guessLetter]).style.borderColor = "rgb(129, 131, 132)"; // dark grey 
                guessLetter++;
            }
            else if (event.key === "Enter" && (guessLetter % numTiles == 0) && guessLetter != 0) { // Word is guessed, move to next row
                console.log("Word is guessed.")
                guessWordCount++;
                console.log(guessLetter)
            }
        });
    })


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

export { Board };
