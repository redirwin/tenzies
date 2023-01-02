import { useState, useEffect } from "react";
import styles from "../styles/Die.module.scss";

export default function Die(props) {
  const [dieFace, setDieFace] = useState()

  const updateDieFace = () => {
    setDieFace(props.value)
  }

  useEffect(updateDieFace, [props.value])

  return (
    <div
      className={`${styles.Die} ${props.isHeld && styles.held}`}
      onClick={() => props.holdDice(props.id)}
    >

    <span className={`${styles.cssDice} ${styles[`cssDice_${dieFace}`]}`}></span>

    </div>
  );
}
