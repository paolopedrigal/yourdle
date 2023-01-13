import { useContext } from "react";
import { AnswersContext } from "../contexts/AnswersContext";
import "./Finish.css";

function Finish() {

    const { setIsFinished, setLoadFinish } = useContext(AnswersContext);
    const handleYes = () => { setIsFinished(true); }
    const handleNotYet = () => { 
        setIsFinished(false);  
        setLoadFinish(false);
    }

    return(
        <div className="finish-container">
           <h1 className="confirm-finish-prompt">Are you sure you want to finish?</h1>
           <div className="button-container">
            <button className="confirm-finish-button" id="yes" onClick={handleYes}>Yes</button>
            <button className="confirm-finish-button" onClick={handleNotYet}>Not yet</button> 
           </div>
        </div>
    );
}

export default Finish;