import { useState, useEffect } from "react";

import styles from "./CardContainer.module.scss"

import Card from "../Card/Card"

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const useCharacterData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const names = [
            "misatoKatsuragi", 
            "shinjiIkari", 
            "reiAyanami", 
            "asukaLangley", 
            "gendouIkari", 
            "KouzouFuyutsuki ",
            "RitsukoAkagi",
            "Makoto Hyuga",
            "MayaIbuki",
            "HikariHoraki"
        ];
        
        const characterData = [];
        console.log('Effect executed');

        async function fetchData() {
            for (let name of names) {
                try {
                    await delay(400)
                    console.log('after 1 delay')

                    const response = await fetch(`https://api.jikan.moe/v4/characters?q=${name}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch character data for ${name}`);
                    }

                    const characters = await response.json();
                    const characterId = characters.data[0]?.mal_id;
                    if (!characterId) {
                        throw new Error(`Failed to fetch characterId for ${name}`);
                    }
                    

                    await delay(400)
                    // console.log('after 2 delay')

                    let picResponse
                    
                    if (name === 'MayaIbuki') {
                        picResponse = await fetch(`https://api.jikan.moe/v4/characters/1256/pictures`);
                    } else {
                        picResponse = await fetch(`https://api.jikan.moe/v4/characters/${characterId}/pictures`);
                    }

                    if (!picResponse) {
                        throw new Error(`Failed to fetch picResponse ${picResponse}`);
                    }

                    const pictures = await picResponse.json();
                    const pictureUrl = pictures.data[2]?.jpg?.image_url || pictures.data[0]?.jpg?.image_url;
                    if (!pictureUrl) {
                        throw new Error(`Failed to fetch pictureUrl ${pictureUrl}`);
                    }
                    
                    characterData.push({ pictureUrl, characterId});

                } catch(error) {
                    console.log(error.message)
                }
            }
            setData(characterData);
        }
        fetchData();
    }, []);
  
  return data;
};


const clickedIds = []
let count = 0
const CardContainer = () => {
    const data = useCharacterData();
    const [shuffledData, setShuffledData] = useState([])

    useEffect(() => {
        if (data.length > 0) {
            setShuffledData([...data])
        }
    }, [data])


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function countCard(e) {
            if (clickedIds.every(id => id !== e.target.alt)) {
                clickedIds.push(e.target.alt)
                shuffle(data)
                setShuffledData([...data])
                count++
                
            } else if (clickedIds.some(id => id === e.target.alt)) {
                clickedIds.splice(0, clickedIds.length)
                shuffle(data)
                setShuffledData([...data])
                count = 0
            }
        console.log(clickedIds) 
        console.log(shuffledData)
    }
    


    if (data.length === 0) {
        return (
            <div className={styles.cardContainer}>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.row}>
                {shuffledData.slice(0, 5).map((character, index) => (
                    <Card key={index} characterImage={character.pictureUrl} id={character.characterId} onclick={((e) => countCard(e))}/>
                ))}
            </div>
            <div className={styles.row}>
                {shuffledData.slice(5, 10).map((character, index) => (
                    <Card key={index} characterImage={character.pictureUrl} id={character.characterId} onclick={((e) => countCard(e))}/>
                ))}
            </div>
            <div>
                Count:  {count}
            </div>
        </div>
    )
}

export default CardContainer