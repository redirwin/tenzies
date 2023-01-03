import {useState, useEffect} from "react";
import styles from "../styles/Die.module.scss";

export default function Die(props) { 
  
// ANIMATION CODE

  const [dieFace, setDieFace] = useState(Math.ceil(Math.random() * 6));

  const speed = Math.ceil((Math.random() * 100)) + 50;
  const time = Math.ceil((Math.random() * 500)) + 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      props.setIsRolling(false);
    }, time);
    return () => clearInterval(interval);
  }, [])


  useEffect(() => {
    if (props.isRolling) {
      const interval = setInterval(() => {
        props.isHeld ? setDieFace(props.value) : setDieFace(Math.ceil(Math.random() * 6));
      }, speed);
      setTimeout(() => {
        clearInterval(interval);
        setDieFace(props.value);
      }, time);
    }
  }, [props.isRolling]);


  // END ANIMATION CODE


   return (
    <div
      className={`${styles.Die} ${props.isHeld && styles.held}`}
      onClick={() => props.holdDice(props.id)}
    >
      <span className={`${styles.cssDice} ${styles[`cssDice_${props.animationChecked ? dieFace : props.value}`]}`}></span>

    </div>
  );
}
