import { useState } from "react";
import { GameContext } from "../contexts/GameContext.js";
import Board from "./Board.js";
import Keyboard from "./Keyboard.js";

function Game() {

    const [keyPress, setKeyPress] = useState({
        key: "",
        pressCount: 0
    });
    const [answers, setAnswers] = useState(["CRANE", "MAIKA"]); // TODO: get answers from user, MAKE SURE ANSWERS ARE ALL CAPITALIZED
    const [keyboardUpdate, setKeyboardUpdate] = useState({
        update: 0,
        guess: {}
    });

    return(
        <GameContext.Provider value={{keyPress, 
            setKeyPress, 
            answers, 
            setAnswers,
            keyboardUpdate,
            setKeyboardUpdate}}
        >
            <Board />
            <Keyboard />
        </GameContext.Provider>
    );
}

export default Game;
