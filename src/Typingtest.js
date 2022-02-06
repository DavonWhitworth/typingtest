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
    var dotextsMatch = "";
    var setText = setString.split("");
    const time = 60;
    var correctness = [];

    const [term, setTerm] = useState();
    const [termDef, setTermDef] = useState();


    useEffect(() => {
        // checkUserInput();
        console.log("userInput = " + userInput);
    }, [userInput]);


    const SettingUserInput = (data) => {
        setUserInput(data.target.value.split(""));
        return;
    }



    //Validates correctness of userInput over setText but correctness [] does not record in different elements

    /*loop through arrays to check the accuracy of user's input, 
    record accuracy in correctness[], 1 correct; 0 incorrect;*/
    const checkUserInput = () => {

        var placeholder = userInput.length - 1;

        if (userInput[placeholder] === setText[placeholder]) correctness[placeholder] = 1; //correct
        else if (userInput[placeholder] !== setText[placeholder]) correctness[placeholder] = 0; //incorrect

        if (correctness[placeholder] === 0) console.log("Incorrect letter, app ln 55");
        console.log(correctness);
    }





    //start of texts div; <DictionaryCaller/> // term={setTerm()} termDef={setTermDef()}
    return (
        <>
            <TestBlock>
                <nav>
                    Reset button place
                    {time}
                </nav>

                <Texts>
                    <div className="setText">
                        {dotextsMatch}
                        <br />
                        The term is {term}
                        <br />
                        The term's definition is {termDef}
                        <br />
                        <DictionaryCaller />

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