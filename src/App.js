import React from "react"
import Typingtest from './typingtest';
import Styled from 'styled-components';


const MainContainer = Styled.div`
    padding-top: 100px;
    padding-left: 25%;
`
const Description = Styled.header`
    padding-top: 50px;
    margin: 15px;
    width: 500px
    text-align: center;
    transform: translate(0, -50%);
    color: white;
`


function App() {



  return (
    <div>
      <Description>Start typing to begin, new wpm per term. Click the "Escape" key for a new term. (Does not effect avgWPM)</Description>
      <MainContainer>        
        <Typingtest />
      </MainContainer>
    </div>
  );
}

export default App;
// SettingUserInput(data)    from onchange on input