import { useState } from "react";
import { GameContext } from "../contexts/GameContext.js";
import Board from "./Board.js";
import Keyboard from "./Keyboard.js";

function Game() {

    const [keyPress, setKeyPress] = useState({
        key: "",
        pressCount: 0
    });

    return(
        <GameContext.Provider value={{keyPress, setKeyPress}}>
            <Board />
            <Keyboard />
        </GameContext.Provider>
    );
}

export default Game;
