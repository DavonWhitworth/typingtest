import React, { useState, useEffect } from "react"
import Styled from 'styled-components';
import axios from "axios";


//Possible names: SpeedVocab, VocabTyper, SpeedTyper


const TestBlock = Styled.div`
background: #262626;
color: #ACBFA4;
padding: 20px;
border-radius: 20px;
position: realtive;
position: 'absolute', left: '50%', top: '50%',
transform: 'translate(-50%, -50%)'
width: 50px;
`
//font-size: 1.5em;
const nav = Styled.nav`
position: absolute;
left: 50%;

`
const Texts = Styled.nav`


`
const Description = Styled.header`
transform: translate(0, -50%); 
`


function App() {


    const words = ["quantity", "quality", "inefficacious", "abandon", "authority", "award", "aware",
        "awful", "assignment", "artistic", "artist", "behavior", "battery", "benefit", "board", "carefully",
        "ascender", "wellness", "asthenia", "gondolier", "toilsome", "briefcases", "postbellum", "margravates",
        "rocamboles", "teepee", "superventions", "cay", "orphaned", "width", "azimuths", "trails", "receivership",
        "competition", "considerable", "consistent", "defendant", "discrimination", "dramatic", "electronic",
        "everybody", "foundation", "government", "independent", "involvement", "landscape", "location", "manufacturer",
        "management", "maintenance", "moderate", "modern", "modest", "mystery", "narrative", "natural", "necessary",
        "neighbor", "negotiation", "negotiate", "nonetheless", "nothing", "nuclear", "observation", "observe", "observer",
        "reform", "occupation", "occupy", "Olympic", "organize", "participant", "participate", "partnership", "policy",
        "political", "pollution", "population", "presentation", "rank", "refugee", "relax"];

    function Capitalize(str) { return (str.charAt(0).toUpperCase() + str.slice(1)); } //capitalize given string for approriate grammer visual
    const [currentWord, setCurrentWord] = useState(Capitalize(words[Math.trunc(Math.random() * words.length)]))
    const [userInput, setUserInput] = useState('')
    const [termDef, setTermDef] = useState('');
    const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const [gameActive, setGameActive] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    var totalCar;
    var correctChar;
    var userSplit;
    var TermSplit;

    const getDefinition = () => {
        axios.get(baseURL + currentWord)
            .then(response => {
                let tempDef = JSON.stringify(response.data[0].meanings[0].definitions[0].definition);
                tempDef = tempDef.slice(1, -1);
                setTermDef(Capitalize(tempDef));
            })
    }

    useEffect(() => {
        //checkUserInput();
        console.log("userInput = " + userInput);
        setGameActive(true);
        if (gameActive && !timerActive) timer(); //start game timer, timeractive avoids interval multiplier each time userinput changes
        if (userInput.length === termDef.length) endRound(); //round (term) complete, end round, calculate wpm, setup next round
    }, [userInput]);

    const timer = () => {
        setTimerActive(true);
        setInterval(() => {
            setGameTime(prevgameTime => prevgameTime + 1);
        }, 1000);
    }

    const endRound = () => {
        setTimerActive(false);
        const roundTime = gameTime;
        calcWPM(roundTime);

        setCurrentWord(Capitalize(words[Math.trunc(Math.random() * words.length)])); //new round, use
        getDefinition();

    }

    const calcWPM = (time) => {
        userSplit = userInput.split();
        TermSplit = currentWord.split();

    }


    /*starts typing:
    timer starts. require correct char to be typed, wrong takes away points
    right continues 
    */

    // line 118: onChange={(e) => setUserInput(e.target.value)}
    return (
        <>


            <TestBlock>
                <nav>
                    Data placeholder
                </nav>
                <br />
                <Description>Test your typing speed while learning and consolidating vocabulary, new wpm per term. </Description>

                <Texts>
                    <div className="setText">
                        <br />
                        Term = {currentWord}
                        <br />
                        Definition = {termDef}
                        <br />
                        {gameTime}

                    </div>
                    <div className="userText">
                        <br />
                        <form>
                            <textarea
                                onChange={(e) => setUserInput(e.target.value)}
                                value={userInput}
                                autoFocus
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    opacity: "100%",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    outline: "none",
                                    color: "transparent",
                                    textDecoration: "none",
                                    resize: "none",
                                }}
                                spellCheck={false}
                            />
                            <br />
                        </form>
                    </div>
                </Texts>

            </TestBlock>

        </>
    );
}

export default App;
// SettingUserInput(data)    from onchange on input
//<TermAPI setDef={setTermDef} term={currentWord} />