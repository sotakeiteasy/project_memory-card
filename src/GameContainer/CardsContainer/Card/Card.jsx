import styles from "./Card.module.scss"
import nervLogo from "@assets/nerv-logo.png"

const Card = ({ characterImage, id, flipped, onclick}) => {
 
    return (
        <div className={`${styles.card} ${flipped ? styles.flip : ""}`} onClick={onclick} >
            <div className={styles.front}>
                <img src={characterImage} alt={id} />
            </div>
            <div className={styles.back}>
                <img src={nervLogo} alt={id} />
            </div>
        </div>
    );
}

export default Card;