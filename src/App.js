import React, { useState, useEffect } from "react"
import Styled from 'styled-components';
import DictionaryCaller from "./DictionaryCaller";

//import { TextInput } from 'react-native'


const TestBlock = Styled.div`
background: #262626;
color: #ACBFA4;
max-width: 70%;
`
//font-size: 1.5em;
const nav = Styled.nav`

`






function App() {

  const [userInput, setUserInput] = useState([])

  const setString = "This is test text for my typing test";
  var dotextsMatch = "";
  var setText = setString.split("");
  const time = 60;
  var correctness = [];


  useEffect(() => {
    checkUserInput();
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






  return (
    <>
      <TestBlock>
        <nav>
          Reset place
          {time}
          Timer place
        </nav>

        <div className="texts">
          <div className="setText">
            {dotextsMatch}
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
        </div>
      </TestBlock>

    </>
  );
}

export default App;
// SettingUserInput(data)    from onchange on input