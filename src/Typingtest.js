import React, { useState, useEffect } from "react"
import Styled from 'styled-components';
import DictionaryCaller from "./DictionaryCaller";

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
//margin: 30px;





function App() {

    const [userInput, setUserInput] = useState([])

    const setString = "This is test text for my typing test";
    var setText = setString.split("");
    var accuractChars;
    var accuracy;

    const [term, setTerm] = useState();
    const [termDef, setTermDef] = useState();
    const [termTestString, setTermString] = useState();
    const [termArrTester, setArrTester] = useState();


    useEffect(() => {
        //checkUserInput();
        console.log("userInput = " + userInput);
    }, [userInput]);

    //use effect to handle dictionary caller

    useEffect(() => {
        setTermString(term + ":" + " " + termDef);
        //const termSplit = term.split("");
        // const termDefSplit = termDef.split("");
        setArrTester(": ");
    }, [, term, termDef])


    const SettingUserInput = (data) => {
        setUserInput(data.target.value.split(""));
        return;
    }



    //Validates correctness of userInput over setText but correctness [] does not record in different elements

    /*loop through arrays to check the accuracy of user's input, 
    record accuracy in correctness[], 1 correct; 0 incorrect;*/
    const checkUserInput = () => {

        var shortpos = userInput.length - 1;

        if (userInput[shortpos] === termArrTester[shortpos]) accuractChars++; //correct
        accuracy = userInput.length / accuractChars;
        console.log(accuractChars, accuracy);

        //else if (userInput[shortpos] !== term[shortpos]) correctness[shortpos] = 0; //incorrect
        //if (correctness[shortpos] === 0) console.log("Incorrect letter, app ln 55");
    }





    //start of texts div; <DictionaryCaller/> // term={setTerm()} termDef={setTermDef()}
    return (
        <>
            <DictionaryCaller term={setTerm} def={setTermDef} />
            <TestBlock>
                <nav>
                    Reset & Timer place
                </nav>

                <Texts>
                    <div className="setText">
                        <br />
                        Term = {term} |----| Definition = {termDef}
                        <br />
                        {termTestString}

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