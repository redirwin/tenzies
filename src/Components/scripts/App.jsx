import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import styles from '../styles/App.module.scss'
import Die from './Die'

export default function App() {
  const [dice, setDice] = useState(getAllNewDice)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allDiceSame = dice.every(die => die.value === dice[0].value)
    const allDiceHeld = dice.every(die => die.isHeld)
    if (allDiceSame && allDiceHeld) {
      setTenzies(true)
      console.log('Tenzies!')
    }
  }, [dice])

  function getAllNewDice() {
    const dice = []
    for (let i = 0; i < 10; i++) {
      dice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return dice
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(getAllNewDice)
      return
    }
    setDice(prevDice => prevDice.map((die) => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    } ))
  }

  function holdDice(id) {
    setDice (prevDice => prevDice.map((die) => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => <Die key={die.id} {...die} holdDice={holdDice}/>)

  return (
    <main className={styles.App}>
      {tenzies && <Confetti />}
      <header>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </header>
      <section className={styles.dice_container}>
        {diceElements}
      </section>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll 'em!"}</button>
    </main>
  )
}
