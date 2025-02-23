import styles from "./Card.module.scss"

import { useState } from "react";
const Card = ({ characterImage, id, onclick}) => {

  
    function countCard(e) {
        console.log(e.target.alt)

        if (clickedIds.every(id => id !== e.target.alt)) {
            clickedIds.push(e.target.alt)
        } else if (clickedIds.some(id => id === e.target.alt)) {
            clickedIds.splice(0, clickedIds.length)
            
        }
           console.log(clickedIds) 
    }

    
    return (
        <div className={styles.card} >
            <img src={characterImage} alt={id} onClick={onclick} />
        </div>
    );
}

export default Card;