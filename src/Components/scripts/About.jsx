import styles from "../styles/About.module.scss";
import { TfiGithub, TfiLinkedin, TfiTwitter } from "react-icons/tfi";
import { SlRefresh } from "react-icons/sl";


export default function About(props) {
  return (
    <aside className={styles.About} onClick={() => props.handleShowAbout()}>
      <h2>Rules</h2>
      <p>
        This is a simple version of the popular dice game, Tenzi. The goal is to
        get all ten dice locked with the same number. The game is over when all dice are matched and locked.
      </p>
      <p>
        To lock or unlock a die, simply click or tap on it. Only unlocked dice
        will be rolled when you click the Roll button.
      </p>
      <p>
        During game play, you'll also see the <SlRefresh /> button, which will immediately create a new game.
      </p>
      <p>
        The scoreboard tracks the lowest number of rolls it took to get all ten dice locked with the same number. See if you can beat your best score!
      </p>
      <h2>About</h2>
      <p>
        This implementation of Tenzies was built using React.js and modular
        Sass, with the original design specs and requirements provided by{" "}
        <a href="https://scrimba.com" target="_blank">
          Scrimba
        </a>
        . The game has been modified to include a few additional features,
        including a reset button, a help button, dice pips (built with CSS), and
        score keeping using local browser storage.
      </p>
      <h2>About the Developer</h2>
      <p>
        David Irwin is a web developer based in Mesa, Arizona. He has been
        building websites and web applications for over 10 years, and has been
        working with React.js since 2019. David works in higher education, and
        is heavily involved with custom Druapal CMS implementations.
      </p>
      <p>
        Some personal projects he's working on include a Minesweeper clone, a
        headless CMS implementation, and a CRM for notary publics.
      </p>
      <div>
        <a href="https://linkedin.com/in/redirwin" target="_blank">
          <TfiLinkedin />
        </a>
        <a href="https://github.com/redirwin" target="_blank">
          <TfiGithub />
        </a>
        <a href="https://twitter.com/redirwin" target="_blank">
          <TfiTwitter />
        </a>
      </div>
    </aside>
  );
}
