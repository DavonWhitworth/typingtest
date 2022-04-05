import React, { useState, useEffect } from "react"
import Styled from 'styled-components';
import axios from "axios";
//import Textview from "./textview";

//import { TextInput } from 'react-native'


const TestBlock = Styled.div`
background: #262626;
color: #ACBFA4;
max-width: 70%;
border-radius: 20px;
padding: 20px;
position: realtive;
`
//font-size: 1.5em;
const nav = Styled.nav`
position: absolute;
left: 50%;

`
const Texts = Styled.nav`


`

const Capitalize = (str) => {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

function App() {




    const words = ["quantity", "quality", "inefficacious", "abandon", "authority", "award", "aware",
        "awful", "assignment", "artistic", "artist", "behavior", "battery", "benefit", "board", "carefully",
        "ascender", "wellness", "asthenia", "gondolier", "toilsome", "briefcases", "postbellum", "margravates",
        "rocamboles", "teepee", "superventions", "cay", "orphaned", "width", "azimuths", "trails", "receivership",
        "competition", "considerable", "consistent", "defendant", "discrimination", "dramatic", "electronic",
        "everybody", "foundation", "government", "independent", "involvement", "landscape", "location", "manufacturer", "management", "maintenance",
        "moderate", "modern", "modest", "mystery", "narrative", "natural", "necessary", "neighbor", "negotiation",
        "negotiate", "nonetheless", "nothing", "nuclear", "observation", "observe", "observer", "reform",
        "occupation", "occupy", "Olympic", "organize", "participant", "participate", "partnership", "policy",
        "political", "pollution", "population", "presentation", "rank", "refugee", "relax"];


    const [currentWord, setCurrentWord] = useState(Capitalize(words[Math.trunc(Math.random() * words.length)]))
    const [userInput, setUserInput] = useState([])
    const [termDef, setTermDef] = useState("");


    useEffect(() => {
        //checkUserInput();
        console.log("userInput = " + userInput);
        if (userInput.length === termDef.length) {
            setCurrentWord(Capitalize(words[Math.trunc(Math.random() * words.length)]));
            getDefinition();
            setTermDef([]);

        }
    }, [userInput]);

    const SettingUserInput = (data) => {
        setUserInput(data.target.value.split(""));
        return;
    }


    const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    const getDefinition = () => {
        axios.get(baseURL + currentWord)
            .then(response => {
                const tempDef = JSON.stringify(response.data[0].meanings[0].definitions[0].definition);
                //remove quotes from api         // tempDef
                setTermDef(Capitalize(tempDef));
            })
    }

    useEffect(() => {
        setTermDef(getDefinition(currentWord));

    }, [])


    //<Textview term={currentWord} />

    return (
        <>


            <TestBlock>
                <nav>
                    Reset & Timer place
                </nav>

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
                            <input
                                type="text"
                                name="usertext"
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Start typing..."
                                autoComplete="off"
                                value={userInput}
                            />

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