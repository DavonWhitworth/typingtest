import React, { useState, useEffect } from "react"
import Styled from 'styled-components';
import Preview from './Textpreview.js';
//import { TextInput } from 'react-native'


const TextBlock = Styled.div`
background: #262626;
color: #ACBFA4;
max-width: 70%;
`
//font-size: 1.5em;
const nav = Styled.nav`

`






function App() {

  const [userInput, setUserInput] = useState([])

  console.log("userinput =  " + userInput + "userInput length = " + userInput.length);

  const setString = "This is test text for my typing test";
  var dotextsMatch = "";
  var setText = setString.split();
  const time = 60;
  var correctness = [];





  const SettingUserInput = (data) => {
    //newUserInputdata = data.usertext.split("")    "newUserInputdata= " + newUserInputdata
    console.log("settingUserIput()= " + data);
    setUserInput(data);
    return;
  }

  //input field will setUserInput() then 
  /*loop through arrays to check the accuracy of user's input, 
  record accuracy in correctness[], 1 correct; 0 incorrect;*/
  const checkUserInput = () => {
    console.log("checking user function ran");
    if (userInput[userInput.length - 1] === setText[userInput.length - 1]) correctness[userInput.length - 1] = 1; //correct
    else if (userInput[userInput.length - 1] !== setText[userInput.length - 1]) correctness[userInput.length - 1] = 0; //incorrect

    for (let i = 0; i < correctness.length; i++) {
      if (correctness[i] === 0) dotextsMatch = false
    }
  }




  //useeffect to triggercheckuesrinput
  useEffect(() => {
    checkUserInput();
  }, [userInput]);


  return (
    <>

      <TextBlock>
        <nav>
          Reset
          {time}
          30, 60, 90, 120
        </nav>

        <div className="texts">
          <div className="setText">
            {dotextsMatch}
            <br />
            {setText}

          </div>
          <div className="userText">
            <br />
            <form>
              <input
                type="text"
                name="usertext"
                onChange={data => console.log("input data: " + data)}
                placeholder="Start typing..." />

            </form>
          </div>
        </div>
      </TextBlock>

    </>
  );
}

export default App;
// SettingUserInput(data)    from onchange on input