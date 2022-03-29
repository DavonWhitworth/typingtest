
import React, { useState, useEffect } from "react"
import Styled from 'styled-components';
//import TermAPI from "./TermAPI";
import axios from "axios";

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
    }, [userInput]);


    /*useEffect(() => {
        setTermString(term + ":" + " " + termDef);
        const termSplit = term.split();
        const termDefSplit = termDef.split();
        setArrTester(": ");
    }, [, term, termDef])
*/

    const SettingUserInput = (data) => {
        setUserInput(data.target.value.split(""));
        return;
    }



    //Validates correctness of userInput over setText but correctness [] does not record in different elements

    /*loop through arrays to check the accuracy of user's input, 
    record accuracy in correctness[], 1 correct; 0 incorrect;
    const checkUserInput = () => {

        var shortpos = userInput.length - 1;

        if (userInput[shortpos] === termArrTester[shortpos]) accuractChars++; //correct
        accuracy = userInput.length / accuractChars;
        console.log(accuractChars, accuracy);

        //else if (userInput[shortpos] !== term[shortpos]) correctness[shortpos] = 0; //incorrect
        //if (correctness[shortpos] === 0) console.log("Incorrect letter, app ln 55");
    }*/

    const info = axios.create({
        baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/"
    })

    const getDefinition = (word) => {
        axios.get(info.baseURL + word)
            .then(response => {
                var definition = response.data[0].meanings[0].definitions[0].definition;
                return Capitalize(definition);
            })
    }

    useEffect(() => {
        setTermDef(getDefinition(currentWord));

    }, [])


    //<TermAPI term={this.currentWord} setTermDef={this.setTermDef} />

    return (
        <>


            <TestBlock>
                <nav>
                    Reset & Timer place
                </nav>

                <Texts>
                    <div className="setText">
                        <br />
                        Term = {currentWord} |----| Definition = {termDef}
                        <br />

                    </div>
                    <div className="userText">
                        <br />
                        <form>
                            <input
                                type="text"
                                name="usertext"
                                onChange={SettingUserInput}
                                placeholder="Start typing..." />

                        </form>
                    </div>
                </Texts>
            </TestBlock>

        </>
    );
}

export default App;
// SettingUserInput(data)    from onchange on input