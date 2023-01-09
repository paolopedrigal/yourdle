import { useState, useEffect } from "react";
import { AnswersContext } from "../contexts/AnswersContext.js";
import InputAnswer from "./InputAnswer.js";
import "./Answers.css";

function Answers() {

    const MIN_NUM_ANSWERS = 1;
    const MAX_NUM_ANSWERS = 5;
    const [numAnswers, setNumAnswers] = useState(1);
    const [answers, setAnswers] = useState([...Array(MAX_NUM_ANSWERS)].map(() => ""));
    const decrementAnswers = () => { if (numAnswers > MIN_NUM_ANSWERS) setNumAnswers(prevState => prevState-1); }
    const incrementAnswers = () => { if (numAnswers < MAX_NUM_ANSWERS) setNumAnswers(prevState => prevState+1); }
    let answerIndex = 0;


    useEffect(() => {
        console.log(answers);
    }, [answers])


    return (
        <div className="answers-container">
            <AnswersContext.Provider value={{answers, setAnswers}} >
                {[...Array(numAnswers)].map(() => <InputAnswer answerIndex={answerIndex++}/>)}
            </AnswersContext.Provider >
            <div className="buttons-container">
                <button className={(numAnswers!=MIN_NUM_ANSWERS) ? "answers-button" : "answers-button inactive"} onClick={decrementAnswers}>-</button>
                <button className={(numAnswers!=MAX_NUM_ANSWERS) ? "answers-button" : "answers-button inactive"} onClick={incrementAnswers}>+</button>
                <button className="next">Next →</button>
            </div>
        </div>


    );
}

export default Answers;

