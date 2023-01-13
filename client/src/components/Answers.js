import { useState, useEffect } from "react";
import { AnswersContext } from "../contexts/AnswersContext.js";
import InputAnswer from "./InputAnswer.js";
import Finish from "./Finish.js"
import removeEmpty from "../utils/utils.js";
import "./Answers.css";

function Answers() {

    const MIN_NUM_ANSWERS = 1;
    const MAX_NUM_ANSWERS = 5;
    const [numAnswers, setNumAnswers] = useState(1);
    const [answers, setAnswers] = useState([...Array(MAX_NUM_ANSWERS)].map(() => ""));
    const [loadFinish, setLoadFinish] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const decrementAnswers = () => { if (numAnswers > MIN_NUM_ANSWERS) setNumAnswers(prevState => prevState-1); }
    const incrementAnswers = () => { if (numAnswers < MAX_NUM_ANSWERS) setNumAnswers(prevState => prevState+1); }
    const handleFinish = () => { if (removeEmpty(answers).length !== 0) setLoadFinish(true); }
    
    let answerIndex = 0;

    useEffect(() => {
        const cleanAnswers = removeEmpty(answers);
        if (cleanAnswers.length >= 1) { // if there are at least one non-empty answers
            console.log("Creating a YOURDLE on", new Date());
            console.log("Saving", cleanAnswers);
        }
    }, [isFinished])

    return (
        <div className={!loadFinish ? "answers-container" : "answers-container finished"}>
            <div className={!loadFinish ? "input-answers-container" : "input-answers-container blur"}>
                <AnswersContext.Provider value={{setAnswers, loadFinish}} >
                    {[...Array(numAnswers)].map(() => <InputAnswer answerIndex={answerIndex++}/>)}
                </AnswersContext.Provider >
                <div className="buttons-container">
                    <button className={(numAnswers!==MIN_NUM_ANSWERS) ? "answers-button" : "answers-button inactive"} onClick={decrementAnswers}>-</button>
                    <button className={(numAnswers!==MAX_NUM_ANSWERS) ? "answers-button" : "answers-button inactive"} onClick={incrementAnswers}>+</button>
                    <button className="finish-button" onClick={handleFinish}>Finish →</button>
                </div>
            </div>
            <AnswersContext.Provider value={{setIsFinished, setLoadFinish}} >
                {loadFinish ? <div className="confirm-finish-box"><Finish /></div> : <></>}
            </AnswersContext.Provider>
        </div>




    );
}

export default Answers;

