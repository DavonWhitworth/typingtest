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
        "awful", "assignment", "artistic", "artist", "battery", "benefit", "board", "carefully",
        "ascender", "wellness", "asthenia", "gondolier", "toilsome", "briefcases", "postbellum", "margravates",
        "rocamboles", "teepee", "cay", "orphaned", "width", "azimuths", "trails", "receivership",
        "competition", "considerable", "consistent", "defendant", "discrimination", "dramatic", "electronic",
        "everybody", "foundation", "government", "independent", "involvement", "landscape", "location", "manufacturer",
        "management", "maintenance", "moderate", "modern", "modest", "mystery", "narrative", "natural", "necessary",
        "neighbor", "negotiation", "negotiate", "nonetheless", "nothing", "nuclear", "observation", "observe", "observer",
        "reform", "occupation", "occupy", "Olympic", "organize", "partnership", "policy",
        "political", "pollution", "population", "presentation", "rank", "refugee", "relax"];

    function Capitalize(str) { return (str.charAt(0).toUpperCase() + str.slice(1)); } //capitalize given string for approriate grammer visual
    const [currentWord, setCurrentWord] = useState(Capitalize(words[Math.trunc(Math.random() * words.length)]))
    const [userInput, setUserInput] = useState('')
    const [termDef, setTermDef] = useState('');
    const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const [gameActive, setGameActive] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [netWPM, setNetWPM] = useState(0);
    const [roundStartTime, setRoundStartTime] = useState(0);
    let userSplit = userInput.split("");
    let defSplit = "";
    var wrongChar = 0;

    const getDefinition = () => {
        axios.get(baseURL + currentWord)
            .then(response => {
                let tempDef = JSON.stringify(response.data[0].meanings[0].definitions[0].definition);
                tempDef = tempDef.slice(1, -1);
                setTermDef(Capitalize(tempDef));
                defSplit = tempDef.split("");
            })
    }

    useEffect(() => {
        getDefinition()
    }, [])

    useEffect(() => {
        setGameActive(true);
        if (gameActive && !timerActive) timer(); //start game timer, timeractive avoids interval multiplier each time userinput changes
        if (userInput.split("").length === 1) setRoundStartTime(gameTime);
        if (userInput.length === termDef.length) endRound(); //round (term) complete, end round, calculate wpm, setup next round
    }, [userInput]);

    useEffect(() => {
        document.addEventListener('keydown', event => {
            //console.log(event);
            onUserInput(event.key);
        });

    }, [])

    const onUserInput = (e) => {
        //console.log(defSplit);
        if (e !== (' ' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z')) {
            wrongChar++;
            return;
        }
        if (e === (' ' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z')) {
            if (e === defSplit[userInput.length]) setUserInput(prevUserInput => prevUserInput + e)
        }

        else return

    }

    const timer = () => {
        setTimerActive(true);
        //while (timerActive) {
        setInterval(() => {
            setGameTime(prevgameTime => prevgameTime + 1);
        }, 1000);
        //}
    }

    const endRound = () => {
        const roundTime = gameTime - roundStartTime;
        calcWPM(roundTime);
        setUserInput("");
        wrongChar = 0;
        setCurrentWord(Capitalize(words[Math.trunc(Math.random() * words.length)])); //new round, use
        getDefinition();

    }


    //(# of char / 5) / time(min)
    const calcWPM = (time) => {
        for (let i = 0; i < userInput.length; i++) {
            if (userSplit[i] !== defSplit[i]) wrongChar++;
        }

        let a = userSplit.length / 5;
        a = a - wrongChar;
        const roundTime = time / 60;
        setNetWPM(a / roundTime);
        console.log("a: ", a, " timer: ", time, " roundlength: ", roundTime, " wrongchar: ", wrongChar);
        return;
    }






    /**     start of form
       * <textarea
                                      onChange={(e) => onUserInput(e.target.value)}
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
                    </div>
                    <div className="userText">
                        <br />
                        <form>

                            <br />
                        </form>
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
// SettingUserInput(data)    from onchange on input
//<TermAPI setDef={setTermDef} term={currentWord} />