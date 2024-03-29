import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import Styles from "./global.css";
import Styled from "styled-components";
import axios from "axios";
import useEventListener from "./useEventListener";
//import Styles from './style.css';

//Possible names: SpeedVocab, VocabTyper, SpeedTyper

const MainContainer = Styled.div`
  height: 100%;
  width: 60%;
  color: #ffcc33;
  padding: 25px;
  font-size: 120%;  
  align-items: center;
  align-items: center;
  align-items: center;
  justify-content: center;
  border:solid;
  border-radius: 15px;
`;

const DoneChar = Styled.text`
  color: yellow`;

const NotDoneChar = Styled.text`
  display: column;
  text-align: center;
  word-break: break-word;
`;

const ActiveChar = Styled.text`
  //background-color: rgba(128,128,128, 0.2);
  border-style: solid;
  border-color: white;
  border-width: 0.2px;
  padding: 0.6px;
  margin: 0.5px;
  font-size: 110%;
  
`;

const UserFeedback = Styled.div`
    padding: 10px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function App() {
  const words = [
    "quantity",
    "quality",
    "inefficacious",
    "abandon",
    "authority",
    "award",
    "aware",
    "awful",
    "assignment",
    "artistic",
    "artist",
    "battery",
    "benefit",
    "board",
    "carefully",
    "ascender",
    "wellness",
    "asthenia",
    "gondolier",
    "toilsome",
    "briefcases",
    "postbellum",
    "margravates",
    "rocamboles",
    "teepee",
    "cay",
    "orphaned",
    "width",
    "azimuths",
    "trails",
    "receivership",
    "competition",
    "considerable",
    "consistent",
    "defendant",
    "discrimination",
    "dramatic",
    "electronic",
    "everybody",
    "foundation",
    "government",
    "independent",
    "involvement",
    "landscape",
    "location",
    "manufacturer",
    "management",
    "maintenance",
    "moderate",
    "modern",
    "modest",
    "mystery",
    "narrative",
    "natural",
    "neighbor",
    "negotiation",
    "negotiate",
    "nonetheless",
    "nothing",
    "nuclear",
    "observation",
    "observe",
    "observer",
    "reform",
    "occupation",
    "occupy",
    "organize",
    "partnership",
    "policy",
    "political",
    "pollution",
    "presentation",
    "rank",
    "relax",
  ];

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } //capitalize given string for approriate grammer visual
  const [currentWord, setCurrentWord] = useState(""); //Capitalize(words[Math.trunc(Math.random() * words.length)])
  const [userInput, setUserInput] = useState("");
  const [termDef, setTermDef] = useState("");
  const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const [gameActive, setGameActive] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [netWPM, setNetWPM] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [wrongChar, setWrongChar] = useState(0);
  const [avgWPM, setavgWPM] = useState(0);

  const [sessionWPM, setsessionWPM] = useState([]);
  var defSplit = [];
  var avgNET = 0;

  const getDefinition = async (word) => {
    setCurrentWord(word);
    let tempDef = await axios(baseURL + word);
    tempDef = JSON.stringify(
      tempDef.data[0].meanings[0].definitions[0].definition
    );
    tempDef = tempDef.slice(1, -1);
    setTermDef(tempDef);
    return;
  };

  const setNewWord = () => {
    //Helper function to avoid returning mismatched definition to term
    let word = Capitalize(words[Math.trunc(Math.random() * words.length)]);
    getDefinition(word);
  };

  useEffect(() => {
    setNewWord();
  }, []);

  useEffect(() => {
    if (userInput.length === termDef.length && gameActive) endRound(); //round (term) complete, end round, calculate wpm, setup next round
    setGameActive(true);
    if (gameActive && !timerActive) timer(); //start game timer, this makes only one timer active and then round time in calculated with subtracting time at start of each round
    if (userInput.split("").length === 1) setRoundStartTime(gameTime);
  }, [userInput]);

  useEffect(() => {
    for (let i = 0; i < sessionWPM.length; i++) {
      avgNET = parseFloat(avgNET) + parseFloat(sessionWPM[i]);
    }
    avgNET = parseFloat(avgNET / sessionWPM.length).toFixed(2);
    setavgWPM(avgNET);
  }, [sessionWPM]);

  const onUserInput = ({ key: e }) => {
    defSplit = termDef.split("");
    if (e === "Escape") {
      //New round option
      newRound();
    } else if (e === "Shift") {
      //Does not punish user for using shift
      return;
    } else if (e === "Backspace") {
      setUserInput((prevUserInput) => prevUserInput.slice(0, -1));
    } else if (e === defSplit[userInput.length]) {
      setUserInput((prevUserInput) => prevUserInput + e);
    } else setWrongChar((prevwrongChar) => prevwrongChar + 1);
    return;
  };

  useEventListener("keydown", onUserInput);

  const timer = () => {
    //Game timer, increases in 1/2 second intervals for more accuracy and incase a short term is completed under a second, quicker causes issues
    setTimerActive(true);
    setInterval(() => {
      setGameTime((prevgameTime) => prevgameTime + 0.5);
    }, 500);
  };

  const endRound = () => {
    //fired when user fnishes the round, similar to newround but does not calculate WPM so incorrect speed is displayed

    const roundTime = gameTime - roundStartTime;
    calcWPM(roundTime);
    setUserInput("");
    setWrongChar(0);
    setNewWord();
  };

  const newRound = () => {
    //fired when escape key is pushed
    setUserInput("");
    setWrongChar(0);
    setNewWord();
  }; //( (# of char / 5)-errors ) / time(in minutes)

  /*stardard way of calculating wpm*/ const calcWPM = (time) => {
    defSplit = termDef.split("");
    let userSplit = userInput.split("");
    let a = userSplit.length / 5;
    a = a - wrongChar;
    if (a <= 0) a = 1;
    const roundTime = time / 60;
    const wpmCalc = parseFloat(a / roundTime).toFixed(2);

    setNetWPM(wpmCalc);
    setsessionWPM((prevsessionWPM) => [...prevsessionWPM, wpmCalc]);
    return;
  };

  const TextViewer = () => {
    //makes the divs for app view to show user progression through text
    const userSplit = userInput; //userInput.split("");
    const completedCharsString = userInput.substring(0, userSplit.length);
    const completedCharsDiv = <DoneChar>{completedCharsString}</DoneChar>;
    const activechar = termDef.substring(
      userSplit.length,
      userSplit.length + 1
    );
    const activecharacter = <ActiveChar>{activechar}</ActiveChar>;
    const incompletedCharsString = termDef.substring(userSplit.length + 1);
    const incompletedCharsDiv = (
      <NotDoneChar>{incompletedCharsString}</NotDoneChar>
    );
    return (
      <>
        {completedCharsDiv}
        {activecharacter}
        {incompletedCharsDiv}
      </>
    );
  };

  return (
    <MainContainer>
      Term = {currentWord}
      <br />
      Definition =
      <TextViewer />
      <UserFeedback>
        <br />
        netWPM of previous term = {netWPM} <br />
        Average netWPM for session = {avgWPM}
      </UserFeedback>
    </MainContainer>
  );
}

export default App;
