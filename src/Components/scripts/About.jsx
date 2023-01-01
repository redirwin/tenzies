import styles from "../styles/About.module.scss";
import { TfiGithub, TfiLinkedin, TfiTwitter } from "react-icons/tfi";
import { SlRefresh } from "react-icons/sl";

export default function About(props) {
  return (
    <aside className={styles.About} onClick={() => props.handleShowAbout()}>
      <h1>
        Tenzies
        <img
          src="https://cdn-icons-png.flaticon.com/512/6027/6027091.png"
          alt="dice"
        />
      </h1>
      <h2>Rules</h2>
      <p>
        This is an easy version of the popular dice game, Tenzi. The game is won
        when all ten dice are matched and locked. Click or tap on a die to lock
        or unlock it. Only unlocked dice will be rolled when you click the Roll
        button.
      </p>
      <p>
        Use the <SlRefresh /> button to immediately create a new game. This is a
        quick way to try for a better first roll.
      </p>
      <p>
        The scoreboard tracks the lowest number of rolls ever taken to win a
        game. See if you can beat your lowest rolls score!
      </p>
      <h2>About</h2>
      <p>
        This implementation of Tenzies is built using React.js and modular Sass,
        with original design specs and requirements provided by{" "}
        <a href="https://scrimba.com/community" target="_blank">
          Scrimba
        </a>
        . The developer, David Irwin, has added several upgrades to the initial
        requirements, including viewport responsiveness, a reset button, a help
        section, dice pips (built entirely with CSS), and score keeping using
        local browser storage. The source code for this project is{" "}
        <a href="https://github.com/redirwin/tenzies" target="_blank">
          available on GitHub
        </a>
        .
      </p>
      <h2>About the Developer</h2>
      <p>
        David Irwin is a dad, husband, and web developer based in Mesa, Arizona.
        He has been building websites and web applications for over 10 years,
        and has been working with React.js since 2019.
      </p>
      <p>
        David works in higher education, and is heavily involved with custom
        Drupal CMS implementations. He is currently building a React.js
        Minesweeper clone as a personal project, and has plans to develop a
        full-stack headless CMS and several business tools for notary publics.
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
