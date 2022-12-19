import { createRef, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "./Keyboard.css";

function Keyboard() {

    const { keyPress, setKeyPress } = useContext(GameContext);
    const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const keys2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const keys3 = ["Enter", 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'];
    const refs = [...Array(keys1.length + keys2.length + keys3.length)].map(() => createRef(null));
    let refCount = 0;

    function handleClick(keyVal) {
        setKeyPress(prevState => ({key: keyVal, pressCount: prevState.pressCount + 1}));
    }

    return(
        <div className="keyboard-container">
            <div className="keyboard">
                <div className="keyboard-row">
                    {keys1.map((key) => <p className="keyboard-button" ref={refs[refCount++]} onClick={() => handleClick(key)}>{key}</p>)}
                </div>
                <div className="keyboard-row">
                    {keys2.map((key) => <p className="keyboard-button" ref={refs[refCount++]} onClick={() => handleClick(key)}>{key}</p>)}
                </div>
                <div className="keyboard-row">
                    {keys3.map((key) => <p className="keyboard-button" id={key} ref={refs[refCount++]} onClick={() => handleClick(key)}>{key}</p>)}
                </div>
            </div>
        </div>
    );
}

export default Keyboard;