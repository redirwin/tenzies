import styles from "../styles/About.module.scss";
import { TfiGithub, TfiLinkedin, TfiTwitter } from "react-icons/tfi";
import { SlRefresh } from "react-icons/sl";

export default function About(props) {
  function handleLinkClick(event) {
    console.log("link clicked");
    event.stopPropagation();
  }

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
        This is a simpler version of the popular dice game, Tenzi. The game is
        won when all ten dice are matched and locked. Click or tap on a die to
        lock or unlock it. Only unlocked dice will be rolled when you click the
        Roll button.
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
        This implementation of Tenzies is built using React.js and modular Sass.
        The developer, David Irwin, has added several upgrades to the initial
        requirements, including viewport responsiveness, a reset button, a help
        section, dice pips (built entirely with CSS), and score keeping using
        local browser storage. The source code for this project is{" "}
        <a
          href="https://github.com/redirwin/tenzies"
          target="_blank"
          onClick={handleLinkClick}
        >
          available on GitHub
        </a>
        .
      </p>
      <h2>About the Developer</h2>
      <p>
        David Irwin is a dad, husband, and web developer based in Mesa, Arizona.
        He has been building websites for over 10 years, and working with
        React.js since 2019. He is currently building a React.js Minesweeper
        clone as a personal project, and has plans to develop a full-stack
        headless CMS and a suite of business tools for notary publics.
      </p>
      <p>
        David works in higher education, and is heavily involved with custom
        Drupal CMS implementations.
        <div>
          <a
            title="LinkedIn"
            href="https://linkedin.com/in/redirwin"
            target="_blank"
            onClick={handleLinkClick}
          >
            <TfiLinkedin />
          </a>
          <a
            title="GitHub"
            href="https://github.com/redirwin"
            target="_blank"
            onClick={handleLinkClick}
          >
            <TfiGithub />
          </a>
          <a
            title="Twitter"
            href="https://twitter.com/redirwin"
            target="_blank"
            onClick={handleLinkClick}
          >
            <TfiTwitter />
          </a>
        </div>
      </p>

      <h2>Attribution</h2>
      <p className={styles.attribution}>
        {" "}
        Original{" "}
        <a
          href="https://www.figma.com/file/FqsxRUhAaXM4ezddQK0CdR/Tenzies?node-id=0%3A1&t=TOdKWZrJiJx4txmM-0"
          target="_blank"
          onClick={handleLinkClick}
        >
          design specs
        </a>{" "}
        and requirements provided by{" "}
        <a href="https://scrimba.com/community" target="_blank">
          Scrimba
        </a>
        . The two-dice icon, which provided inspiration for the final color
        scheme, was created by{" "}
        <a
          href="https://www.flaticon.com/free-icon/dice_6027091?term=dice&page=2&position=10&origin=tag&related_id=6027091"
          title="dice icons"
          target="_blank"
          onClick={handleLinkClick}
        >
          Freepik - Flaticon
        </a>
        . In-game and UI icons are from various sources and included using the{" "}
        <a
          href="https://react-icons.github.io/react-icons/"
          target="_blank"
          onClick={handleLinkClick}
        >
          React Icons
        </a>{" "}
        library. The confetti animation is included using the{" "}
        <a
          href="https://www.npmjs.com/package/react-confetti"
          target="_blank"
          onClick={handleLinkClick}
        >
          React Confetti
        </a>{" "}
        library.
      </p>
    </aside>
  );
}
