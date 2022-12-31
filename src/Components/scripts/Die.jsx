import styles from '../styles/Die.module.scss';

export default function Die(props) { 

    return (
        <div 
            className={`${styles.Die} ${props.isHeld && styles.held}`}
            onClick={() => props.holdDice(props.id)}
        >
            <span>{props.value}</span>
        </div>
    )
}