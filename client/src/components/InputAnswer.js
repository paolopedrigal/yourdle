import { useState } from "react";
import "./InputAnswer.css";

function InputAnswer() {

    const [numTiles, setNumTiles] = useState(5);

    return(
        <div>
            <div>
                <button type="button">-</button>
                <p>{numTiles}</p>
                <button type="button">+</button>
            </div>
            <div>
                {[...Array(numTiles)].map(() => <div>tile</div>)}
            </div>
            
        </div>
    );
}

export default InputAnswer;