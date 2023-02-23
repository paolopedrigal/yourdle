import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnswersContext } from "../contexts/AnswersContext.js";
import Fetch from "../apis/Fetch.js";
import InputAnswer from "./InputAnswer.js";
import Finish from "./Finish.js"
import { removeEmpty } from "../utils/utils.js";
import "./Answers.css";

function Answers() {

    const MIN_NUM_ANSWERS = 1;
    const MAX_NUM_ANSWERS = 5;
    const [numAnswers, setNumAnswers] = useState(1);
    const [answers, setAnswers] = useState([...Array(MAX_NUM_ANSWERS)].map(() => ""));
    const [loadFinish, setLoadFinish] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [invalidFinish, setInvalidFinish] = useState({
        isInvalid: false,
        invalidMessage: ""
    });
    const navigate = useNavigate();
    const params = useParams(); // params = { name: -- }
    const decrementAnswers = () => { if (numAnswers > MIN_NUM_ANSWERS) setNumAnswers(prevState => prevState-1); }
    const incrementAnswers = () => { if (numAnswers < MAX_NUM_ANSWERS) setNumAnswers(prevState => prevState+1); }
    const handleFinish = () => { if (removeEmpty(answers).length !== 0) setLoadFinish(true); }
    const DELAY = 1000; // 1 second
    let answerIndex = 0;

    useEffect(() => {
        const cleanAnswers = removeEmpty(answers);

        if (cleanAnswers.length >= 1) { // If there are at least one non-empty answers submitted

            // Check database for submitted answers
            checkAnswersRequest().then((results) => { 

                // If the user exists in the database
                if (results.data.data.length != 0) {

                    // If the user already has answers
                    if (results.data.data[0].answer1 != null) {
                        setInvalidFinish({isInvalid: true, invalidMessage: "Cannot update existing answers."});
                    }
                    // Otherwise, add the answers for the user in the database
                    else {
                        updateAnswersRequest(cleanAnswers);
                    }
                }
                // Otherwise, the user does not exist in the database
                else {
                    setInvalidFinish({isInvalid: true, invalidMessage: "This user does not exist."})
                }
            })
        }

    }, [isFinished])

    async function checkAnswersRequest() {
        try {
            // Check if given user has any answers already
            const results = await Fetch.get("/check-answers/" + params.name, {
                params: {
                    username: params.name
                }
            });
            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async function updateAnswersRequest(answersArr) {
        try {
            // Update answers for the specific user
            const results = await Fetch.put("/create-yourdle/" + params.name, {
                username: params.name,
                answer1: answersArr.shift(),
                answer2: (answersArr.length >= 1) ? answersArr.shift() : "",
                answer3: (answersArr.length >= 1) ? answersArr.shift() : "",
                answer4: (answersArr.length >= 1) ? answersArr.shift() : "",
                answer5: (answersArr.length >= 1) ? answersArr.shift() : "",
            });
            // Return to home page after 1 second
            setTimeout(() => {
                navigate("/");
            }, DELAY);
        } catch (error) {
            console.log(error);
        }
    }

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
                {loadFinish ? <div className="confirm-finish-box"><Finish invalid={invalidFinish}/></div> : <></>}
            </AnswersContext.Provider>
        </div>

    );
}

export default Answers;

