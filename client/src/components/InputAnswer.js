import { useState, useRef, useContext, useEffect } from "react";
import { AnswersContext } from "../contexts/AnswersContext";
import "./InputAnswer.css";
import refresh from "../images/refresh.png";
import save from "../images/save.png";

function InputAnswer(props) {
  const inputAnswerRef = useRef(null);
  const answerRef = useRef(null);
  const rowRef = useRef(null);
  const savedRef = useRef(null);
  const [answer, setAnswer] = useState(["", "", "", "", ""]);
  const { setAnswers, loadFinish } = useContext(AnswersContext);
  const MAX_TILES = 7;
  const MIN_TILES = 3;
  const GREEN = "rgb(107,170,101)"; // green color
  const LIGHT_GRAY = "rgb(211, 214, 218)"; // light gray color
  const DELAY = 3000; // 3 second
  let tileCount = 0;

  const handleRefresh = () => {
    if (!loadFinish) {
      // Update answer state
      let answerArr = [];
      const answerVal = answerRef.current.value;
      const regex = /[a-zA-z]*/;
      if (
        answerVal.length >= MIN_TILES &&
        answerVal.match(regex) == answerVal
      ) {
        for (let i = 0; i < answerVal.length; i++) {
          answerArr.push(answerVal.charAt(i).toUpperCase());
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

      // Reset saved answers back to unsaved
      setAnswers((prevState) => {
        let newAnswers = [...prevState];
        newAnswers[props.answerIndex] = "";
        return newAnswers;
      });
    }
  };

  const handleSave = () => {
    // Iterate through each tile to save answer. Change tiles to green.
    let answerSaved = "";
    for (let i = 0; i < rowRef.current.children.length; i++) {
      const child = rowRef.current.children[i];
      if (child.innerText !== "") {
        child.style.backgroundColor = GREEN;
        child.style.borderColor = GREEN;
        child.style.color = "white";
        answerSaved = answerSaved.concat(child.innerText);
      }
    }

    if (
      answerSaved !== "" &&
      answerRef.current.value.toUpperCase() === answerSaved
    ) {
      // Show "Saved" notification from screen
      if (!loadFinish) {
        savedRef.current.classList.add("active");
        setTimeout(() => savedRef.current.classList.remove("active"), DELAY);
      }

      // "Return" saved answer to AnswersContext
      setAnswers((prevState) => {
        let newAnswers = [...prevState];
        newAnswers[props.answerIndex] = answerSaved;
        return newAnswers;
      });
    }
  };

  useEffect(() => {
    inputAnswerRef.current.addEventListener("keydown", (event) => {
      if (event.key === "Enter") handleRefresh();
    });
  }, [inputAnswerRef]);

  return (
    <div className="input-answer-container" ref={inputAnswerRef}>
      <div className="enter-answer-container">
        <input
          type="text"
          minLength={`${MIN_TILES}`}
          maxLength={`${MAX_TILES}`}
          placeholder="Enter..."
          className="enter-answer"
          ref={answerRef}
        ></input>
        <input
          type="image"
          src={refresh}
          alt="Refresh"
          className="refresh"
          onClick={handleRefresh}
        ></input>
        <input
          type="image"
          src={save}
          alt="Save"
          className="save"
          onClick={handleSave}
        ></input>
      </div>
      <div className="row" ref={rowRef}>
        {answer.map((letter) => (
          <div className="answer-tile" id={`${tileCount++}`}>
            {letter}
          </div>
        ))}
      </div>
      <p className="saved" ref={savedRef}>
        Saved
      </p>
    </div>
  );
}

export default InputAnswer;
