import { useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext.js";
import { useParams, useNavigate } from "react-router-dom";
import Fetch from "../apis/Fetch.js";
import Board from "./Board.js";
import Keyboard from "./Keyboard.js";

function Game() {
  const [keyPress, setKeyPress] = useState({
    key: "",
    pressCount: 0,
  });
  const [answers, setAnswers] = useState([]);
  const [keyboardUpdate, setKeyboardUpdate] = useState({
    update: 0,
    guess: {},
  });
  const params = useParams(); // params = { code: -- }
  const navigate = useNavigate();
  const isAdmin = params.code === "maika"; // I am aware of this exposure

  async function getAnswersRequest(code) {
    try {
      const results = Fetch.get("/get-answers/", {
        params: {
          code: code,
        },
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAnswersRequest(params.code).then((results) => {
      if (results.data.data.length !== 0) {
        let resultsAnswers = results.data.data[0];
        setAnswers(Object.values(resultsAnswers));
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        keyPress,
        setKeyPress,
        answers,
        setAnswers,
        keyboardUpdate,
        setKeyboardUpdate,
        isAdmin,
      }}
    >
      <Board />
      <Keyboard />
    </GameContext.Provider>
  );
}

export default Game;
