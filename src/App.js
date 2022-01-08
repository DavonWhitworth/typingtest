import React, { useState, fetch, response, date, state } from "react";
import styled from "styled-components";

const nav = styled.a`
padding: 0.5rem 0;`


function App() {

  const [userInput, setUserInput] = useState([""])




  const setString = "This is test text for my typing test";
  var setText = setString.split("");
  const time = 60;





  return (
    <>
      <test>
        <nav>
          Reset
          {time}
          30, 60, 90, 120
        </nav>

        <texts>
          <setTextdiv style={styled.setText}>
            {setText}
          </setTextdiv>
          <userTextdiv>

          </userTextdiv>
        </texts>
      </test>

    </>
  );
}

export default App;
