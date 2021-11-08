import React from "react";

const Word = ({ selectedWords, correctLetters }) => {

  //brisanje . , ' iz recenice 
  selectedWords = selectedWords.replace(/\.|,|’|:|;|-|'/g, "");

  //provjera slova unesenih ako su ukljucena prikazi ako ne ""
  return (
    <div className="word">
      {selectedWords.split("").map((letter, i) => {
        if (
          letter === ` `
        ) {
          return <h4 key={i}> ~~ </h4>;
        } else {
          return (
            <span key={i} className="letter">
              {correctLetters.includes(letter) ? letter : ""}
            </span>
          );
        }
})}
    </div>
  );
};

export default Word;
