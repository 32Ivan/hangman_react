import React from "react";

const WrongLetters = ({ wrongLetters }) => {
  // prikaz slova koja nisu tocno unesena
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && <p>Incorrect Letters {wrongLetters.length} /6</p>}
        {wrongLetters
          .map((letter, i) =>
            <span key={i}>{letter} </span>
          )
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, ", ", curr]),
            null
          )}
      </div>
    </div>
  );
};

export default WrongLetters;
