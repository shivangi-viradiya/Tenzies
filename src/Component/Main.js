import { useState } from "react";
import Dice from "./Dice";
import "../App.css";
import Confetti from "react-confetti";

const Main = () => {
  const [dice, setDice] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: index,
    }))
  );

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const heldDices = dice.filter((die) => die.isHeld);
  const heldDiceSame = heldDices.every(
    (die) => die.value === heldDices[0].value
  );

  const generateAllNewDice = () => {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      const rand = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: i,
      };
      newDice.push(rand);
    }
    return newDice;
  };

  const rollDice = () => {
    if (gameWon) {
      setDice(generateAllNewDice());
      return;
    }

    setDice((oldDiceValues) => {
      return oldDiceValues.map((die) => {
        if (die.isHeld) {
          return die;
        } else {
          return { ...die, value: Math.floor(Math.random() * 6) + 1 };
        }
      });
    });
  };

  const hold = (id) => {
    if (dice.isHeld === true) {
      return;
    }
    setDice((oldDiceValues) => {
      return oldDiceValues.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return die;
        }
      });
    });
  };

  const diceElements = dice.map((dice, index) => {
    return <Dice key={index} dice={dice} hold={hold} />;
  });

  return (
    <main className="main">
      {gameWon && <Confetti />}
      <h1>Play, Tenzies game here!</h1>
      <p>
        Roll until all dice are the same.
        <br />
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <button className="roll-button" onClick={rollDice} disabled={!heldDiceSame} style={{opacity: !heldDiceSame ? 0.5 : 1}}>
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
};

export default Main;
