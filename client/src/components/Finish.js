import { useContext, useRef } from "react";
import { AnswersContext } from "../contexts/AnswersContext";
import { removeEmpty } from "../utils/utils";
import "./Finish.css";

function Finish(props) {
  const { setIsFinished, setLoadFinish, answers } = useContext(AnswersContext);
  const invalidRef = useRef(null);
  const handleYes = () => {
    setIsFinished(true);
    setLoadFinish(true);
  };
  const handleNotYet = () => {
    setIsFinished(false);
    setLoadFinish(false);
  };

  if (props.invalid.isInvalid && invalidRef.current) {
    invalidRef.current.innerText = props.invalid.invalidMessage;
    invalidRef.current.classList.add("show");
  }

  const cleanAnswers = removeEmpty(answers);

  return (
    <div className="finish-container">
      <h1 className="confirm-finish-prompt">
        Are you sure you want to finish?
      </h1>
      <h2 className="confirm-finish-answers-prompt">{`${cleanAnswers.length} answer(s) saved:`}</h2>
      <div className="confirm-finish-answers">
        {cleanAnswers.map((a) => (
          <p className="finish-answer">{a}</p>
        ))}
      </div>
      <div className="button-container">
        <button className="confirm-finish-button" id="yes" onClick={handleYes}>
          Yes
        </button>
        <button
          className="confirm-finish-button"
          id="not-yet"
          onClick={handleNotYet}
        >
          Not yet
        </button>
      </div>
      <p className="invalid-finish" ref={invalidRef}></p>
    </div>
  );
}

export default Finish;
