import styles from "./Card.module.scss"

import { useState } from "react";
const Card = ({ characterImage, id, onclick}) => {
 
    return (
        <div className={styles.card} >
            <img src={characterImage} alt={id} onClick={onclick} />
        </div>
    );
}

export default Card;