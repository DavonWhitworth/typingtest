import React, { useState, useEffect } from "react"
import Styled from 'styled-components';
import axios from "axios";
import useEventListener from "./useEventListener";


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
        "awful", "assignment", "artistic", "artist", "battery", "benefit", "board", "carefully",
        "ascender", "wellness", "asthenia", "gondolier", "toilsome", "briefcases", "postbellum", "margravates",
        "rocamboles", "teepee", "cay", "orphaned", "width", "azimuths", "trails", "receivership",
        "competition", "considerable", "consistent", "defendant", "discrimination", "dramatic", "electronic",
        "everybody", "foundation", "government", "independent", "involvement", "landscape", "location", "manufacturer",
        "management", "maintenance", "moderate", "modern", "modest", "mystery", "narrative", "natural", "necessary",
        "neighbor", "negotiation", "negotiate", "nonetheless", "nothing", "nuclear", "observation", "observe", "observer",
        "reform", "occupation", "occupy", "organize", "partnership", "policy",
        "political", "pollution", "population", "presentation", "rank", "relax"];

    function Capitalize(str) { return (str.charAt(0).toUpperCase() + str.slice(1)); } //capitalize given string for approriate grammer visual
    const [currentWord, setCurrentWord] = useState(Capitalize(words[Math.trunc(Math.random() * words.length)])) //
    const [userInput, setUserInput] = useState("");
    const [termDef, setTermDef] = useState("");
    const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const [gameActive, setGameActive] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [netWPM, setNetWPM] = useState(0);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [wrongChar, setWrongChar] = useState(0);
    let defSplit = [];


    const getDefinition = async () => {
        let tempDef = await axios(baseURL + currentWord);
        tempDef = JSON.stringify(tempDef.data[0].meanings[0].definitions[0].definition);
        tempDef = tempDef.slice(1, -1);
        setTermDef(tempDef);
        return;
    }

    useEffect(() => {
        getDefinition()
    }, [])

    useEffect(() => {
        if (userInput.length === termDef.length && gameActive) endRound(); //round (term) complete, end round, calculate wpm, setup next round
        setGameActive(true);
        if (gameActive && !timerActive) timer(); //start game timer, this makes only one timer active and then round time in calculated with subtracting time at start of each round
        if (userInput.split("").length === 1) setRoundStartTime(gameTime);

    }, [userInput]);

    const onUserInput = ({ key: e }) => {
        defSplit = termDef.split("");
        if (e === 'Escape') {
            newRound();
        } else if (e === 'Shift') { //Does not punish user for using shift
            return;
        } else if (e === 'Backspace') {
            setUserInput(prevUserInput => prevUserInput.slice(0, -1));
        } else if (e === defSplit[userInput.length]) {
            setUserInput(prevUserInput => prevUserInput + e);
        } else setWrongChar(prevwrongChar => prevwrongChar + 1);
        return;
    }

    useEventListener("keydown", onUserInput)

    const timer = () => { //Game timer, increases in 1/2 second intervals for more accuracy and incase a short term is completed under a second
        setTimerActive(true);
        setInterval(() => {
            setGameTime(prevgameTime => prevgameTime + 0.5);
        }, 500);
    }

    const endRound = () => { //fired when user fnishes the round, similar to newround but does not calculate WPM so incorrect speed is displayed

        const roundTime = gameTime - roundStartTime;
        calcWPM(roundTime);
        setUserInput("");
        setWrongChar(0);
        setCurrentWord(Capitalize(words[Math.trunc(Math.random() * words.length)])); //new round, use
        getDefinition();

    }

    const newRound = () => { //fired when escape key is pushed
        setUserInput("");
        setWrongChar(0);
        setCurrentWord(Capitalize(words[Math.trunc(Math.random() * words.length)])); //new round, use
        getDefinition();
    }


    //(# of char / 5) / time(min)
    const calcWPM = (time) => {
        defSplit = termDef.split("");
        let userSplit = userInput.split("");
        let a = userSplit.length / 5;
        a = a - wrongChar;
        if (a <= 0) a = 1;
        const roundTime = time / 60;
        setNetWPM(parseFloat((a / roundTime)).toFixed(2));
        console.log({ a }, { time }, { roundTime }, { wrongChar });
        return;
    }


    return (
        <>


            <TestBlock>

                <Description>Test your typing speed while learning and consolidating vocabulary, new wpm per term. Click the "Escape" key for a new round.</Description>

                <Texts>
                    <div className="setText">
                        <br />
                        Term = {currentWord}
                        <br />
                        Definition = {termDef}
                        <br />
                    </div>
                    <div className="datatracking">
                        <br />

                        Data tracking:
                        <br />
                        userInput = {userInput}
                        <br />
                        Timer = {gameTime}
                        <br />
                        Calculation variables: Wrongchars = {wrongChar}; roundStartTime = {roundStartTime};
                        <br />
                        netWPM = {netWPM}
                    </div>
                </Texts>

            </TestBlock>


        </>
    );
}

export default App;
