import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { AiOutlineQuestionCircle, AiFillCloseCircle } from "react-icons/ai";
import { SlRefresh } from "react-icons/sl";
import Confetti from "react-confetti";
import styles from "../styles/App.module.scss";
import Die from "./Die";
import About from "./About";

export default function App() {
  const [rolls, setRolls] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [dice, setDice] = useState(getAllNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [stats, setStats] = useState(getStats());
  const [displayAbout, setDisplayAbout] = useState(false);

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
    // checks if all dice are held before incrementing rolls
    !dice.every((die) => die.isHeld) && setRolls((prevRolls) => prevRolls + 1);
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function resetGame() {
    setDice(getAllNewDice);
    setRolls(1);
    setTenzies(false);
    setShowInstructions(false);
  }

  function handleShowAbout() {
    setDisplayAbout(!displayAbout);
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} {...die} holdDice={holdDice} />
  ));

  return (
    <>
      {displayAbout && <About handleShowAbout={handleShowAbout} />}
      <main className={styles.App}>
        {!displayAbout && (tenzies && <Confetti />)}
        <header>
          <button
            title="Help & About"
            className={styles.help}
            onClick={handleShowAbout}
          >
            {!displayAbout ? <AiOutlineQuestionCircle /> : <AiFillCloseCircle />}
          </button>
          <h1>Tenzies</h1>
          {rolls === 0 && showInstructions === true ? (
            <p>
              Roll until all dice are the same. Click or tap each die to freeze
              it at its current value between rolls.
            </p>
          ) : (
            <div className={styles.score}>
              <div>
                Lowest Rolls: <span>{stats.lowestRolls}</span>
              </div>
              <div>
                Current Rolls: <span>{rolls}</span>
              </div>
            </div>
          )}
        </header>
        {rolls > 0 && (
          <section className={styles.dice_container}>{diceElements}</section>
        )}
        <div className={styles.button_container}>
          {rolls > 0 && !tenzies && (
            <button title="New Game" className={styles.new} onClick={resetGame}>
              <SlRefresh />
            </button>
          )}
          <button title="Roll Dice" onClick={rollDice}>
            {tenzies ? "New Game" : rolls === 0 ? "Let's Roll!" : "Roll again!"}
          </button>
        </div>
      </main>
    </>
  );
}
