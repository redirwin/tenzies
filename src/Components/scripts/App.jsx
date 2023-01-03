import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { AiOutlineQuestionCircle, AiFillCloseCircle } from "react-icons/ai";
import { SlRefresh } from "react-icons/sl";
import Confetti from "react-confetti";
import styles from "../styles/App.module.scss";
import Die from "./Die";
import About from "./About";

export default function App() {
  const [isRolling, setIsRolling] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [dice, setDice] = useState(getAllNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [stats, setStats] = useState(getStats());
  const [displayAbout, setDisplayAbout] = useState(false);
  const [animationChecked, setAnimationChecked] = useState(false);

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
    setIsRolling(true);
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

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? 
        { ...die, isHeld: !die.isHeld } : 
        die;
      })
    );
  }


  function rollDice(event) {
    event.stopPropagation();
    if (tenzies) {
      setTenzies(false);
      setDice(getAllNewDice);
      setRolls(0);
      setShowInstructions(false);
      return;
    }
    setIsRolling(true);
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

  function resetGame() {
    setDice(getAllNewDice);
    setRolls(1);
    setTenzies(false);
    setShowInstructions(false);
    setIsRolling(true);
  }

  function handleShowAbout() {
    setDisplayAbout(!displayAbout);
  }

  const diceElements = dice.map((die) => (
    <Die 
      key={die.id} 
      {...die} 
      holdDice={holdDice} 
      isRolling={isRolling} 
      setIsRolling={setIsRolling} 
      animationChecked={animationChecked}/>
  ));

  return (
    <>
      {displayAbout && <About handleShowAbout={handleShowAbout} />}
      {tenzies && <Confetti />}
      <main className={styles.App}>
        <header>
          <button
            title="Help & About"
            className={styles.help}
            onClick={handleShowAbout}
          >
            {!displayAbout ? (
              <AiOutlineQuestionCircle />
            ) : (
              <AiFillCloseCircle />
            )}
          </button>
          <h1>
            Tenzies
            <img
              src="https://cdn-icons-png.flaticon.com/512/6027/6027091.png"
              alt="dice"
            />
          </h1>
          {rolls === 0 && showInstructions === true ? (
            <p>
              <span>How to Play</span>
              Click or tap a die to lock or unlock it. Only unlocked dice
              will be rolled when you click the Roll button. The game is won
              when all ten dice are matched and locked. Use the refresh button
              to quickly try for a better first roll.
            </p>
          ) : (
            <div className={styles.score}>
              <div>
                Fewest Rolls Ever: <span>{stats.lowestRolls}</span>
              </div>
              <div>
                Rolls This Game: <span>{rolls}</span>
              </div>
            </div>
          )}
        </header>
        {rolls > 0 && (
          <section className={styles.dice_container}>{diceElements}</section>
        )}
        {!rolls > 0 && (
          <div className={styles.animationCheckboxContainer}>
            <label htmlFor="animationCheckbox">
              <input
                id="animationCheckbox"
                type="checkbox"
                checked={animationChecked}
                onChange={(event) => setAnimationChecked(event.target.checked)}
              />
              Animate Rolls
            </label>
          </div>
        )}
        <div className={styles.button_container}>
          {rolls > 0 && !tenzies && (
            <button
              title="Refresh Game"
              className={styles.new}
              onClick={resetGame}
            >
              <SlRefresh />
            </button>
          )}
          <button title="Roll Dice" onClick={rollDice}>
            {tenzies ? "New Game" : rolls === 0 ? "Let's Roll!" : "Roll 'em'!"}
          </button>
        </div>
        
      </main>
    </>
  );
}
