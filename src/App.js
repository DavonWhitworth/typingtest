import React, { useState } from "react";
import styled from "styled-components";

const nav = styled.a`
padding: 0.5rem 0;
`


function App() {

  const [userInput, setUserInput] = useState([""])

  console.log("users " + userInput[4]);

  const setString = "This is test text for my typing test";
  var setText = setString.split("");
  const time = 60;
  var correctness = [];


  //input field will setUserInput() then 
  //loop through arrays to check the accuracy of user's input, 
  //record accuracy in correctness[], 0 untouched (user = undefined); 1 correct; 2 incorrect;
  const checkUserInput = () => {
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === undefined) correctness[i] = 0;
      if (userInput[i] === setText[i]) correctness[i] = 1;
    }
  }



  return (
    <>

      <test>
        <nav>
          Reset
          {time}
          30, 60, 90, 120
        </nav>

        <texts>
          <setTextdiv>
            {setText}
          </setTextdiv>
          <userTextdiv>
            <input onChange={setUserInput()}
            />
          </userTextdiv>
        </texts>
      </test>

    </>
  );
}

export default App;
