import React, { useEffect, useState } from "react";
import { checkWin } from "../../helpers/helpers";
import { useSelector } from "react-redux";
import axios from "axios";

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWords,
  setPlayable,
  playAgain,
  timeOfGame,
  dataID,
}) => {
  const [ok, setOk] = useState(false);

  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;
  let finalTime = 0;
  let milliseconds = 0;
  let id= '404';
  let user= '404'

  let normalWord = selectedWords;

  let brojslova = selectedWords.replace(/\.|,|’|:|;|-|'/g, "");

  //brisanje . , ' iz recenice
  selectedWords = selectedWords.replace(/\.|,|'|’|-| /g, "");
  if (
    checkWin(correctLetters, wrongLetters, selectedWords) === "win" &&
    selectedWords.length > 1
  ) {
    finalMessage = "You won!";

    //izracun trajanja igre
    let t1 = performance.now();
    milliseconds = t1 - timeOfGame;
    let minutesW = Math.floor(milliseconds / 60000);
    let secondsW = (((t1 - timeOfGame) % 60000) / 1000).toFixed(0);
    finalTime = minutesW + ":" + (secondsW < 10 ? "0" : "") + secondsW;
    finalMessageRevealWord = `time:${finalTime} minutes`;
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWords) === "lose") {
    finalMessage = "You lost.";

    //izracun trajanja igre
    let t2 = performance.now();
    milliseconds = t2 - timeOfGame;
    let minutesL = Math.floor(milliseconds / 60000);
    let secondsL = (((t2 - timeOfGame) % 60000) / 1000).toFixed(0);
    finalTime = minutesL + ":" + (secondsL < 10 ? "0" : "") + secondsL;
    finalMessageRevealWord = `...the word was: ${normalWord} time:${finalTime} minutes`;
    playable = false;
  }

  //dohvacanje uuid i username
  const show = useSelector((state) => state.login.loginUser);
  let lastElement = show[show.length - 1];

  let uniqueCharacters = normalWord.length - brojslova.length;

  
  const submitScore = () => {
     if (lastElement){
         id= lastElement.uuid;
         user= lastElement.newuser;
     }

    axios({
      method: "post",
      url: `https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores`,
      data: {
        id: id,
        quoteId: dataID,
        length: selectedWords.length,
        uniqueCharacters: uniqueCharacters,
        userName: user,
        errors: wrongLetters.length,
        duration: milliseconds,
      },
    })
      .then(setOk(true))
      .catch((error) => {
        setOk(false);
        console.log(error);
      });
  };
  useEffect(() => {
    setPlayable(playable);
});

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        {ok && <h3>message sent</h3>}
        <button onClick={playAgain}>Play Again</button>
        <button onClick={submitScore}>Send Score</button>
      </div>
    </div>
  );
};

export default Popup;
