import { createRef, useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import "./Keyboard.css";

function Keyboard() {

    const { setKeyPress, keyboardUpdate, answers } = useContext(GameContext);
    const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const keys2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const keys3 = ["Enter", 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'];
    const refs = [...Array(keys1.length + keys2.length + keys3.length)].map(() => createRef(null));
    const LIGHT_GRAY = "rgb(211, 214, 218)";
    const DELAY = 2000; // microseconds
    let refCount = 0;

    function handleClick(keyVal) {
        setKeyPress(prevState => ({key: keyVal, pressCount: prevState.pressCount + 1}));
    }

    function updateKeyboard() {
        refs.forEach((ref) => {
            let key = ref.current;
            if (key.innerText in keyboardUpdate.guess) {
                key.style.backgroundColor = keyboardUpdate.guess[key.innerText];
                key.style.color = "white";
            }
        });
    }

    async function restartKeyBoard() {
        await new Promise(r => setTimeout(r, DELAY));
        refs.forEach((ref) => {
            let key = ref.current;
            key.style.backgroundColor = LIGHT_GRAY;
            key.style.color = "black";
        });
    }

    // Update keyboard after every guess
    useEffect(() => {
        updateKeyboard();
    }, [keyboardUpdate]);

    // Restart keyboard after correct guess
    useEffect(() => {
        if (answers != 0) restartKeyBoard(); // If answers == 0 (last answer is guessed), don't restart keyboard
    }, [answers])

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