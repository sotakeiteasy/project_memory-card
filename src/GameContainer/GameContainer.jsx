import styles from "./GameContainer.module.scss"
import { useState } from "react"
import CardsContainer from "./CardsContainer/CardsContainer"

import githubLogo from "@assets/github-mark.svg"

const GameContainer = () => {
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    return (
        <div className={styles.gameContainer}>
            <header>
                <div className={`${styles.message} ${(score > bestScore && bestScore > 0) ? styles.new : (score !== 0 || bestScore !== 0 ? styles.old : "" )}`}>
                    {score === 0 && bestScore === 0 && "Get points by clicking on an image but don't click on any more than once!"}
                    {score > 0 && "You Beat Your Record!"}
                </div>
                <div className={styles.countBlock}>
                    <div>
                        Score: {score}
                    </div>
                    <div>
                        Best score: {bestScore}
                    </div>
                </div>
            </header>
            <CardsContainer score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore} />
            <div className={styles.credits}>
                Thanks&nbsp; 
                <a
                    href="https://myanimelist.net/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    defer>
                    MyAnimeList&nbsp;
                </a>
                And&nbsp;
                <a
                    href="https://jikan.moe/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    defer
                >
                    jikan&nbsp;
                </a>
                for pictures.&nbsp;&nbsp;&nbsp;&nbsp;

                <img src={githubLogo} alt="github logo"></img>
                &nbsp;Created by&nbsp;
                <a
                    href="https://github.com/sotakeiteasy"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    defer>
                easyrider
                </a>
            </div>
        </div>
    )
}

export default GameContainer