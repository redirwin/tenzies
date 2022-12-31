import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import styles from "../styles/App.module.scss";
import Die from "./Die";

export default function App() {
  const [rolls, setRolls] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [dice, setDice] = useState(getAllNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    const allDiceSame = dice.every((die) => die.value === dice[0].value);
    const allDiceHeld = dice.every((die) => die.isHeld);
    if (allDiceSame && allDiceHeld) {
      setTenzies(true);
      updateStats();
    }
  }, [dice]);

  function getStats() {
    return {
      lowestRolls: localStorage.getItem("lowestRolls")
        ? parseInt(localStorage.getItem("lowestRolls"))
        : null,
    };
  }

  function updateStats() {
    if (stats.lowestRolls === null || rolls < stats.lowestRolls) {
      localStorage.setItem("lowestRolls", rolls);
      setStats((prevStats) => ({ ...prevStats, lowestRolls: rolls }));
    }
  }

  function getAllNewDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push({
        id: nanoid(),
        value: rolls === 0 ? "" : Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return dice;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(getAllNewDice);
      setRolls(0);
      setShowInstructions(false);
      return;
    }
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      })
    );
    setRolls((prevRolls) => prevRolls + 1);
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} {...die} holdDice={holdDice} />
  ));

  return (
    <main className={styles.App}>
      {tenzies && <Confetti />}
      <header>
        <h1>Tenzies</h1>
        {rolls === 0 && showInstructions === true ? (
          <p>
            Roll until all dice are the same. Click or tap each die to freeze it
            at its current value between rolls.
          </p>
        ) : (
          <div className={styles.flexDiv}>
            <div>Lowest Rolls: {stats.lowestRolls}</div>
            <div>Current Rolls: {rolls}</div>
          </div>
        )}
      </header>
      {rolls > 0 && (
        <section className={styles.dice_container}>{diceElements}</section>
      )}
      <div>
        <button onClick={rollDice}>
          {tenzies ? "New Game" : rolls === 0 ? "Let's Roll!" : "Roll again!"}
        </button>
      </div>
    </main>
  );
}
