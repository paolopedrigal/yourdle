import { createRef, useRef, useContext, useEffect, useState } from "react";
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
    const firstUpdate = useRef(true);
    let refCount = 0;
    const [isRestart, setIsRestart] = useState(false);

    function handleClick(keyVal) {
        setKeyPress(prevState => ({key: keyVal, pressCount: prevState.pressCount + 1}));
    }

    function updateKeyboard() {
        console.log("Update");
        refs.forEach((ref) => {
            let key = ref.current;
            if (key.innerText in keyboardUpdate.guess) {
                key.style.backgroundColor = keyboardUpdate.guess[key.innerText];
                key.style.color = "white";
            }
        });
    }

    function restartKeyBoard() {
        console.log("Restart");
        refs.forEach((ref) => {
            let key = ref.current;
            if (key) {
                key.style.backgroundColor = LIGHT_GRAY;
                key.style.color = "black";
            }
        });
    }

    // Update keyboard after every guess
    useEffect(() => {
        if (!isRestart) updateKeyboard();
        else setIsRestart(false);
    }, [keyboardUpdate]);

    // Restart keyboard after correct guess occurs (answers array is updated)
    useEffect(() => {
        if (answers.length >= 1) { 
            restartKeyBoard(); 
            if (!firstUpdate.current) { // Don't set isRestart to true in first render
                setIsRestart(true);
            }
            firstUpdate.current = false; 
        }
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