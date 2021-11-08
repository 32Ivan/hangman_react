import React, { useState, useEffect, Fragment } from "react";
import Hangman from "./components/Hangman";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import "./Game.css";
import axios from "axios";
import { showNotification as show } from "../helpers/helpers";
import { Link } from "react-router-dom";

function Game() {
  const [playable, setPlayable] = useState(true);
  const [selectedWords, setSelectedWord] = useState(""); // dohvacena recenica iz api poziva
  const [correctLetters, setCorrectLetters] = useState([]); // ispravno odabrana slova
  const [wrongLetters, setWrongLetters] = useState([]); // pogresno odabrana slova
  const [showNotification, setShowNotification] = useState(false);
  const [timeOfGame, setTimeOfGame] = useState(); // trajnje igre
  const [dataID, setDataID] = useState(); //api id

  const api = `https://api.quotable.io/random`;
  // dohvacanje API podataka
  async function fetchData() {
    setCorrectLetters([]);
    setWrongLetters([]);
    try {
      const request = await axios({ method: "get", url: api });
      var time = performance.now();
      let dataid = request.data;
      setDataID(dataid._id);
      setTimeOfGame(time);
      setSelectedWord(request.data.content.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // odradivanje slova
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 105) {
        const letter = key.toLowerCase();

        //provjera unesenog slova i pokazivanje notifikacije ako smo koristili isto slovo ponovo
        if (selectedWords.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
          //provjera unesenog slova i pokazivanje notifikacije za krivo slovo
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    //za slusanje pritiska tipki na tipkovnici i potom poziva handleKeydown
    window.addEventListener("keydown", handleKeydown);

    //za ciscenje EVENT LISTENER tako da imamo samo jedan koi radi
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, selectedWords]);

  function playAgain() {
    setPlayable(true);

    // isprazni slova
    setCorrectLetters([]);
    setWrongLetters([]);

    //ponovno pozivanje podataka
    fetchData();
  }

  return (
    <Fragment>
      <div className="bf">
          <Link to="/" className="link1" style={{ textDecoration: "inherit" }}>
            Back
          </Link>
      
          <Link to="/score" className="link1" style={{ textDecoration: "inherit" }}>
          High Score Table
          </Link>
      </div>
      <div className="game-body">
        <h1>Hangman</h1>
        <button className="button" onClick={fetchData}>
          Start / Restart
        </button>
        <p>Hidden word game</p>
        <div className="game-container">
          <Hangman wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWords={selectedWords} correctLetters={correctLetters} />
        </div>
        <Popup
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          selectedWords={selectedWords}
          setPlayable={setPlayable}
          playAgain={playAgain}
          timeOfGame={timeOfGame}
          dataID={dataID}
        />
        <Notification showNotification={showNotification} />
      </div>
    </Fragment>
  );
}

export default Game;
