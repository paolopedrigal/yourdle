import { useState, useEffect, useRef } from "react";
import "./InputAnswer.css";
import refresh from "../images/refresh.png";
import save from "../images/save.png";

function InputAnswer() {

    const answerRef = useRef(null);
    const rowRef = useRef(null);
    const [answer, setAnswer] = useState(["", "", "", "", ""]);
    const MAX_TILES = 8;
    const MIN_TILES = 3;
    const GREEN = "rgb(107,170,101)"; // green color
    const LIGHT_GRAY = "rgb(211, 214, 218)"; // light gray color
    let tileCount = 0;

    const handleRefresh = () => {

        // Update answer state
        let answerArr = [];
        if (answerRef.current.value.length >= MIN_TILES) {
            for (let i = 0; i < answerRef.current.value.length; i++) {
                answerArr.push(answerRef.current.value.charAt(i).toUpperCase());
            }
            setAnswer(answerArr);
        }

        // Use default color of tiles
        for (let i = 0; i < rowRef.current.children.length; i++) {
            const child = rowRef.current.children[i];
            child.style.backgroundColor = "white";
            child.style.borderColor = LIGHT_GRAY;
            child.style.color = "black";
        }
    }

    const handleSave = () => {
        let answerSaved = "";
        for (let i = 0; i < rowRef.current.children.length; i++) {
            const child = rowRef.current.children[i];
            if (child.innerText != "") {
                child.style.backgroundColor = GREEN;
                child.style.borderColor = GREEN;
                child.style.color = "white";
                answerSaved = answerSaved.concat(child.innerText);
            }
        }
        console.log("Saving:", answerSaved);
    }

    return(
        <div className="input-answer-container">
            <div className="enter-answer-container">
                <input type="text" minLength={`${MIN_TILES}`} maxLength={`${MAX_TILES}`} placeholder="Enter answer..." className="enter-answer" ref={answerRef}></input>
                <input type="image" src={refresh} alt="Refresh" className="refresh" onClick={handleRefresh}></input>
                <input type="image" src={save} alt="Save" className="save" onClick={handleSave}></input>
            </div>
            <div className="row" ref={rowRef}>
                { answer.map((letter) => <div className="tile" id={`${tileCount++}`}>{letter}</div>)}
            </div>
        </div>
    );
}

export default InputAnswer;