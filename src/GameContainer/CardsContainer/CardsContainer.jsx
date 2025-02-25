import { useState, useEffect, useRef } from "react";
import styles from "./CardsContainer.module.scss"
import Card from "./Card/Card"

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

// this function was created to work with list of names, 
// but for better performance now take ids of characters directly, 
// you can change it if you need to.
const useCharacterData = () => {
    const [data, setData] = useState([]);
    const isFetched = useRef(false)
    useEffect(() => {
        if(isFetched.current) return
        isFetched.current = true

        // FOR NAMES
        // const names = [
        //     "misatoKatsuragi", 
        //     "shinjiIkari", 
        //     "reiAyanami", 
        //     "asukaLangley", 
        //     "gendouIkari", 
        //     "KouzouFuyutsuki ",
        //     "RitsukoAkagi",
        //     "Makoto Hyuga",
        //     "MayaIbuki",
        //     "HikariHoraki"
        // ];
        
        // FOR IDS. Comment out this if you want to work with names.
        const ids = [
            1255,
            1259,
            1254,
            1257,
            1251,
            1256,
            86,
            89,
            1253,
            94,
        ]
        
        const characterData = [];

        async function fetchData() {
            // for (let name of names) {            // for names
            for (let characterId of ids) {                   // for ids
                try {

                    // CODE BELOW FOR IDS

                    // await delay(400)
                    // const response = await fetch(`https://api.jikan.moe/v4/characters?q=${name}`);
                    // if (!response.ok) {
                    //     throw new Error(`Failed to fetch character data for ${name}`);
                    // }
                    // const characters = await response.json();
                    // const characterId = characters.data[0]?.mal_id;
                    // if (!characterId) {
                    //     throw new Error(`Failed to fetch characterId for ${name}`);
                    // }
                    
                    console.log('try')
                    await delay(500)
                    let picResponse
                    
                    // NAMES (id for Maya parse incorrectly)
                    // if (name === 'MayaIbuki') {
                    //     picResponse = await fetch(`https://api.jikan.moe/v4/characters/1256/pictures`);
                    // } else {
                    //     picResponse = await fetch(`https://api.jikan.moe/v4/characters/${characterId}/pictures`);
                    // }

                    picResponse = await fetch(`https://api.jikan.moe/v4/characters/${characterId}/pictures`);
                    
                    if (!picResponse.ok) {
                        console.warn(`Failed to fetch pictures for characterId ${characterId}, trying again...`)
                        await delay(500)
                        picResponse = await fetch(`https://api.jikan.moe/v4/characters/${characterId}/pictures`);

                    }

                    if (!picResponse.ok) {
                        throw new Error(`Failed to fetch pictures for characterId ${characterId}`);
                    }

                    const pictures = await picResponse.json();
                    if (!pictures) {
                        throw new Error(`Failed to fetch pictures ${pictures}`);
                    }

                    const pictureUrl = pictures.data[2]?.jpg?.image_url || pictures.data[0]?.jpg?.image_url;
                    if (!pictureUrl) {
                        throw new Error(`Failed to take pictureUrl ${pictureUrl}`);
                    }
                    
                    characterData.push({ pictureUrl, characterId});

                } catch(error) {
                    console.error(error.message)
                }
            }
            setData(characterData);
        }
        fetchData();
    }, []);
  
  return data;
};


const clickedIds = []

const CardsContainer = ({ score, setScore, bestScore, setBestScore }) => {
    const [flippedCards, setFlippedCards] = useState([]);;

    const data = useCharacterData();
    const [shuffledData, setShuffledData] = useState([])

    useEffect(() => {
        if (data.length > 0) {
            setFlippedCards(new Array(data.length).fill(false));
            
            shuffle(data)
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

        setFlippedCards((prev) => prev.map((el) => !el)); // flip cards
        
        setTimeout(() => {
            setFlippedCards((prev) => prev.map((el) => !el)) // flip them back
        }, 500)

        setTimeout(() => {
            shuffle(data);
            setShuffledData([...data]);
        }, 500);


        if (clickedIds.every(id => id !== e.target.alt)) {
            clickedIds.push(e.target.alt)
            setScore(prev => prev + 1)
                
        } else if (clickedIds.some(id => id === e.target.alt)) {
            clickedIds.splice(0, clickedIds.length)
            if (bestScore < score) {
                setBestScore(score)
            }
            setScore(0)
        }
    }


    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prev => {
                if (prev < 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 900)
        return () => clearInterval(timer)
    }, [])

    if (data.length === 0) { 
        return (
            <div className={styles.cardContainer}>
                {count > 0 && <div>Fetching data... It's {count} seconds left...</div>}
                {count === 0 && <div>Sorry, it's rate limitation <br></br>Wait a little bit...</div>}
            </div>
        )
    } 

    return (
        <div className={styles.cardContainer}>
            <div className={styles.row}>
                {shuffledData.slice(0, 5).map((character, index) => (
                    <Card key={index} characterImage={character.pictureUrl} id={character.characterId} flipped={flippedCards[index]} onclick={((e) => countCard(e))}/>
                ))}
            </div>
            <div className={styles.row}>
                {shuffledData.slice(5, 10).map((character, index) => (
                    <Card key={index} characterImage={character.pictureUrl} id={character.characterId} flipped={flippedCards[index]} onclick={((e) => countCard(e))}/>
                ))}
            </div>
        </div>        
    )
}

export default CardsContainer