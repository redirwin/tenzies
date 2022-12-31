import styles from "../styles/Die.module.scss";

export default function Die(props) {
  return (
    <div
      className={`${styles.Die} ${props.isHeld && styles.held}`}
      onClick={() => props.holdDice(props.id)}
    >
      {props.value === 1 && <span className={`${styles.cssDice} ${styles.cssDice_1}`}></span>}
      {props.value === 2 && <span className={`${styles.cssDice} ${styles.cssDice_2}`}></span>}
      {props.value === 3 && <span className={`${styles.cssDice} ${styles.cssDice_3}`}></span>}
      {props.value === 4 && <span className={`${styles.cssDice} ${styles.cssDice_4}`}></span>}
      {props.value === 5 && <span className={`${styles.cssDice} ${styles.cssDice_5}`}></span>}
      {props.value === 6 && <span className={`${styles.cssDice} ${styles.cssDice_6}`}></span>}
    </div>
  );
}
